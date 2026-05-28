import { Sparkles, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-mesh">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-2xl bg-gradient-primary grid place-items-center"><Sparkles className="size-5 text-primary-foreground" /></div>
            <span className="font-display text-xl font-semibold">Zyra <span className="text-gradient">AI</span></span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">A women-only co-living platform built on emotional compatibility, voice-first onboarding, and the strongest safety net in the industry.</p>
          <div className="flex gap-2 mt-5">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} className="size-9 grid place-items-center rounded-xl bg-white/60 hover:bg-white transition" href="#"><Icon className="size-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Product</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Voice onboarding</li><li>Match engine</li><li>Safe Circle</li><li>Room finder</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li><li>Safety pledge</li><li>Careers</li><li>Press</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Zyra AI · Built with care for women, by women.</div>
    </footer>
  );
}
