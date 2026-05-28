import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mic, Heart, Shield, Brain, Users, Sparkles, ArrowRight,
  CheckCircle2, Lock, Headphones, Star, Activity, Home,
} from "lucide-react";
import { testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zyra AI — Your Space. Your Rhythm. Your Match." },
      { name: "description", content: "Women-only roommate matching powered by voice AI and emotional compatibility." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Mic, title: "Voice-first onboarding", desc: "A 3-minute conversation tells us more than a 50-field form ever could." },
  { icon: Heart, title: "Emotional compatibility", desc: "We match how you feel, not just what you do — tone, rhythm, recovery." },
  { icon: Shield, title: "Safe Circle SOS", desc: "Trusted contacts, voice-triggered alerts, live status — designed for peace of mind." },
  { icon: Brain, title: "AI personality analysis", desc: "Tone, pacing, and language patterns reveal alignment beyond checkboxes." },
  { icon: Users, title: "Women-only ecosystem", desc: "Every profile is verified. Every space is curated. Trust is the baseline." },
  { icon: Lock, title: "Silent Exit", desc: "Uncomfortable? Request a rematch discreetly. We handle the rest." },
];

const stats = [
  { v: "12.4K+", l: "Women onboarded" },
  { v: "92%", l: "Match success rate" },
  { v: "<4 min", l: "Avg. voice intake" },
  { v: "24/7", l: "Safe Circle support" },
];

function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute -top-20 -right-20 size-[420px] rounded-full bg-gradient-primary opacity-30 blur-3xl animate-float" />
        <div className="absolute top-40 -left-20 size-[360px] rounded-full bg-gradient-accent opacity-30 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium">
              <Sparkles className="size-3.5 text-primary" /> Built for women, by women
            </span>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              Your space.<br />
              Your rhythm.<br />
              <span className="text-gradient">Your match.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Zyra AI listens — really listens — and finds you roommates who feel like home. Voice-first, emotionally intelligent, women-only.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/voice-intake" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:-translate-y-0.5 transition-transform">
                <Mic className="size-4" /> Try the Voice AI
              </Link>
              <Link to="/matches" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass font-semibold hover:bg-white/80 transition">
                Find Your Match <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {["A","R","S","M"].map((c, i) => (
                  <div key={i} className="size-8 rounded-full bg-gradient-primary border-2 border-white grid place-items-center text-xs font-bold text-primary-foreground">{c}</div>
                ))}
              </div>
              <div className="flex items-center gap-1"><Star className="size-4 fill-amber-400 text-amber-400" /><span className="font-semibold text-foreground">4.9</span> · 2,800+ reviews</div>
            </div>
          </motion.div>

          {/* Voice orb card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
            <div className="glass-card p-8 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium"><Activity className="size-4 text-primary" /> Live demo</div>
                <span className="text-xs px-2 py-1 rounded-full bg-accent/30 text-accent-foreground">Listening</span>
              </div>
              <div className="my-10 grid place-items-center">
                <div className="relative size-44 grid place-items-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-30 animate-pulse-ring" />
                  <div className="absolute inset-2 rounded-full bg-gradient-primary opacity-40 animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
                  <div className="relative size-32 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
                    <Mic className="size-12 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Transcript</div>
                <p className="text-foreground/90 leading-relaxed">"I'm an early riser, love quiet mornings with chai and journaling. I work from home most days and value a calm, clean space..."</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Early riser","Calm","Tidy","WFH"].map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="glass-card grid grid-cols-2 md:grid-cols-4 divide-x divide-border/60">
          {stats.map((s) => (
            <div key={s.l} className="p-6 text-center">
              <div className="font-display text-3xl sm:text-4xl font-semibold text-gradient">{s.v}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Built different</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3">Five things <span className="text-gradient">no one else</span> is doing.</h2>
          <p className="mt-4 text-muted-foreground">Most platforms match preferences. We match people — and protect them while we do it.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass-card p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="size-12 rounded-2xl bg-gradient-primary grid place-items-center shadow-soft">
                <f.icon className="size-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SAFETY BAND */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 bg-gradient-warm">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Safety-first, always</span>
              <h3 className="font-display text-3xl sm:text-4xl mt-3">Your Safe Circle is one whisper away.</h3>
              <p className="mt-4 text-foreground/80">Voice-triggered SOS. Daily wellness check-ins. Tone-based discomfort detection. Silent Exit for rematching without confrontation.</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {["Voice SOS","Trusted contacts","Emotional safety meter","Silent Exit"].map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-primary" /> {p}</li>
                ))}
              </ul>
              <Link to="/safe-circle" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-foreground text-background font-semibold">Open Safe Circle <ArrowRight className="size-4" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, t: "Verified-only", s: "ID + selfie + voice" },
                { icon: Headphones, t: "24/7 support", s: "Real humans" },
                { icon: Home, t: "Curated spaces", s: "Female-only floors" },
                { icon: Heart, t: "Wellness pulse", s: "Daily check-ins" },
              ].map((c) => (
                <div key={c.t} className="glass p-5 rounded-3xl">
                  <c.icon className="size-6 text-primary" />
                  <div className="font-semibold mt-3">{c.t}</div>
                  <div className="text-xs text-muted-foreground">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="font-display text-4xl sm:text-5xl max-w-xl">Loved by women, <span className="text-gradient">trusted by families.</span></h2>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-7">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-foreground/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold">{t.name[0]}</div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] p-10 sm:p-16 text-center bg-gradient-primary shadow-glow">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl text-primary-foreground">Ready to meet your match?</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">Three minutes of your voice. A lifetime of feeling at home.</p>
            <Link to="/voice-intake" className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white text-primary font-semibold shadow-soft hover:-translate-y-0.5 transition-transform">
              <Mic className="size-4" /> Start your voice intake
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
