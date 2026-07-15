// 5-language support: English, Hindi, Bengali, Marathi, Punjabi
// Browser SpeechSynthesis picks the best matching voice per locale.

export type LanguageCode = "en" | "hi" | "bn" | "mr" | "pa";

export interface Language {
  code: LanguageCode;
  label: string;
  native: string;
  bcp47: string;
  flag: string;
}

export const languages: Language[] = [
  { code: "en", label: "English",  native: "English",  bcp47: "en-IN", flag: "🇬🇧" },
  { code: "hi", label: "Hindi",    native: "हिन्दी",     bcp47: "hi-IN", flag: "🇮🇳" },
  { code: "bn", label: "Bengali",  native: "বাংলা",      bcp47: "bn-IN", flag: "🇧🇩" },
  { code: "mr", label: "Marathi",  native: "मराठी",      bcp47: "mr-IN", flag: "🇮🇳" },
  { code: "pa", label: "Punjabi",  native: "ਪੰਜਾਬੀ",     bcp47: "pa-IN", flag: "🇮🇳" },
];

// Each question targets a trait dimension used by the matching algorithm.
// dim: vector index, anchorLow/anchorHigh: keyword groups to score the answer.
export interface SurveyQuestion {
  id: number;
  focus: string;
  dim: keyof TraitVector;
  // keywords that imply a "low" (0-ish) value for this trait
  low: string[];
  // keywords that imply a "high" (1-ish) value for this trait
  high: string[];
  text: Record<LanguageCode, string>;
}

export interface TraitVector {
  earlyRiser: number;
  cleanliness: number;
  focus: number;
  introversion: number;
  noiseTolerance: number;
  safety: number;
  emotional: number;
  empathy: number;
  communication: number;
  boundaries: number;
  conflictResolution: number;
}

export const TRAIT_KEYS: (keyof TraitVector)[] = [
  "earlyRiser",
  "cleanliness",
  "focus",
  "introversion",
  "noiseTolerance",
  "safety",
  "emotional",

  "empathy",
  "communication",
  "boundaries",
  "conflictResolution",
];

