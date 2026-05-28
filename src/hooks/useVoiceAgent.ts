/**
 * Voice agent hook — wraps the browser's Web Speech API (TTS + STT).
 * Falls back gracefully when APIs are unavailable.
 */
import { useCallback, useEffect, useRef, useState } from "react";

interface SpeakOptions {
  text: string;
  lang: string;       // BCP-47 e.g. "hi-IN"
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
}

export function useVoiceAgent() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState({ tts: false, stt: false });
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ttsOk = "speechSynthesis" in window;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSupported({ tts: ttsOk, stt: !!SR });

    if (ttsOk) {
      const load = () => setVoices(window.speechSynthesis.getVoices());
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
    return () => {
      try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
      try { recognitionRef.current?.stop(); } catch { /* noop */ }
    };
  }, []);

  const pickVoice = useCallback((lang: string) => {
    if (!voices.length) return undefined;
    // Try exact match first, then language prefix, then English fallback
    const prefix = lang.split("-")[0];
    return (
      voices.find((v) => v.lang === lang) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith(prefix)) ||
      voices.find((v) => v.lang?.startsWith("en")) ||
      voices[0]
    );
  }, [voices]);

  const speak = useCallback(({ text, lang, rate = 0.95, pitch = 1.05, onEnd }: SpeakOptions) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { onEnd?.(); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.pitch = pitch;
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.onstart = () => setSpeaking(true);
    u.onend = () => { setSpeaking(false); onEnd?.(); };
    u.onerror = () => { setSpeaking(false); onEnd?.(); };
    window.speechSynthesis.speak(u);
  }, [pickVoice]);

  const stopSpeaking = useCallback(() => {
    try { window.speechSynthesis.cancel(); } catch { /* noop */ }
    setSpeaking(false);
  }, []);

  const startListening = useCallback((lang: string, onResult?: (final: string) => void) => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = lang;
    rec.continuous = true;
    rec.interimResults = true;
    setTranscript("");
    rec.onresult = (e: any) => {
      let interim = "", finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      setTranscript((prev) => (finalText ? (prev + " " + finalText).trim() : prev + interim));
      if (finalText) onResult?.(finalText.trim());
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  }, []);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch { /* noop */ }
    setListening(false);
  }, []);

  const resetTranscript = useCallback(() => setTranscript(""), []);

  return { speak, stopSpeaking, speaking, startListening, stopListening, listening, transcript, resetTranscript, supported };
}
