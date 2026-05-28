import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mic, Square, AlertCircle, CheckCircle2, ArrowRight, Volume2 } from "lucide-react";
import { voiceQuestions } from "@/lib/mock-data";

export const Route = createFileRoute("/voice-intake")({
  head: () => ({ meta: [{ title: "Voice Intake · Zyra AI" }, { name: "description", content: "Conversational voice onboarding" }] }),
  component: VoiceIntake,
});

const sampleTranscripts = [
  "I usually wake up around 6:30 and start with chai and a 20-minute journal. Mornings are sacred — I need them slow and quiet.",
  "Honestly, my friends would call me a clean freak in the best way. Dishes don't sit overnight and I love a tidy kitchen.",
  "I work from home four days a week, deep focus blocks in the morning, calls in the afternoon. Background noise really throws me off.",
  "Definitely a recharger. After a long day I need 30–60 minutes alone before I'm ready to socialize again.",
  "I'm okay with music at low volume but please use headphones for calls. Guests are great with a heads-up.",
  "Safety means I never have to wonder who's at the door. Verified entry, lit hallways, and a roommate I trust.",
  "I get quiet when I'm upset. I'd rather write it down first, then talk. Direct but kind communication works for me.",
];

function VoiceIntake() {
  const [step, setStep] = useState(0);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = voiceQuestions[step];
  const total = voiceQuestions.length;
  const progress = ((step + (done ? 1 : 0)) / total) * 100;

  const startRecording = () => {
    setError(null);
    setRecording(true);
    setTranscript("");
    // simulate live transcription
    const full = sampleTranscripts[step];
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setTranscript(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, 30);
  };

  const stopRecording = () => {
    setRecording(false);
    // simulate occasional error
    if (transcript.length < 8) {
      setError("Your voice was unclear. Please speak clearly and try again.");
      return;
    }
    setDone(true);
  };

  const next = () => {
    if (step < total - 1) {
      setStep(step + 1);
      setTranscript("");
      setDone(false);
    }
  };

  const allDone = done && step === total - 1;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Progress */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">Voice intake</span>
          <span className="text-muted-foreground">Question {Math.min(step + 1, total)} of {total}</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full bg-gradient-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.6 }} />
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.1fr_1fr] gap-6">
        {/* Orb */}
        <div className="glass-card p-8 grid place-items-center text-center min-h-[460px]">
          <div className="space-y-8">
            <div className="relative size-56 mx-auto grid place-items-center">
              <AnimatePresence>
                {recording && (
                  <>
                    <motion.div initial={{ scale: 0.9, opacity: 0.6 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity }} className="absolute inset-0 rounded-full bg-gradient-primary" />
                    <motion.div initial={{ scale: 0.9, opacity: 0.4 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.5 }} className="absolute inset-0 rounded-full bg-gradient-accent" />
                  </>
                )}
              </AnimatePresence>
              <motion.div animate={{ scale: recording ? [1, 1.05, 1] : 1 }} transition={{ duration: 1.2, repeat: Infinity }} className="relative size-40 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
                <Mic className="size-16 text-primary-foreground" />
              </motion.div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">{q.focus}</div>
              <p className="mt-2 font-display text-2xl leading-snug max-w-md mx-auto">{q.q}</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              {!recording ? (
                <button onClick={startRecording} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
                  <Mic className="size-4" /> {done ? "Re-record" : "Record"}
                </button>
              ) : (
                <button onClick={stopRecording} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-foreground text-background font-semibold">
                  <Square className="size-4 fill-current" /> Stop
                </button>
              )}
              {done && !allDone && (
                <button onClick={next} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass font-semibold">
                  Next <ArrowRight className="size-4" />
                </button>
              )}
              {allDone && (
                <Link to="/matches" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-accent-foreground font-semibold">
                  See my matches <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="glass-card p-6 min-h-[460px] flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold"><Volume2 className="size-4 text-primary" /> Live transcript</div>
            {recording && <span className="flex items-center gap-2 text-xs text-primary"><span className="size-2 rounded-full bg-primary animate-pulse" /> listening</span>}
          </div>

          <div className="mt-4 flex-1 rounded-2xl bg-white/60 border border-border p-4 text-foreground/90 leading-relaxed overflow-auto">
            {transcript || <span className="text-muted-foreground italic">Your words will appear here as you speak…</span>}
            {recording && <span className="inline-block w-1 h-5 bg-primary ml-0.5 animate-pulse" />}
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <div className="text-sm">{error}</div>
            </div>
          )}

          {done && !error && (
            <div className="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-accent/15 text-accent-foreground border border-accent/30">
              <CheckCircle2 className="size-5 shrink-0 mt-0.5 text-primary" />
              <div className="text-sm">Captured. We picked up <span className="font-semibold">calm energy, structured routine,</span> and <span className="font-semibold">high cleanliness affinity.</span></div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {voiceQuestions.map((qq, i) => (
              <div key={qq.id} className={`h-1.5 rounded-full ${i < step || (i === step && done) ? "bg-gradient-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
