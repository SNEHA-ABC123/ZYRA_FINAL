/**
 * Roommate compatibility engine.
 *
 * Math:
 *   1. Build a normalized 7-dimensional Trait Vector for each user from
 *      survey answers (keyword-scored from voice transcript + optional slider).
 *   2. Compute per-trait similarity using triangular kernel:
 *         sim_i = 1 - |a_i - b_i|         (already 0..1)
 *   3. Apply per-trait importance weights w_i (emotional & safety highest).
 *   4. Weighted similarity score:
 *         score = (Σ w_i · sim_i) / Σ w_i
 *   5. Cross-check with cosine similarity over weighted vectors:
 *         cos = (a·b) / (||a||·||b||)
 *   6. Final compatibility = 0.7 · weightedSim + 0.3 · cosineSim   ∈ [0,1]
 *   7. Confidence: based on how many traits were inferred (non-default).
 *
 * Output is a percentage 0..100 with per-trait breakdown the UI renders.
 */

import { TraitVector, TRAIT_KEYS, TRAIT_WEIGHTS, SurveyQuestion, surveyQuestions } from "./i18n";

const DEFAULT_TRAIT: TraitVector = {
  earlyRiser: 0.5,
  cleanliness: 0.5,
  focus: 0.5,
  introversion: 0.5,
  noiseTolerance: 0.5,
  safety: 0.5,
  emotional: 0.5,

  empathy: 0.5,
  communication: 0.5,
  boundaries: 0.5,
  conflictResolution: 0.5,
};

/** Score one trait from a free-text answer using keyword evidence. */
export function scoreAnswer(answer: string, q: SurveyQuestion): number {
  const text = answer.toLowerCase();
  if (!text.trim()) return 0.5;
  let lowHits = 0, highHits = 0;
  for (const kw of q.low)  if (text.includes(kw.toLowerCase())) lowHits++;
  for (const kw of q.high) if (text.includes(kw.toLowerCase())) highHits++;
  // Numeric cues for sleep schedule (e.g. "wake at 5", "9 am")
  if (q.dim === "earlyRiser") {
    const m = text.match(/(\d{1,2})\s*(am|pm)?/);
    if (m) {
      const h = parseInt(m[1], 10);
      if (!isNaN(h) && h <= 7) highHits += 2;
      if (!isNaN(h) && h >= 10) lowHits += 1;
    }
  }
  if (lowHits === 0 && highHits === 0) return 0.5;
  // Sigmoid over (highHits - lowHits)
  const x = highHits - lowHits;
  return clamp(1 / (1 + Math.exp(-x * 1.2)), 0, 1);
}

/** Build the user's full trait vector from all answers. */
export function buildTraitVector(answers: Record<number, string>): TraitVector {
  const v: TraitVector = { ...DEFAULT_TRAIT };
  for (const q of surveyQuestions) {
    const a = answers[q.id];
    if (a && a.trim()) v[q.dim] = scoreAnswer(a, q);
  }
  return v;
}

export interface CompatibilityResult {
  score: number;                                // 0..100
  weighted: number;                             // 0..100
  cosine: number;                               // 0..100
  confidence: number;                           // 0..100
  perTrait: Record<keyof TraitVector, number>;  // 0..100 per dimension
  reasons: string[];                            // human-readable strengths
  watchouts: string[];                          // human-readable gaps
}