// Importance weights — emotional + safety weighted highest (women-first product)
export const TRAIT_WEIGHTS: Record<keyof TraitVector, number> = {
  emotional: 1.8,
  empathy: 1.8,

  communication: 1.6,

  safety: 1.6,

  boundaries: 1.5,

  conflictResolution: 1.5,

  cleanliness: 1.3,

  focus: 1.1,

  earlyRiser: 1.0,

  introversion: 1.0,

  noiseTolerance: 0.9,
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1, focus: "Sleep schedule", dim: "earlyRiser",
    low:  ["late", "night", "midnight", "owl", "2 am", "3 am", "रात", "देर", "রাত", "ਰਾਤ"],
    high: ["early", "morning", "dawn", "sunrise", "5", "6", "सुबह", "जल्दी", "সকাল", "ਸਵੇਰ"],
    text: {
      en: "Tell me about your ideal morning. When do you usually wake up and how do you like to start your day?",
      hi: "अपनी आदर्श सुबह के बारे में बताइए। आप आमतौर पर कब उठती हैं और अपना दिन कैसे शुरू करना पसंद करती हैं?",
      bn: "আপনার আদর্শ সকালের কথা বলুন। আপনি সাধারণত কখন ঘুম থেকে ওঠেন এবং কীভাবে দিন শুরু করতে ভালোবাসেন?",
      mr: "तुमच्या आदर्श सकाळबद्दल सांगा. तुम्ही सहसा किती वाजता उठता आणि दिवस कसा सुरू करायला आवडतो?",
      pa: "ਆਪਣੀ ਆਦਰਸ਼ ਸਵੇਰ ਬਾਰੇ ਦੱਸੋ। ਤੁਸੀਂ ਆਮ ਤੌਰ 'ਤੇ ਕਦੋਂ ਉੱਠਦੇ ਹੋ ਅਤੇ ਆਪਣਾ ਦਿਨ ਕਿਵੇਂ ਸ਼ੁਰੂ ਕਰਨਾ ਪਸੰਦ ਕਰਦੇ ਹੋ?",
    },
  },
  {
    id: 2, focus: "Cleanliness", dim: "cleanliness",
    low:  ["messy", "relaxed", "lazy", "okay with mess", "गंदा", "lazy", "अव्यवस्थित"],
    high: ["clean", "tidy", "neat", "organized", "spotless", "साफ", "व्यवस्थित", "পরিষ্কার", "ਸਾਫ਼"],
    text: {
      en: "How would your closest friend describe your cleanliness habits at home?",
      hi: "आपकी सबसे करीबी दोस्त घर पर आपकी सफाई की आदतों का वर्णन कैसे करेगी?",
      bn: "আপনার ঘনিষ্ঠ বন্ধু বাড়িতে আপনার পরিচ্ছন্নতার অভ্যাস কীভাবে বর্ণনা করবে?",
      mr: "तुमची सर्वात जवळची मैत्रीण घरातील तुमच्या स्वच्छतेच्या सवयींचे वर्णन कसे करेल?",
      pa: "ਤੁਹਾਡੀ ਸਭ ਤੋਂ ਨਜ਼ਦੀਕੀ ਸਹੇਲੀ ਘਰ ਵਿੱਚ ਤੁਹਾਡੀਆਂ ਸਫਾਈ ਦੀਆਂ ਆਦਤਾਂ ਨੂੰ ਕਿਵੇਂ ਬਿਆਨ ਕਰੇਗੀ?",
    },
  },
  {
    id: 3, focus: "Focus / routine", dim: "focus",
    low:  ["flexible", "casual", "background", "music", "tv", "लचीला"],
    high: ["focus", "quiet", "deep work", "concentrate", "silence", "ध्यान", "শান্ত", "ਧਿਆਨ"],
    text: {
      en: "Walk me through a typical work or study day. How focused does your space need to be?",
      hi: "मुझे अपने एक सामान्य काम या पढ़ाई के दिन के बारे में बताइए। आपकी जगह कितनी एकाग्र होनी चाहिए?",
      bn: "আপনার একটি সাধারণ কাজ বা পড়ার দিনের কথা বলুন। আপনার জায়গা কতটা শান্ত হওয়া দরকার?",
      mr: "तुमचा एक सामान्य कामाचा किंवा अभ्यासाचा दिवस सांगा. तुमची जागा किती शांत असावी?",
      pa: "ਆਪਣੇ ਇੱਕ ਆਮ ਕੰਮ ਜਾਂ ਪੜ੍ਹਾਈ ਦੇ ਦਿਨ ਬਾਰੇ ਦੱਸੋ। ਤੁਹਾਡੀ ਜਗ੍ਹਾ ਕਿੰਨੀ ਸ਼ਾਂਤ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ?",
    },
  },
  {
    id: 4, focus: "Social energy", dim: "introversion",
    low:  ["people", "friends", "social", "party", "extrovert", "बाहर", "বন্ধু"],
    high: ["alone", "quiet", "recharge", "introvert", "solo", "अकेले", "একা", "ਇਕੱਲੇ"],
    text: {
      en: "After a long day, do you recharge with people around or with quiet alone time?",
      hi: "एक लंबे दिन के बाद, क्या आप लोगों के साथ रिचार्ज होती हैं या शांत अकेले समय में?",
      bn: "একটি দীর্ঘ দিনের পরে, আপনি কি মানুষের সাথে রিচার্জ হন নাকি একা শান্ত সময়ে?",
      mr: "लांब दिवसानंतर, तुम्ही लोकांसोबत रिचार्ज होता की एकट्या शांत वेळेत?",
      pa: "ਲੰਮੇ ਦਿਨ ਤੋਂ ਬਾਅਦ, ਕੀ ਤੁਸੀਂ ਲੋਕਾਂ ਨਾਲ ਰੀਚਾਰਜ ਹੁੰਦੇ ਹੋ ਜਾਂ ਇਕੱਲੇ ਸ਼ਾਂਤ ਸਮੇਂ ਵਿੱਚ?",
    },
  },
  {
    id: 5, focus: "Noise & guests", dim: "noiseTolerance",
    low:  ["headphones", "silence", "quiet", "no guests", "हेडफोन", "চুপ"],
    high: ["music", "guests", "calls", "loud", "okay", "गाने", "অতিথি", "ਮਹਿਮਾਨ"],
    text: {
      en: "How do you feel about background music, calls, or guests in shared spaces?",
      hi: "साझा स्थानों में पृष्ठभूमि संगीत, कॉल या मेहमानों के बारे में आप कैसा महसूस करती हैं?",
      bn: "ভাগাভাগি জায়গায় ব্যাকগ্রাউন্ড মিউজিক, কল বা অতিথিদের বিষয়ে আপনার কেমন লাগে?",
      mr: "सामायिक जागांमध्ये पार्श्वसंगीत, कॉल किंवा पाहुण्यांबद्दल तुम्हाला कसे वाटते?",
      pa: "ਸਾਂਝੀਆਂ ਥਾਵਾਂ 'ਤੇ ਪਿਛੋਕੜ ਸੰਗੀਤ, ਕਾਲਾਂ ਜਾਂ ਮਹਿਮਾਨਾਂ ਬਾਰੇ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰਦੇ ਹੋ?",
    },
  },
  {
    id: 6, focus: "Safety", dim: "safety",
    low:  ["chill", "relaxed", "casual"],
    high: ["safe", "verified", "secure", "cctv", "trust", "सुरक्षित", "নিরাপদ", "ਸੁਰੱਖਿਅਤ"],
    text: {
      en: "What does feeling safe at home mean to you?",
      hi: "घर पर सुरक्षित महसूस करने का आपके लिए क्या मतलब है?",
      bn: "বাড়িতে নিরাপদ অনুভব করার অর্থ আপনার কাছে কী?",
      mr: "घरी सुरक्षित वाटणे तुमच्यासाठी काय अर्थ ठेवते?",
      pa: "ਘਰ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਮਹਿਸੂਸ ਕਰਨ ਦਾ ਤੁਹਾਡੇ ਲਈ ਕੀ ਮਤਲਬ ਹੈ?",
    },
  },
  {
    id: 7, focus: "Emotional comfort", dim: "emotional",
    low:  ["bottle", "silent", "avoid", "withdraw", "alone", "चुप"],
    high: ["talk", "share", "communicate", "open", "discuss", "बात", "কথা", "ਗੱਲ"],
    text: {
      en: "When something feels off emotionally, how do you usually express it?",
      hi: "जब भावनात्मक रूप से कुछ सही नहीं लगता, तो आप आमतौर पर इसे कैसे व्यक्त करती हैं?",
      bn: "যখন আবেগগতভাবে কিছু ঠিক মনে হয় না, আপনি সাধারণত কীভাবে প্রকাশ করেন?",
      mr: "जेव्हा भावनिकदृष्ट्या काही बरोबर वाटत नाही, तेव्हा तुम्ही ते कसे व्यक्त करता?",
      pa: "ਜਦੋਂ ਭਾਵਨਾਤਮਕ ਤੌਰ 'ਤੇ ਕੁਝ ਸਹੀ ਨਹੀਂ ਲੱਗਦਾ, ਤੁਸੀਂ ਆਮ ਤੌਰ 'ਤੇ ਇਸਨੂੰ ਕਿਵੇਂ ਪ੍ਰਗਟ ਕਰਦੇ ਹੋ?",
    },
  },
  {
    id: 8,
    focus: "Empathy",
    dim: "empathy",

    low: [
      "ignore",
      "leave",
      "busy",
      "their problem"
    ],

    high: [
      "listen",
      "support",
      "help",
      "understand",
      "comfort"
    ],

    text: {
      en: "If your roommate is having a difficult day, what would you most likely do?",
      hi: "यदि आपकी रूममेट का दिन कठिन रहा हो, तो आप सबसे पहले क्या करेंगी?",
      bn: "আপনার রুমমেটের দিন খারাপ গেলে আপনি কী করবেন?",
      mr: "तुमच्या रूममेटचा दिवस कठीण गेला असेल तर तुम्ही काय कराल?",
      pa: "ਜੇ ਤੁਹਾਡੀ ਰੂਮਮੇਟ ਦਾ ਦਿਨ ਮੁਸ਼ਕਲ ਰਿਹਾ ਹੋਵੇ ਤਾਂ ਤੁਸੀਂ ਕੀ ਕਰੋਗੇ?"
    }
  },
  {
    id: 9,
    focus: "Communication",
    dim: "communication",

    low: [
      "avoid",
      "silent",
      "ignore"
    ],

    high: [
      "discuss",
      "talk",
      "communicate",
      "resolve"
    ],

    text: {
      en: "How do you usually handle disagreements with people close to you?",
      hi: "करीबी लोगों से मतभेद होने पर आप उन्हें कैसे संभालती हैं?",
      bn: "ঘনিষ্ঠ মানুষের সাথে মতবিরোধ হলে আপনি কীভাবে সামলান?",
      mr: "जवळच्या लोकांशी मतभेद झाल्यास तुम्ही ते कसे हाताळता?",
      pa: "ਨਜ਼ਦੀਕੀ ਲੋਕਾਂ ਨਾਲ ਅਸਹਿਮਤੀ ਹੋਵੇ ਤਾਂ ਤੁਸੀਂ ਕਿਵੇਂ ਸੰਭਾਲਦੇ ਹੋ?"
    }
  },
  {
    id: 10,
    focus: "Boundaries",
    dim: "boundaries",

    low: [
      "anything",
      "doesnt matter"
    ],

    high: [
      "privacy",
      "respect",
      "personal space",
      "boundaries"
    ],

    text: {
      en: "What makes you feel most comfortable in a shared living space?",
      hi: "साझा रहने की जगह में आपको सबसे अधिक सहज क्या महसूस कराता है?",
      bn: "একটি শেয়ারড স্পেসে কী আপনাকে সবচেয়ে স্বস্তি দেয়?",
      mr: "सामायिक जागेत तुम्हाला सर्वात जास्त आरामदायी काय वाटते?",
      pa: "ਸਾਂਝੇ ਰਹਿਣ ਵਾਲੀ ਥਾਂ ਵਿੱਚ ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵੱਧ ਆਰਾਮਦਾਇਕ ਕੀ ਮਹਿਸੂਸ ਕਰਦਾ ਹੈ?"
    }
  },
  {
    id: 11,
    focus: "Conflict Resolution",
    dim: "conflictResolution",

    low: [
      "fight",
      "angry",
      "shout"
    ],

    high: [
      "solve",
      "understand",
      "compromise",
      "discussion"
    ],

    text: {
      en: "When a conflict happens, how do you usually approach it?",
      hi: "जब कोई विवाद होता है, तो आप उसे कैसे संभालती हैं?",
      bn: "সংঘাত হলে আপনি সাধারণত কীভাবে সামলান?",
      mr: "संघर्ष झाल्यास तुम्ही तो कसा हाताळता?",
      pa: "ਜਦੋਂ ਕੋਈ ਟਕਰਾਅ ਹੁੰਦਾ ਹੈ ਤਾਂ ਤੁਸੀਂ ਇਸਨੂੰ ਕਿਵੇਂ ਹੱਲ ਕਰਦੇ ਹੋ?"
    }
  }
];

