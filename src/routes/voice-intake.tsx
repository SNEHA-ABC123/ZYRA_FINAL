import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Mic, Square, AlertCircle, CheckCircle2, ArrowRight, Volume2, VolumeX, Globe, Sparkles } from "lucide-react";
import { languages, surveyQuestions, LanguageCode, t } from "@/lib/i18n";
import { useVoiceAgent } from "@/hooks/useVoiceAgent";
import { useSurvey } from "@/context/SurveyContext";

export const Route = createFileRoute("/voice-intake")({
  head: () => ({ meta: [{ title: "Voice Intake · Zyra AI" }, { name: "description", content: "Conversational voice onboarding in 5 languages" }] }),
  component: VoiceIntake,
});

function VoiceIntake() {
  const navigate = useNavigate();
  const { language, setLanguage, setAnswer, answers , confidence} = useSurvey();
  const { speak, stopSpeaking, speaking, startListening, stopListening, listening, transcript, resetTranscript, supported } = useVoiceAgent();

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = surveyQuestions[step];
  const total = surveyQuestions.length;
  const lang = languages.find((l) => l.code === language)!;
  const progress = ((step + (done ? 1 : 0)) / total) * 100;

  // Speak the question whenever step or language changes
  useEffect(() => {
    setError(null);
    setDone(false);
    resetTranscript();
    const text = q.text[language];
    const timeout = setTimeout(() => {
      speak({ text, lang: lang.bcp47 });
    }, 300);
    return () => {
      clearTimeout(timeout);
      stopSpeaking();
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, language]);

  const replayQuestion = () => speak({ text: q.text[language], lang: lang.bcp47 });

  const handleStart = () => {
    setError(null);
    resetTranscript();
    stopSpeaking();
    if (supported.stt) {
      startListening(lang.bcp47);
    } else {
      // Fallback: simulate transcript so the demo works on browsers without STT
      const samples: Record<number, string> = {
        1: "I wake up around 6 in the morning and love a quiet start with chai.",
        2: "My friends would say I'm very tidy and organized.",
        3: "I need deep focus and quiet during work hours.",
        4: "I recharge with quiet alone time after a long day.",
        5: "I'm okay with low music but prefer headphones for calls.",
        6: "Safety means verified entry and trusted roommates.",
        7: "I prefer to talk things out openly and kindly.",
        8: "I care deeply about how other people feel.",
        9: "I communicate directly and respectfully.",
        10: "I value personal space and healthy boundaries.",
        11: "I prefer resolving conflicts through discussion."
      };
      const full = samples[q.id] ?? "I value calm, clean and safe living.";
      let i = 0;
      const int = setInterval(() => {
        i += 2;
        const partial = full.slice(0, i);
        (window as any).__zyraPartial = partial;
        if (i >= full.length) {
          clearInterval(int);
          setAnswer(q.id, full);
          setDone(true);
        }
      }, 30);
    }
  };

  const handleStop = () => {
    stopListening();
    const text = transcript.trim();
    if (text.length < 8) {
      setError(t("unclear", language));
      return;
    }
    setAnswer(q.id, text);
    setDone(true);
  };

  const next = () => {
    if (step < total - 1) setStep(step + 1);
  };

  const allDone = done && step === total - 1;
  useEffect(() => {
    if (allDone) {
      const timer = setTimeout(() => {
        navigate({ to: "/matches" });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [allDone, navigate]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Language selector + progress */}
      <div className="glass-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <div className="flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${language === l.code ? "bg-gradient-primary text-primary-foreground shadow-soft" : "bg-white/70 hover:bg-white"}`}
                  title={l.label}
                >
                  {l.flag} {l.native}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {t("question", language)} {Math.min(step + 1, total)} {t("of", language)} {total}
            </div>

            <div className="text-xs text-primary mt-1">
              ~ {Math.max(1, total - step)} min remaining
            </div>
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full bg-gradient-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Personality Confidence
          </span>

          <span className="font-semibold text-primary">
            {Math.round(confidence)}%
          </span>
        </div>

        <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-violet-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.1fr_1fr] gap-6">
        {/* Voice orb */}
        <div className="glass-card p-8 grid place-items-center text-center min-h-[480px]">
          <div className="space-y-8 w-full">
            <div className="relative size-56 mx-auto grid place-items-center">
              <AnimatePresence>
                {(listening || speaking) && (
                  <>
                    <motion.div initial={{ scale: 0.9, opacity: 0.6 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity }} className={`absolute inset-0 rounded-full ${speaking ? "bg-gradient-accent" : "bg-gradient-primary"}`} />
                    <motion.div initial={{ scale: 0.9, opacity: 0.4 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.5 }} className={`absolute inset-0 rounded-full ${speaking ? "bg-gradient-primary" : "bg-gradient-accent"}`} />
                  </>
                )}
              </AnimatePresence>
              <motion.div
                animate={{ scale: listening || speaking ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="relative size-40 rounded-full bg-gradient-primary grid place-items-center shadow-glow border border-white/30"
              >
                {speaking ? <Volume2 className="size-16 text-primary-foreground" /> : <Mic className="size-16 text-primary-foreground" />}
              </motion.div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
                <Sparkles className="size-3" /> {q.focus}
              </div>
              <p className="mt-2 font-display text-2xl leading-snug max-w-xl mx-auto" lang={lang.bcp47}>{q.text[language]}</p>
              <button onClick={replayQuestion} className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
                <Volume2 className="size-3.5" /> Replay question
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              {!listening ? (
                <button onClick={handleStart} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
                  <Mic className="size-4" /> {done ? t("rerecord", language) : t("record", language)}
                </button>
              ) : (
                <button onClick={handleStop} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-foreground text-background font-semibold">
                  <Square className="size-4 fill-current" /> {t("stop", language)}
                </button>
              )}
              {speaking && (
                <button onClick={stopSpeaking} className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-border text-sm font-semibold">
                  <VolumeX className="size-4" /> Mute agent
                </button>
              )}
              {done && !allDone && (
                <button onClick={next} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass font-semibold">
                  {t("next", language)} <ArrowRight className="size-4" />
                </button>
              )}
              {allDone && (
                <div className="flex flex-col items-center gap-3">
                  <div className="text-primary font-medium animate-pulse">
                    Analyzing your personality...
                  </div>

                  <Link
                    to="/matches"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-accent-foreground font-semibold"
                  >
                    {t("results", language)}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}
            </div>

            {!supported.stt && (
              <p className="text-xs text-muted-foreground">
                Your browser doesn't support live speech recognition — we'll simulate the transcript for demo. The voice agent will still speak each question aloud.
              </p>
            )}
          </div>
        </div>

        {/* Transcript */}
        <div className="glass-card p-6 min-h-[480px] flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold"><Volume2 className="size-4 text-primary" /> {t("transcript", language)}</div>
            {listening && <span className="flex items-center gap-2 text-xs text-primary"><span className="size-2 rounded-full bg-primary animate-pulse" /> {t("recording", language)}</span>}
            {speaking && <span className="flex items-center gap-2 text-xs text-accent-foreground"><span className="size-2 rounded-full bg-accent animate-pulse" /> Agent speaking</span>}
          </div>

          <div className="mt-4 flex-1 rounded-2xl bg-white/60 border border-border p-4 text-foreground/90 leading-relaxed overflow-auto" lang={lang.bcp47}>
            {transcript || answers[q.id] || <span className="text-muted-foreground italic">Your words will appear here as you speak…</span>}
            {listening && <span className="inline-block w-1 h-5 bg-primary ml-0.5 animate-pulse align-middle" />}
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <div className="text-sm">{error}</div>
            </div>
          )}

          {done && !error && (
            
            <div className="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-accent/15 border border-accent/30">
              <CheckCircle2 className="size-5 shrink-0 mt-0.5 text-primary" />
              <div className="text-sm">
                Response captured successfully.
                <div className="mt-4 rounded-xl border bg-purple-50 p-4">
                  <h3 className="text-sm font-semibold text-purple-700 mb-3">
                    🧠 Emotional Signals Detected
                    <div className="mt-4 rounded-xl border bg-green-50 p-4">
                      <h3 className="text-sm font-semibold text-green-700 mb-2">
                        🎤 Voice Clarity
                      </h3>

                      <div className="flex justify-between text-xs mb-1">
                        <span>Clarity Score</span>
                        <span>87%</span>
                      </div>

                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: "87%" }}
                        />
                      </div>
                    </div>
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Empathy</span>
                      <span>84%</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Communication</span>
                      <span>91%</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Boundaries</span>
                      <span>76%</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Conflict Style</span>
                      <span>88%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-1 text-xs text-muted-foreground">
                  Zyra updated your
                  <span className="font-semibold ml-1">
                    {q.dim}
                  </span>
                  personality trait.
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {surveyQuestions.map((qq, i) => (
              <div key={qq.id} className={`h-1.5 rounded-full ${i < step || (i === step && done) ? "bg-gradient-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
