import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SurveyProvider } from "@/context/SurveyContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4">
      <div className="glass-card p-10 text-center max-w-md">
        <h1 className="text-7xl font-display font-bold text-gradient">404</h1>
        <p className="mt-3 text-muted-foreground">This page slipped out of your circle.</p>
        <Link to="/" className="mt-6 inline-flex px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4">
      <div className="glass-card p-10 text-center max-w-md">
        <h1 className="font-display text-2xl">Something didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again in a moment.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zyra AI — Your Space. Your Rhythm. Your Match." },
      { name: "description", content: "AI-powered women-only roommate matching and safe co-living platform. Voice onboarding, emotional compatibility, Safe Circle." },
      { property: "og:title", content: "Zyra AI" },
      { property: "og:description", content: "Your Space. Your Rhythm. Your Match." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SurveyProvider>
        <div className="min-h-screen bg-mesh">
          <Nav />
          <main className="pt-24">
            <Outlet />
          </main>
          <Footer />
        </div>
      </SurveyProvider>
    </QueryClientProvider>
  );
}
