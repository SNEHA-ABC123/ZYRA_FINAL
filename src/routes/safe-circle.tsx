import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Phone, Plus, Mic, Heart, AlertTriangle, Clock, CheckCircle2, Smile, Meh, Frown } from "lucide-react";
import { safeCircle } from "@/lib/mock-data";

export const Route = createFileRoute("/safe-circle")({
  head: () => ({ meta: [{ title: "Safe Circle · Zyra AI" }, { name: "description", content: "Trusted contacts, SOS and wellness check-ins" }] }),
  component: SafeCirclePage,
});

function SafeCirclePage() {
  const [sosActive, setSosActive] = useState(false);
  const [mood, setMood] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Always within reach</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-2">Your <span className="text-gradient">Safe Circle.</span></h1>
          <p className="mt-2 text-muted-foreground">Trusted people, voice-triggered SOS, daily check-ins and emotional safety, in one place.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass">
          <span className="size-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-semibold">All systems safe</span>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1.2fr_1fr] gap-6">
        {/* SOS panel */}
        <div className="glass-card p-8 bg-gradient-warm/40 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Voice SOS</div>
          <p className="mt-2 text-muted-foreground text-sm max-w-md mx-auto">Say "Zyra, I need help" or press to alert your Safe Circle and stream your live location.</p>

          <div className="my-8 grid place-items-center">
            <div className="relative size-52 grid place-items-center">
              <AnimatePresence>
                {sosActive && (
                  <>
                    <motion.div initial={{ scale: 0.9, opacity: 0.7 }} animate={{ scale: 1.7, opacity: 0 }} transition={{ duration: 1.4, repeat: Infinity }} className="absolute inset-0 rounded-full bg-destructive" />
                    <motion.div initial={{ scale: 0.9, opacity: 0.5 }} animate={{ scale: 1.9, opacity: 0 }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.5 }} className="absolute inset-0 rounded-full bg-destructive" />
                  </>
                )}
              </AnimatePresence>
              <button
                onClick={() => setSosActive((v) => !v)}
                className={`relative size-40 rounded-full grid place-items-center font-display text-lg font-bold text-white shadow-glow transition ${sosActive ? "bg-destructive" : "bg-gradient-primary"}`}
              >
                {sosActive ? <><AlertTriangle className="size-10 mb-1" /></> : <><Mic className="size-10 mb-1" /></>}
              </button>
            </div>
            <div className="mt-3 font-semibold">{sosActive ? "SOS sent — circle notified" : "Tap or speak to activate"}</div>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="glass rounded-2xl p-3">
              <Shield className="size-4 text-primary mx-auto" />
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Status</div>
              <div className="text-sm font-semibold">Protected</div>
            </div>
            <div className="glass rounded-2xl p-3">
              <Clock className="size-4 text-primary mx-auto" />
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Last check-in</div>
              <div className="text-sm font-semibold">2h ago</div>
            </div>
            <div className="glass rounded-2xl p-3">
              <Heart className="size-4 text-primary mx-auto" />
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Mood</div>
              <div className="text-sm font-semibold">Calm</div>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="font-display text-xl font-semibold">Trusted contacts</div>
            <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary"><Plus className="size-4" /> Add</button>
          </div>
          <div className="mt-4 space-y-3">
            {safeCircle.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-border">
                <div className="size-11 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold">{c.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{c.name} <span className="text-xs text-muted-foreground font-normal">· {c.relation}</span></div>
                  <div className="text-xs text-muted-foreground">{c.phone}</div>
                </div>
                <span className="text-[10px] inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/30 text-accent-foreground"><CheckCircle2 className="size-3" /> {c.status}</span>
                <button className="size-9 grid place-items-center rounded-xl bg-primary/10 text-primary"><Phone className="size-4" /></button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="font-display text-lg font-semibold">Today's wellness check</div>
            <p className="text-xs text-muted-foreground mt-1">How are you feeling right now?</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { id: "happy", l: "Calm", Icon: Smile, color: "bg-accent/30" },
                { id: "ok", l: "Okay", Icon: Meh, color: "bg-secondary" },
                { id: "low", l: "Low", Icon: Frown, color: "bg-destructive/15" },
              ].map((m) => (
                <button key={m.id} onClick={() => setMood(m.id)} className={`p-3 rounded-2xl border transition ${mood === m.id ? "border-primary bg-primary/10" : "border-border " + m.color}`}>
                  <m.Icon className="size-5 mx-auto" />
                  <div className="text-xs font-medium mt-1">{m.l}</div>
                </button>
              ))}
            </div>
            {mood && (
              <div className="mt-3 text-xs flex items-start gap-2 p-3 rounded-2xl bg-primary/10 text-primary">
                <CheckCircle2 className="size-4 shrink-0" /> Logged. Your circle won't see your mood — only that you checked in.
              </div>
            )}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-gradient-warm/40 border border-border">
            <div className="flex items-center gap-2 font-semibold text-sm"><AlertTriangle className="size-4 text-primary" /> Emotional Safety Meter</div>
            <p className="text-xs text-muted-foreground mt-1">AI is monitoring tone patterns from check-ins. Currently: <span className="font-semibold text-foreground">Healthy.</span></p>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[oklch(0.78_0.11_195)] via-[oklch(0.78_0.14_320)] to-[oklch(0.7_0.2_25)]" style={{ width: "32%" }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>Calm</span><span>Stressed</span><span>Unsafe</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