export function compatibility(a: TraitVector, b: TraitVector, confidence = 100): CompatibilityResult {
  const perTrait = {} as Record<keyof TraitVector, number>;
  let wSum = 0, wAcc = 0;
  let dot = 0, na = 0, nb = 0;

  for (const k of TRAIT_KEYS) {
    const ai = Number(a[k] ?? 0.5);
    const bi = Number(b[k] ?? 0.5);

    if (isNaN(ai) || isNaN(bi)) {
      console.log("BAD TRAIT", k, ai, bi);
    }
    const w = TRAIT_WEIGHTS[k];
    const sim = 1 - Math.abs(ai - bi);          // triangular kernel
    perTrait[k] = Math.round(sim * 100);
    wAcc += w * sim;
    wSum += w;
    // weighted cosine: scale vectors by sqrt(w)
    const sw = Math.sqrt(w);
    const av = ai * sw, bv = bi * sw;
    dot += av * bv;
    na  += av * av;
    nb  += bv * bv;
  }

  const weighted = wAcc / wSum;                                   // 0..1
  const cosine   = na && nb ? dot / Math.sqrt(na * nb) : 0;       // 0..1
  const blended  = 0.7 * weighted + 0.3 * cosine;
  const score    = Math.round(clamp(blended * 100, 0, 100));

  // Human reasons: top 2 traits, watchouts: bottom 2
  const ranked = TRAIT_KEYS.map((k) => ({ k, s: perTrait[k] }))
    .sort((x, y) => y.s - x.s);
  const reasons = ranked
    .slice(0, 2)
    .map((r) =>
      REASON[r.k]?.(r.s)
        ?? `Strong alignment in ${r.k} (${r.s}%)`
    );

  const watchouts = ranked
    .slice(-2)
    .reverse()
    .map((r) =>
      WATCH[r.k]?.(r.s)
        ?? `${r.k} may need discussion (${r.s}%)`
    );

  return {
    score,
    weighted: Math.round(weighted * 100),
    cosine: Math.round(cosine * 100),
    confidence: Math.round(confidence),
    perTrait,
    reasons,
    watchouts,
  };
}

const REASON: Partial<Record<keyof TraitVector, (s:number)=>string>> = {
  emotional:      (s) => `Aligned communication styles (${s}% match) — you'll both feel heard.`,
  safety:         (s) => `Shared safety-first values (${s}% match) build immediate trust.`,
  cleanliness:    (s) => `Compatible cleanliness standards (${s}%) — no friction over chores.`,
  focus:          (s) => `Similar focus needs (${s}%) — your routines won't clash.`,
  earlyRiser:     (s) => `Sleep schedules align (${s}%) — quiet hours match naturally.`,
  introversion:   (s) => `Energy patterns align (${s}%) — you'll respect each other's space.`,
  noiseTolerance: (s) => `Noise comfort matches (${s}%) — shared rhythm at home.`,

  empathy: (s) =>
    `Strong emotional empathy (${s}%) — both understand each other's feelings.`,

  communication: (s) =>
    `Healthy communication compatibility (${s}%) — easier conflict prevention.`,

  boundaries: (s) =>
    `Personal boundaries align (${s}%) — mutual respect comes naturally.`,

  conflictResolution: (s) =>
    `Conflict resolution styles match (${s}%) — disagreements stay constructive.`,
};
const WATCH: Partial<Record<keyof TraitVector, (s:number)=>string>> = {
  emotional:      (s) => `Communication styles differ (${s}%) — set check-in rituals early.`,
  safety:         (s) => `Different safety expectations (${s}%) — agree on house rules upfront.`,
  cleanliness:    (s) => `Cleanliness gap (${s}%) — use a shared chore tracker.`,
  focus:          (s) => `Focus needs differ (${s}%) — define quiet hours.`,
  earlyRiser:     (s) => `Sleep schedules differ (${s}%) — invest in good headphones.`,
  introversion:   (s) => `Social energy differs (${s}%) — talk openly about guest nights.`,
  noiseTolerance: (s) => `Noise tolerance varies (${s}%) — agree on call zones.`,

  empathy: (s) =>
    `Empathy levels differ (${s}%) — be intentional about emotional support.`,

  communication: (s) =>
    `Communication habits vary (${s}%) — establish expectations early.`,

  boundaries: (s) =>
    `Boundary preferences differ (${s}%) — discuss privacy and visitors upfront.`,

  conflictResolution: (s) =>
    `Different conflict styles (${s}%) — create a shared approach for disagreements.`,
};

function clamp(x: number, a: number, b: number) { return Math.max(a, Math.min(b, x)); }

// Confidence = % of questions answered with real content
export function inferConfidence(answers: Record<number, string>): number {
  const filled = Object.values(answers).filter((a) => a && a.trim().length > 10).length;
  return clamp((filled / surveyQuestions.length) * 100, 20, 100);
}
