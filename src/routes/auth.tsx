import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, ArrowRight, Sparkles, GraduationCap, Briefcase, Coffee, Building2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in · Zyra AI" }, { name: "description", content: "Sign in to Zyra AI" }] }),
  component: Auth,
});

const roles = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "pro", label: "Working Professional", icon: Briefcase },
  { id: "intern", label: "Intern", icon: Coffee },
  { id: "pg", label: "PG Resident", icon: Building2 },
];

function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [role, setRole] = useState("pro");
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Illustration side */}
        <div className="relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-primary min-h-[520px]">
          <div className="absolute inset-0 bg-mesh opacity-40" />
          <div className="relative h-full flex flex-col">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Sparkles className="size-5" /> <span className="font-display text-xl font-semibold">Zyra AI</span>
            </div>
            <div className="mt-auto text-primary-foreground">
              <h2 className="font-display text-4xl sm:text-5xl leading-tight">Welcome to a softer, safer way to find home.</h2>
              <p className="mt-4 text-primary-foreground/85 max-w-md">Verified women, voice-based onboarding, and a Safe Circle that travels with you.</p>
            </div>
            {/* floating bubbles */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-20 right-10 glass rounded-3xl p-4 text-primary-foreground">
              <div className="text-xs">Compatibility</div>
              <div className="font-display text-3xl font-semibold">94%</div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-32 right-20 glass rounded-2xl p-3 text-primary-foreground">
              <div className="flex items-center gap-2 text-xs"><span className="size-2 rounded-full bg-green-300 animate-pulse" /> Safe Circle active</div>
            </motion.div>
          </div>
        </div>

        {/* Form side */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 sm:p-10">
          <div className="flex bg-muted rounded-2xl p-1 w-fit">
            {(["signup", "signin"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${mode === m ? "bg-white shadow-soft text-foreground" : "text-muted-foreground"}`}>
                {m === "signup" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-3xl mt-6">{mode === "signup" ? "Join Zyra" : "Welcome back"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{mode === "signup" ? "Your voice. Your match. Your safe space." : "Pick up right where you left off."}</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/voice-intake" }); }}>
            <div>
              <label className="text-xs font-semibold text-foreground/70">Email</label>
              <div className="mt-1.5 flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-border focus-within:ring-2 focus-within:ring-primary/30">
                <Mail className="size-4 text-muted-foreground" />
                <input type="email" required placeholder="you@zyra.ai" className="flex-1 bg-transparent outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70">Password</label>
              <div className="mt-1.5 flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-border focus-within:ring-2 focus-within:ring-primary/30">
                <Lock className="size-4 text-muted-foreground" />
                <input type="password" required placeholder="••••••••" className="flex-1 bg-transparent outline-none text-sm" />
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold text-foreground/70">I'm a…</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {roles.map((r) => (
                    <button type="button" key={r.id} onClick={() => setRole(r.id)} className={`flex items-center gap-2 px-3 py-3 rounded-2xl border text-sm font-medium transition ${role === r.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-white hover:bg-muted"}`}>
                      <r.icon className="size-4" /> {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
              {mode === "signup" ? "Create account" : "Sign in"} <ArrowRight className="size-4" />
            </button>

            <div className="relative my-4 text-center">
              <div className="h-px bg-border" />
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-card px-3 text-xs text-muted-foreground">or</span>
            </div>

            <button type="button" className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-border font-semibold hover:bg-muted transition">
              <svg className="size-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.1 29.3 3 24 3a21 21 0 1 0 0 42c11.6 0 21-9.4 21-21 0-1.3-.1-2.6-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.1 29.3 3 24 3 16.3 3 9.7 7.6 6.3 14.7z"/><path fill="#4CAF50" d="M24 45c5.2 0 10-2 13.6-5.2l-6.3-5.2c-2 1.4-4.5 2.3-7.3 2.3-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 40.3 16.2 45 24 45z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.3 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.3-.1-2.6-.4-3.5z"/></svg>
              Continue with Google
            </button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">By continuing you agree to Zyra's safety pledge and women-only verification.</p>
        </motion.div>
      </div>
    </div>
  );
}
