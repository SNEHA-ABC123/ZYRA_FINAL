import { createFileRoute, Link } from "@tanstack/react-router";
import { getArchetype } from "@/lib/archetypes";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { MapPin, Sparkles, Shield, Brain, Users, ArrowRight, Bookmark, MessageCircle, AlertCircle, Heart } from "lucide-react";

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
interface Candidate {
  id: string;
  name: string;
  age: number;
  role: string;
  location: string;
  bio: string;
  matchScore: number;

  avatar: string;
  tags: string[];

  vector: {
    earlyRiser: number;
    cleanliness: number;
    focus: number;
    introversion: number;
    noiseTolerance: number;
    safety: number;
    emotional: number;

    empathy: number;
    communication: number;
    boundaries: number;
    conflictResolution: number;
  };
}
const traitLabel: Record<string, string> = {
  earlyRiser: "Sleep",
  cleanliness: "Tidy",
  focus: "Focus",
  introversion: "Energy",
  noiseTolerance: "Noise",
  safety: "Safety",
  emotional: "Emotion",

  empathy: "Empathy",
  communication: "Communication",
  boundaries: "Boundaries",
  conflictResolution: "Conflict",
};

function MatchesPage() {
  const { vector, confidence, answers } = useSurvey();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const hasSurvey = Object.keys(answers).length > 0;

  useEffect(() => {
  fetch("http://localhost:5000/api/candidates")
    .then((res) => res.json())
    .then((data) => {
      console.log("Candidates:", data);
      setCandidates(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
}, []);
  // Compute compatibility for every candidate, sort descending
  console.log("Candidates state:", candidates);
  const ranked = useMemo(() => {
    return candidates
      .map((c) => ({ candidate: c, result: compatibility(vector, c.vector, confidence) }))
      .sort((a, b) => b.result.score - a.result.score);
  }, [candidates, vector, confidence]);

  const [selectedId, setSelectedId] = useState(ranked[0]?.candidate.id);
  useEffect(() => {
    if (ranked.length > 0 && !selectedId) {
      setSelectedId(ranked[0].candidate.id);
    }
  }, [ranked, selectedId]);
  const [saved, setSaved] = useState<string[]>([]);
  const selected = ranked.find((r) => r.candidate.id === selectedId) ?? ranked[0];
  if (!selected) {
    return (
      <div className="p-10">
        No matches found.
      </div>
    );
  }
  const archetype = getArchetype(vector);
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
          <h1 className="font-display text-4xl sm:text-5xl mt-2"> Meet your <span className="text-gradient">top matches.</span></h1>
          <div className="mt-6 rounded-3xl border border-purple-200 bg-white/80 p-6 shadow-lg">
                <div className="flex items-center gap-3">
                   <span className="text-3xl">{archetype.emoji}</span>
                   <div>
                      <h3 className="text-xl font-bold text-purple-700">
                        {archetype.title}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {archetype.description}
                      </p>
                   </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="rounded-xl bg-purple-50 p-3">
                     <p className="text-xs text-gray-500">Safety</p>
                     <p className="font-bold">
                        {Math.round(vector.safety * 100)}%
                      </p>
                  </div>

                  <div className="rounded-xl bg-pink-50 p-3">
                     <p className="text-xs text-gray-500">Emotion</p>
                     <p className="font-bold">
                        {Math.round(vector.emotional * 100)}%
                     </p>
                  </div>

                  <div className="rounded-xl bg-teal-50 p-3">
                     <p className="text-xs text-gray-500">Empathy</p>
                     <p className="font-bold">
                        {Math.round(vector.empathy * 100)}%
                     </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3">
                     <p className="text-xs text-gray-500">Communication</p>
                     <p className="font-bold">
                        {Math.round(vector.communication * 100)}%
                     </p>
                  </div>
                </div>
          </div>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Scored with a weighted similarity + cosine model over your 11-dimensional personality vector. Confidence: <span className="font-semibold text-foreground">{Math.round(confidence)}%</span>
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
                <div className="mt-2">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Confidence {selected.result.confidence}%
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-foreground/90">{selected.candidate.bio}</p>
            <div className="mt-5 rounded-2xl bg-purple-50 border border-purple-100 p-4">
              <h3 className="font-semibold text-purple-700 mb-2">
                ✨ Why Zyra Chose This Match
              </h3>

              <ul className="space-y-2 text-sm text-gray-700">
                {selected.result.reasons.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-100 p-4">
              <h3 className="font-semibold text-amber-700 mb-2">
                ⚠ Potential Growth Areas
              </h3>

              <ul className="space-y-2 text-sm text-gray-700">
                {selected.result.watchouts.map((watchout) => (
                  <li key={watchout}>• {watchout}</li>
                ))}
              </ul>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/profile/$id"
                params={{ id: String(selected.candidate.id) }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft"
              >
                <MessageCircle className="size-4" />
                View Profile
              </Link>
              <button
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-semibold"
              >
                <Heart className="size-4" />
                Send Request
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

          <div className="rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 p-6 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                💕 Zyra Chemistry Card
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-sm opacity-80">
                    Compatibility Score
                  </p>

                  <p className="text-4xl font-bold">
                    {selected.result.score}%
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-sm opacity-80">
                    Emotional Sync
                  </p>

                  <p className="text-4xl font-bold">
                    {selected.result.perTrait.emotional}%
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="font-semibold text-lg">
                  Why Zyra Chose This Match
                </h4>

                <ul className="mt-3 space-y-2">
                  {selected.result.reasons.map((r) => (
                    <li key={r}>
                      ✓ {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-white/20 pt-4">
                <h4 className="font-semibold text-lg">
                  Potential Growth Areas
                </h4>
                <div className="mt-5 border-t border-white/20 pt-4">
                  <h4 className="font-semibold text-lg">
                    📖 Compatibility Journal
                  </h4>

                  <div className="mt-3 space-y-3 text-sm">

                    <div>
                      <span className="font-semibold">
                        Shared Values:
                      </span>
                      {" "}
                      Emotional safety, respect, and communication.
                    </div>

                    <div>
                      <span className="font-semibold">
                        Best Conversation Starter:
                      </span>
                      {" "}
                      “What does your ideal Sunday look like?”
                    </div>

                    <div>
                      <span className="font-semibold">
                        Living Style Prediction:
                      </span>
                      {" "}
                      Calm, supportive and low-conflict household.
                    </div>

                    <div>
                      <span className="font-semibold">
                        Roommate Success Forecast:
                      </span>
                      {" "}
                      {Math.min(
                        98,
                        selected.result.score + 4
                      )}%
                    </div>

                  </div>
                </div>

                <ul className="mt-3 space-y-2">
                  {selected.result.watchouts.map((w) => (
                    <li key={w}>
                      ⚠ {w}
                    </li>
                  ))}
                </ul>
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