export const ui: Record<string, Record<LanguageCode, string>> = {
  recording:      { en: "Listening...",     hi: "सुन रही हूँ...",    bn: "শুনছি...",            mr: "ऐकत आहे...",          pa: "ਸੁਣ ਰਿਹਾ ਹਾਂ..." },
  record:         { en: "Record",           hi: "रिकॉर्ड",            bn: "রেকর্ড",              mr: "रेकॉर्ड",              pa: "ਰਿਕਾਰਡ" },
  stop:           { en: "Stop",             hi: "रोकें",              bn: "থামান",               mr: "थांबवा",               pa: "ਰੋਕੋ" },
  next:           { en: "Next",             hi: "अगला",               bn: "পরবর্তী",             mr: "पुढे",                 pa: "ਅੱਗੇ" },
  rerecord:       { en: "Re-record",        hi: "फिर से रिकॉर्ड",     bn: "আবার রেকর্ড",         mr: "पुन्हा रेकॉर्ड",        pa: "ਮੁੜ ਰਿਕਾਰਡ" },
  results:        { en: "See my matches",   hi: "मेरे मैच देखें",     bn: "আমার ম্যাচ দেখুন",    mr: "माझे मॅच पहा",          pa: "ਮੇਰੇ ਮੈਚ ਦੇਖੋ" },
  transcript:     { en: "Live transcript",  hi: "लाइव ट्रांसक्रिप्ट", bn: "লাইভ ট্রান্সক্রিপ্ট", mr: "लाइव्ह ट्रान्सक्रिप्ट", pa: "ਲਾਈਵ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ" },
  unclear:        {
    en: "Your voice was unclear. Please speak clearly and try again.",
    hi: "आपकी आवाज़ स्पष्ट नहीं थी। कृपया साफ़ बोलें और पुनः प्रयास करें।",
    bn: "আপনার কণ্ঠস্বর অস্পষ্ট ছিল। দয়া করে স্পষ্টভাবে বলুন এবং আবার চেষ্টা করুন।",
    mr: "तुमचा आवाज अस्पष्ट होता. कृपया स्पष्ट बोला आणि पुन्हा प्रयत्न करा.",
    pa: "ਤੁਹਾਡੀ ਆਵਾਜ਼ ਸਪੱਸ਼ਟ ਨਹੀਂ ਸੀ। ਕਿਰਪਾ ਕਰਕੇ ਸਾਫ਼ ਬੋਲੋ ਅਤੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
  },
  question:       { en: "Question",         hi: "प्रश्न",             bn: "প্রশ্ন",              mr: "प्रश्न",               pa: "ਸਵਾਲ" },
  of:             { en: "of",               hi: "में से",             bn: "এর",                  mr: "पैकी",                 pa: "ਵਿੱਚੋਂ" },
};

export function t(key: keyof typeof ui, lang: LanguageCode): string {
  return ui[key]?.[lang] ?? ui[key]?.en ?? key;
}
