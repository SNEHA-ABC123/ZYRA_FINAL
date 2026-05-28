export const matches = [
  {
    id: "1",
    name: "Aanya Sharma",
    age: 23,
    role: "Working Professional",
    location: "Koramangala, Bangalore",
    score: 94,
    emotional: 96,
    lifestyle: 91,
    cleanliness: 95,
    safety: 98,
    social: 88,
    bio: "Quiet mornings, productive evenings. Loves matcha, books and slow Sundays.",
    tags: ["Early riser", "Tidy", "Non-smoker", "Yoga"],
    why: "You both share a calm evening routine, a high cleanliness bar, and value emotional safety. Aanya's introvert-leaning energy beautifully complements your reflective nature.",
    avatar: "AS",
    gradient: "from-[oklch(0.85_0.12_320)] to-[oklch(0.85_0.1_350)]",
  },
  {
    id: "2",
    name: "Riya Mehta",
    age: 21,
    role: "Student",
    location: "HSR Layout, Bangalore",
    score: 89,
    emotional: 87,
    lifestyle: 92,
    cleanliness: 85,
    safety: 94,
    social: 90,
    bio: "Design student. Plants, playlists, and post-midnight study sprints.",
    tags: ["Night owl", "Creative", "Pet-friendly", "Vegetarian"],
    why: "Aligned study rhythms and shared appreciation for creative downtime. Slight gap in cleanliness preference — manageable with a shared chore system.",
    avatar: "RM",
    gradient: "from-[oklch(0.85_0.1_10)] to-[oklch(0.85_0.12_30)]",
  },
  {
    id: "3",
    name: "Saanvi Iyer",
    age: 25,
    role: "Working Professional",
    location: "Indiranagar, Bangalore",
    score: 86,
    emotional: 90,
    lifestyle: 84,
    cleanliness: 88,
    safety: 96,
    social: 80,
    bio: "Product manager who runs at dawn and journals at dusk.",
    tags: ["Athletic", "Mindful", "Cooks often", "Quiet"],
    why: "Strong emotional and safety alignment. Saanvi's structured routine supports your focus blocks.",
    avatar: "SI",
    gradient: "from-[oklch(0.85_0.12_195)] to-[oklch(0.85_0.1_250)]",
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

export const voiceQuestions = [
  { id: 1, q: "Tell me about your ideal morning. When do you usually wake up and how do you like to start your day?", focus: "Sleep schedule" },
  { id: 2, q: "How would your closest friend describe your cleanliness habits at home?", focus: "Cleanliness" },
  { id: 3, q: "Walk me through a typical work or study day. How focused does your space need to be?", focus: "Routine" },
  { id: 4, q: "After a long day, do you recharge with people around or with quiet alone time?", focus: "Social energy" },
  { id: 5, q: "How do you feel about background music, calls, or guests in shared spaces?", focus: "Noise & guests" },
  { id: 6, q: "What does feeling safe at home mean to you?", focus: "Safety" },
  { id: 7, q: "When something feels off emotionally, how do you usually express it?", focus: "Emotional comfort" },
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

export const compatibilityRadar = [
  { trait: "Emotional", you: 92, them: 96 },
  { trait: "Lifestyle", you: 88, them: 91 },
  { trait: "Cleanliness", you: 94, them: 95 },
  { trait: "Safety", you: 96, them: 98 },
  { trait: "Social", you: 80, them: 88 },
  { trait: "Routine", you: 90, them: 93 },
];
