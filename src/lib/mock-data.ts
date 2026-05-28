import type { TraitVector } from "./i18n";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

export interface Candidate {
  id: string;
  name: string;
  age: number;
  role: string;
  location: string;
  bio: string;
  tags: string[];
  avatar: string;
  vector: TraitVector;
}

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Aanya Sharma", age: 23, role: "Working Professional",
    location: "Koramangala, Bangalore",
    bio: "Quiet mornings, productive evenings. Loves matcha, books and slow Sundays.",
    tags: ["Early riser", "Tidy", "Non-smoker", "Yoga"],
    avatar: avatar1,
    vector: { earlyRiser: 0.92, cleanliness: 0.95, focus: 0.88, introversion: 0.72, noiseTolerance: 0.25, safety: 0.96, emotional: 0.9 },
  },
  {
    id: "2",
    name: "Riya Mehta", age: 21, role: "Student",
    location: "HSR Layout, Bangalore",
    bio: "Design student. Plants, playlists, and post-midnight study sprints.",
    tags: ["Night owl", "Creative", "Pet-friendly", "Vegetarian"],
    avatar: avatar2,
    vector: { earlyRiser: 0.2, cleanliness: 0.7, focus: 0.6, introversion: 0.4, noiseTolerance: 0.7, safety: 0.85, emotional: 0.78 },
  },
  {
    id: "3",
    name: "Saanvi Iyer", age: 25, role: "Working Professional",
    location: "Indiranagar, Bangalore",
    bio: "Product manager who runs at dawn and journals at dusk.",
    tags: ["Athletic", "Mindful", "Cooks often", "Quiet"],
    avatar: avatar3,
    vector: { earlyRiser: 0.95, cleanliness: 0.88, focus: 0.85, introversion: 0.6, noiseTolerance: 0.35, safety: 0.92, emotional: 0.82 },
  },
  {
    id: "4",
    name: "Meher Kaur", age: 22, role: "Intern",
    location: "Whitefield, Bangalore",
    bio: "Tech intern, plant mom, weekend hiker. Loves quiet kitchens.",
    tags: ["Mindful", "Vegetarian", "Tidy", "Hiker"],
    avatar: avatar1,
    vector: { earlyRiser: 0.78, cleanliness: 0.9, focus: 0.75, introversion: 0.55, noiseTolerance: 0.4, safety: 0.94, emotional: 0.85 },
  },
];

export const rooms = [
  {
    id: "r1",
    title: "Sunlit 2BHK near Forum Mall",
    area: "Koramangala 5th Block",
    price: 18500,
    safety: 96,
    compat: 92,
    distance: "1.2 km",
    verified: true,
    perks: ["24/7 Security", "Female-only floor", "CCTV", "Bio-metric entry"],
  },
  {
    id: "r2",
    title: "Cozy private room, PG-style",
    area: "HSR Layout Sector 2",
    price: 12500,
    safety: 91,
    compat: 88,
    distance: "2.4 km",
    verified: true,
    perks: ["Warden on-site", "Meals included", "Wi-Fi", "Laundry"],
  },
  {
    id: "r3",
    title: "Modern studio with balcony",
    area: "Indiranagar 100ft Rd",
    price: 22500,
    safety: 98,
    compat: 85,
    distance: "3.1 km",
    verified: true,
    perks: ["Smart locks", "Female community", "Gym", "Yoga deck"],
  },
];

export const testimonials = [
  { name: "Pooja R.", role: "Software Engineer", quote: "Zyra matched me with someone who feels like home. The voice onboarding felt like talking to a friend." },
  { name: "Meher K.", role: "Design Intern", quote: "Safe Circle check-ins genuinely changed how my parents feel about me living away." },
  { name: "Ananya D.", role: "MBA Student", quote: "94% compatibility — and it was real. Sleep schedules, energy, even how we handle conflict." },
];

export const safeCircle = [
  { name: "Mom", relation: "Mother", phone: "+91 98765 43210", status: "Verified" },
  { name: "Kavya", relation: "Best friend", phone: "+91 99887 76655", status: "Verified" },
  { name: "Dad", relation: "Father", phone: "+91 98123 45678", status: "Verified" },
];

export const adminStats = {
  users: 12480,
  activeNow: 1842,
  successfulMatches: 3960,
  successRate: 92,
  safetyAlerts: 7,
  occupancy: 78,
};

export const matchTrend = [
  { month: "Jan", matches: 210, safety: 2 },
  { month: "Feb", matches: 320, safety: 1 },
  { month: "Mar", matches: 410, safety: 3 },
  { month: "Apr", matches: 520, safety: 1 },
  { month: "May", matches: 640, safety: 2 },
  { month: "Jun", matches: 780, safety: 1 },
  { month: "Jul", matches: 910, safety: 4 },
];
