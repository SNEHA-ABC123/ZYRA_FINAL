import { TraitVector } from "./i18n";

export function getArchetype(v: TraitVector) {
  if (
    v.emotional > 0.75 &&
    v.empathy > 0.75
  ) {
    return {
      emoji: "🌸",
      title: "Harmony Seeker",
      description:
        "Values empathy, emotional safety and healthy communication.",
    };
  }

  if (
    v.focus > 0.8 &&
    v.introversion > 0.7
  ) {
    return {
      emoji: "📚",
      title: "Focused Achiever",
      description:
        "Thrives in structured and productive environments.",
    };
  }

  if (
    v.communication > 0.75
  ) {
    return {
      emoji: "💬",
      title: "Supportive Listener",
      description:
        "Builds trust through open and meaningful conversations.",
    };
  }

  return {
    emoji: "✨",
    title: "Balanced Explorer",
    description:
      "Adaptable, easy-going and comfortable in diverse living environments.",
    };
}