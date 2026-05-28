import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { MapPin, Sparkles, Shield, Brain, Users, ArrowRight, Bookmark, MessageCircle, AlertCircle, Heart } from "lucide-react";
import { candidates } from "@/lib/mock-data";
import { compatibility } from "@/lib/matching";
import { useSurvey } from "@/context/SurveyContext";
import { TRAIT_KEYS } from "@/lib/i18n";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from "recharts";

export const Route = createFileRoute("/matches")({
  head: () => ({ meta: [{ title: "Your Matches · Zyra AI" }, { name: "description", content: "AI compatibility results computed from your voice survey" }] }),
  component: MatchesPage,
});

const traitLabel: Record<string, string> = {
  earlyRiser: "Sleep",
  cleanliness: "Tidy",
  focus: "Focus",
  introversion: "Energy",
  noiseTolerance: "Noise",
  safety: "Safety",
  emotional: "Emotion",
};

function MatchesPage() {
  const { vector, confidence, answers } = useSurvey();
  const hasSurvey = Object.keys(answers).length > 0;

  // Compute compatibility for every candidate, sort descending
  const ranked = useMemo(() => {
    return candidates
      .map((c) => ({ candidate: c, result: compatibility(vector, c.vector, confidence) }))
      .sort((a, b) => b.result.score - a.result.score);
  }, [vector, confidence]);

  const [selectedId, setSelectedId] = useState(ranked[0]?.candidate.id);
  const [saved, setSaved] = useState<string[]>([]);
  const selected = ranked.find((r) => r.candidate.id === selectedId) ?? ranked[0];

  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const radarData = TRAIT_KEYS.map((k) => ({
    trait: traitLabel[k],
    you: Math.round(vector[k] * 100),
    them: Math.round(selected.candidate.vector[k] * 100),
  }));

  const breakdown = TRAIT_KEYS.map((k) => ({
    name: traitLabel[k],
    value: selected.result.perTrait[k],
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">AI compatibility</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-2">Meet your <span className="text-gradient">top matches.</span></h1>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Scored with a weighted similarity + cosine model over your 7-dimensional personality vector. Confidence: <span className="font-semibold text-foreground">{Math.round(confidence)}%</span>
          </p>
        </div>
        <Link to="/rooms" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft">
          Browse rooms <ArrowRight className="size-4" />
        </Link>
      </div>

      {!hasSurvey && (
        <div className="mt-6 glass-card p-5 flex items-start gap-3 bg-gradient-warm/40">
          <AlertCircle className="size-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">
            <span className="font-semibold">Demo scores shown.</span> Complete the voice intake to get real, personalized compatibility — every answer adjusts your trait vector.
          </div>
          <Link to="/voice-intake" className="text-sm font-semibold text-primary hover:underline">Start intake →</Link>
        </div>
      )}

      <div className="mt-8 grid lg:grid-cols-[1fr_1.4fr] gap-6">
        {/* List */}
        <div className="space-y-4">
          {ranked.map(({ candidate: m, result }, i) => (
            <motion.button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`w-full text-left glass-card p-5 transition hover:-translate-y-0.5 ${selectedId === m.id ? "ring-2 ring-primary shadow-glow" : ""}`}
            >
              <div className="flex items-center gap-4">
                <img src={m.avatar} alt={m.name} loading="lazy" width={56} height={56} className="size-14 rounded-2xl object-cover shadow-soft" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-display text-lg font-semibold truncate">{m.name}, {m.age}</div>
                    <div className="font-display text-2xl text-gradient font-semibold">{result.score}%</div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="size-3" /> {m.location}</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary" style={{ width: `${result.score}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.tags.slice(0, 4).map((t) => <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>)}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail */}
        <motion.div key={selected.candidate.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="glass-card p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <img src={selected.candidate.avatar} alt={selected.candidate.name} width={64} height={64} className="size-16 rounded-3xl object-cover shadow-soft" />
                <div>
                  <h2 className="font-display text-2xl font-semibold">{selected.candidate.name}</h2>
                  <div className="text-sm text-muted-foreground">{selected.candidate.role} · {selected.candidate.location}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Match score</div>
                <div className="font-display text-4xl text-gradient font-semibold">{selected.result.score}%</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">weighted {selected.result.weighted}% · cosine {selected.result.cosine}%</div>
              </div>
            </div>
            <p className="mt-4 text-foreground/90">{selected.candidate.bio}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
                <MessageCircle className="size-4" /> Connect
              </button>
              <button onClick={() => toggleSave(selected.candidate.id)} className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold border transition ${saved.includes(selected.candidate.id) ? "bg-primary/10 text-primary border-primary" : "bg-white border-border"}`}>
                <Bookmark className={`size-4 ${saved.includes(selected.candidate.id) ? "fill-current" : ""}`} /> {saved.includes(selected.candidate.id) ? "Saved" : "Save match"}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 font-semibold"><Brain className="size-4 text-primary" /> Trait alignment</div>
              <div className="text-xs text-muted-foreground">Your vector vs theirs (0–100)</div>
              <div className="mt-3 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="oklch(0.9 0.02 320)" />
                    <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11, fill: "oklch(0.4 0.04 300)" }} />
                    <Radar name="You" dataKey="you" stroke="oklch(0.62 0.16 320)" fill="oklch(0.62 0.16 320)" fillOpacity={0.3} />
                    <Radar name="Them" dataKey="them" stroke="oklch(0.78 0.11 195)" fill="oklch(0.78 0.11 195)" fillOpacity={0.3} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 font-semibold"><Users className="size-4 text-primary" /> Per-trait similarity</div>
              <div className="text-xs text-muted-foreground">Weighted by importance</div>
              <div className="mt-3 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={breakdown} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "oklch(0.4 0.04 300)" }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "oklch(0.95 0.02 320)" }} contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.02 320)" }} />
                    <Bar dataKey="value" fill="oklch(0.7 0.16 320)" radius={[8, 8, 8, 8]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-warm/40">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-2xl bg-gradient-primary grid place-items-center shrink-0"><Sparkles className="size-5 text-primary-foreground" /></div>
              <div className="flex-1">
                <div className="font-display text-xl font-semibold">Why this match?</div>
                <div className="mt-3 space-y-2">
                  {selected.result.reasons.map((r) => (
                    <div key={r} className="flex items-start gap-2 text-sm"><Heart className="size-4 text-primary mt-0.5 shrink-0" /> {r}</div>
                  ))}
                </div>
                {selected.result.watchouts.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Worth knowing</div>
                    <div className="mt-2 space-y-2">
                      {selected.result.watchouts.map((r) => (
                        <div key={r} className="flex items-start gap-2 text-sm text-muted-foreground"><Shield className="size-4 text-accent-foreground mt-0.5 shrink-0" /> {r}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link to="/rooms" className="block glass-card p-6 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-xl font-semibold">Suggested rooms nearby</div>
                <div className="text-sm text-muted-foreground mt-1">Curated for both of your routines and safety preferences.</div>
              </div>
              <ArrowRight className="size-5 text-primary" />
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
