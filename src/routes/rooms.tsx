import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, MapPin, Sparkles, CheckCircle2, IndianRupee, Filter } from "lucide-react";
import { rooms } from "@/lib/mock-data";

export const Route = createFileRoute("/rooms")({
  head: () => ({ meta: [{ title: "Smart Room Recommendations · Zyra AI" }, { name: "description", content: "AI-curated rooms for women" }] }),
  component: RoomsPage,
});

function RoomsPage() {
  const [budget, setBudget] = useState(25000);
  const [safety, setSafety] = useState(85);

  const filtered = rooms.filter((r) => r.price <= budget && r.safety >= safety);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Smart recommendations</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-2">Rooms that <span className="text-gradient">fit your life.</span></h1>
          <p className="mt-2 text-muted-foreground">Filtered by budget, lifestyle, safety, location, curfew and routine.</p>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Filters */}
        <aside className="glass-card p-6 h-fit space-y-6 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 font-semibold"><Filter className="size-4 text-primary" /> Filters</div>
          <div>
            <div className="text-sm font-medium mb-2 flex justify-between">Budget <span className="text-primary font-semibold">₹{budget.toLocaleString()}</span></div>
            <input type="range" min={8000} max={35000} step={500} value={budget} onChange={(e) => setBudget(+e.target.value)} className="w-full accent-[oklch(0.62_0.16_320)]" />
          </div>
          <div>
            <div className="text-sm font-medium mb-2 flex justify-between">Min. safety <span className="text-primary font-semibold">{safety}%</span></div>
            <input type="range" min={70} max={99} value={safety} onChange={(e) => setSafety(+e.target.value)} className="w-full accent-[oklch(0.62_0.16_320)]" />
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Lifestyle</div>
            <div className="flex flex-wrap gap-1.5">
              {["Quiet", "Studious", "Social", "Vegetarian", "Pet-friendly"].map((t) => (
                <button key={t} className="text-xs px-3 py-1.5 rounded-full bg-white border border-border hover:bg-secondary transition">{t}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Curfew</div>
            <div className="flex flex-wrap gap-1.5">
              {["No curfew", "10 PM", "11 PM", "Midnight"].map((t) => (
                <button key={t} className="text-xs px-3 py-1.5 rounded-full bg-white border border-border hover:bg-secondary transition">{t}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* Listings */}
        <div className="space-y-5">
          {filtered.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="glass-card overflow-hidden grid md:grid-cols-[260px_1fr]"
            >
              <div className="relative h-48 md:h-auto bg-gradient-primary">
                <div className="absolute inset-0 bg-mesh opacity-40" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-primary"><CheckCircle2 className="size-3" /> Verified</span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-foreground/80 text-background">{r.distance}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 glass rounded-2xl p-3 text-primary-foreground">
                  <div className="text-[10px] uppercase tracking-widest">Mini map</div>
                  <div className="mt-1 h-12 relative rounded-lg bg-white/20 overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-2 gap-px">
                      {Array.from({ length: 12 }).map((_, k) => <div key={k} className="bg-white/10" />)}
                    </div>
                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-glow" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="size-3.5" /> {r.area}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-semibold flex items-center"><IndianRupee className="size-4" />{r.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal ml-1">/mo</span></div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/70 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Safety score</div>
                    <div className="flex items-center gap-1.5 mt-1"><Shield className="size-4 text-primary" /><span className="font-display text-xl font-semibold text-gradient">{r.safety}</span></div>
                  </div>
                  <div className="rounded-2xl bg-white/70 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Compatibility</div>
                    <div className="flex items-center gap-1.5 mt-1"><Sparkles className="size-4 text-primary" /><span className="font-display text-xl font-semibold text-gradient">{r.compat}%</span></div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.perks.map((p) => <span key={p} className="text-[11px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{p}</span>)}
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="px-5 py-2.5 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-soft hover:shadow-glow transition">Book a tour</button>
                  <button className="px-5 py-2.5 rounded-2xl bg-white border border-border font-semibold text-sm hover:bg-muted transition">Save</button>
                </div>
              </div>
            </motion.article>
          ))}
          {filtered.length === 0 && (
            <div className="glass-card p-10 text-center text-muted-foreground">No rooms match your filters yet. Try widening your budget or safety threshold.</div>
          )}
        </div>
      </div>
    </div>
  );
}
