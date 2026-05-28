import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LanguageCode } from "@/lib/i18n";
import { buildTraitVector, inferConfidence } from "@/lib/matching";
import type { TraitVector } from "@/lib/i18n";

interface SurveyState {
  language: LanguageCode;
  answers: Record<number, string>;
  setLanguage: (l: LanguageCode) => void;
  setAnswer: (id: number, text: string) => void;
  reset: () => void;
  vector: TraitVector;
  confidence: number;
}

const SurveyCtx = createContext<SurveyState | null>(null);

const KEY = "zyra-survey-v1";

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // hydrate from localStorage on client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.language) setLanguageState(parsed.language);
        if (parsed.answers) setAnswers(parsed.answers);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ language, answers })); } catch { /* ignore */ }
  }, [language, answers]);

  const setLanguage = (l: LanguageCode) => setLanguageState(l);
  const setAnswer = (id: number, text: string) => setAnswers((a) => ({ ...a, [id]: text }));
  const reset = () => setAnswers({});

  const vector = buildTraitVector(answers);
  const confidence = inferConfidence(answers);

  return (
    <SurveyCtx.Provider value={{ language, answers, setLanguage, setAnswer, reset, vector, confidence }}>
      {children}
    </SurveyCtx.Provider>
  );
}

export function useSurvey() {
  const ctx = useContext(SurveyCtx);
  if (!ctx) throw new Error("useSurvey must be used within SurveyProvider");
  return ctx;
}
