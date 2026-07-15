import { createFileRoute } from "@tanstack/react-router";
import {
  Heart,
  MapPin,
  Shield,
  MessageCircle,
  Bookmark,
} from "lucide-react";

import { candidates } from "@/lib/mock-data";

export const Route = createFileRoute("/profile/$id")({
  component: ProfilePage,
});

function ProfilePage() {
  const { id } = Route.useParams();

  const candidate = candidates.find(
    (c) => c.id === id
  );

  if (!candidate) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          Candidate not found
        </h1>
      </div>
    );
  }

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-sm border">
          <div className="flex flex-col md:flex-row gap-8 items-center">

            <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-32 h-32 rounded-full object-cover"
                />

            <div className="flex-1">
              <h1 className="text-4xl font-bold">
                {candidate.name}, {candidate.age}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="size-4" />
                {candidate.location}
              </div>

              <p className="mt-4 text-muted-foreground">
                {candidate.bio}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {candidate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mt-2 text-pink-500">
                {candidate.matchScore}%
            </div>

              <div className="text-sm text-muted-foreground">
                Match Score
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white/80 rounded-3xl p-6 border">
            <h3 className="text-sm text-muted-foreground">
              Compatibility
            </h3>

            <div className="text-4xl font-bold mt-2 text-pink-500">
              {candidate.matchScore}%
            </div>
          </div>

          <div className="bg-white/80 rounded-3xl p-6 border">
            <h3 className="text-sm text-muted-foreground">
              Emotional Sync
            </h3>

            <div className="text-4xl font-bold mt-2 text-purple-500">
              {Math.round(candidate.vector.emotional * 100)}%
            </div>
          </div>

          <div className="bg-white/80 rounded-3xl p-6 border">
            <h3 className="text-sm text-muted-foreground">
              Safety Alignment
            </h3>

            <div className="text-4xl font-bold mt-2 text-cyan-500">
              {Math.round(candidate.vector.safety * 100)}%
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white/80 rounded-3xl p-8 mt-8 border">
          <h2 className="text-2xl font-bold mb-4">
            AI Personality Summary
          </h2>

          <p className="text-muted-foreground leading-8">
            Zyra predicts that {candidate.name} values emotional safety,
            respectful communication, and balanced personal space.

            Based on her interview responses, she is most compatible
            with roommates who appreciate trust, cleanliness, personal
            boundaries, and open conversations.

            Her strongest indicators are emotional intelligence,
            communication style, and safety awareness.
          </p>
        </div>
        <div className="bg-white/80 rounded-3xl p-8 mt-8 border">
          <h2 className="text-2xl font-bold mb-6">
            Compatibility Breakdown
          </h2>

          <div className="space-y-5">

            <div>
              <div className="flex justify-between mb-1">
                <span>Empathy</span>
                <span>{Math.round(candidate.vector.empathy * 100)}%</span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 rounded-full bg-pink-500"
                  style={{
                    width: `${Math.round(candidate.vector.empathy * 100)}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Communication</span>
                <span>{Math.round(candidate.vector.communication * 100)}%</span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 rounded-full bg-purple-500"
                  style={{
                    width: `${Math.round(candidate.vector.communication * 100)}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Boundaries</span>
                <span>{Math.round(candidate.vector.boundaries * 100)}%</span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 rounded-full bg-cyan-500"
                  style={{
                    width: `${Math.round(candidate.vector.boundaries * 100)}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Conflict Resolution</span>
                <span>{Math.round(candidate.vector.conflictResolution * 100)}%</span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 rounded-full bg-green-500"
                  style={{
                    width: `${Math.round(candidate.vector.conflictResolution * 100)}%`,
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Voice Insights */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white/80 rounded-3xl p-6 border">
            <h3 className="font-semibold">
              Communication Style
            </h3>

            <p className="mt-3 text-muted-foreground">
              {candidate.vector.communication > 0.75
                ? "Open and expressive communicator."
                : "Reserved but thoughtful communicator."}
            </p>
          </div>

          <div className="bg-white/80 rounded-3xl p-6 border">
            <h3 className="font-semibold">
              Conflict Style
            </h3>

            <p className="mt-3 text-muted-foreground">
              {candidate.vector.conflictResolution > 0.75
                ? "Prefers calm discussion and resolution."
                : "Needs time before discussing disagreements."}
            </p>
          </div>

          <div className="bg-white/80 rounded-3xl p-6 border">
            <h3 className="font-semibold">
              Emotional Intelligence
            </h3>

            <p className="mt-3 text-muted-foreground">
              {candidate.vector.empathy > 0.75
                ? "Highly empathetic and emotionally aware."
                : "Practical and emotionally independent."}
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-8">

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold">
            <MessageCircle className="size-4" />
            Connect
          </button>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border bg-white">
            <Bookmark className="size-4" />
            Save Profile
          </button>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border bg-white">
            <Shield className="size-4" />
            Report
          </button>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border bg-white">
            <Heart className="size-4" />
            Like
          </button>

        </div>

      </div>
    </div>
  );
}