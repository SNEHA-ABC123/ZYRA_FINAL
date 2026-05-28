import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, MapPin, Sparkles, Shield, Brain, Users, ArrowRight, Bookmark, MessageCircle } from "lucide-react";
import { matches, compatibilityRadar } from "@/lib/mock-data";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip,
} from "recharts";

export const Route = createFileRoute("/matches")({
  head: () => ({ meta: [{ title: "Your Matches · Zyra AI" }, { name: "description", content: "AI compatibility results" }] }),
  component: MatchesPage,
});

function MatchesPage() {
  const [selected, setSelected] = useState(matches[0]);
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const bars = [
    { name: "Emotional", value: selected.emotional },
    { name: "Lifestyle", value: selected.lifestyle },
    { name: "Cleanliness", value: selected.cleanliness },
    { name: "Safety", value: selected.safety },
    { name: "Social", value: selected.social },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">AI compatibility</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-2">Meet your <span className="text-gradient">top matches.</span></h1>
          <p className="mt-2 text-muted-foreground">Ranked by emotional fit, lifestyle alignment, and shared safety values.</p>
        </div>
        <Link to="/rooms" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft">
          Browse rooms <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_1.4fr] gap-6">
        {/* Match list */}
        <div className="space-y-4">
          {matches.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => setSelected(m)}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`w-full text-left glass-card p-5 transition hover:-translate-y-0.5 ${selected.id === m.id ? "ring-2 ring-primary shadow-glow" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className={`size-14 rounded-2xl bg-gradient-to-br ${m.gradient} grid place-items-center font-display text-xl font-semibold text-white shadow-soft`}>
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-display text-lg font-semibold truncate">{m.name}, {m.age}</div>
                    <div className="font-display text-2xl text-gradient font-semibold">{m.score}%</div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="size-3" /> {m.location}</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary" style={{ width: `${m.score}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.tags.map((t) => <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>)}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail */}
        <motion.div key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="glass-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`size-16 rounded-3xl bg-gradient-to-br ${selected.gradient} grid place-items-center font-display text-2xl font-semibold text-white shadow-soft`}>{selected.avatar}</div>
                <div>
                  <h2 className="font-display text-2xl font-semibold">{selected.name}</h2>
                  <div className="text-sm text-muted-foreground">{selected.role} · {selected.location}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Match score</div>
                <div className="font-display text-4xl text-gradient font-semibold">{selected.score}%</div>
              </div>
            </div>
            <p className="mt-4 text-foreground/90">{selected.bio}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
                <MessageCircle className="size-4" /> Connect
              </button>
              <button onClick={() => toggleSave(selected.id)} className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold border transition ${saved.includes(selected.id) ? "bg-primary/10 text-primary border-primary" : "bg-white border-border"}`}>
                <Bookmark className={`size-4 ${saved.includes(selected.id) ? "fill-current" : ""}`} /> {saved.includes(selected.id) ? "Saved" : "Save match"}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 font-semibold"><Brain className="size-4 text-primary" /> Emotional compatibility</div>
              <div className="mt-3 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={compatibilityRadar}>
                    <PolarGrid stroke="oklch(0.9 0.02 320)" />
                    <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11, fill: "oklch(0.4 0.04 300)" }} />
                    <Radar name="You" dataKey="you" stroke="oklch(0.62 0.16 320)" fill="oklch(0.62 0.16 320)" fillOpacity={0.3} />
                    <Radar name="Them" dataKey="them" stroke="oklch(0.78 0.11 195)" fill="oklch(0.78 0.11 195)" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 font-semibold"><Users className="size-4 text-primary" /> Lifestyle metrics</div>
              <div className="mt-3 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bars} layout="vertical" margin={{ left: 10 }}>
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
              <div>
                <div className="font-display text-xl font-semibold">Why this match?</div>
                <p className="mt-2 text-foreground/90 leading-relaxed">{selected.why}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { l: "Safety", v: selected.safety, i: Shield },
                    { l: "Emotional", v: selected.emotional, i: Heart },
                    { l: "Cleanliness", v: selected.cleanliness, i: Sparkles },
                  ].map((c) => (
                    <div key={c.l} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 text-xs font-medium">
                      <c.i className="size-3.5 text-primary" /> {c.l}: <span className="text-gradient font-bold">{c.v}%</span>
                    </div>
                  ))}
                </div>
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
