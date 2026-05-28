import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/voice-intake", label: "Voice Intake" },
  { to: "/matches", label: "Matches" },
  { to: "/rooms", label: "Rooms" },
  { to: "/safe-circle", label: "Safe Circle" },
  { to: "/admin", label: "Admin" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="glass rounded-3xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-9 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-lg">Zyra <span className="text-gradient">AI</span></div>
              <div className="text-[10px] text-muted-foreground hidden sm:block">Your space. Your rhythm. Your match.</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-white/60 transition-colors"
                activeProps={{ className: "px-3 py-2 rounded-xl text-sm font-semibold text-primary bg-white/70" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow transition-shadow">
              Sign in
            </Link>
            <button onClick={() => setOpen((v) => !v)} className="lg:hidden size-10 grid place-items-center rounded-xl bg-white/60">
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="lg:hidden glass mt-2 rounded-3xl p-3 flex flex-col"
            >
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/60">{l.label}</Link>
              ))}
              <Link to="/auth" onClick={() => setOpen(false)} className="mt-1 px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-primary text-primary-foreground text-center">Sign in</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
