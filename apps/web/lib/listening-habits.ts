export interface DailyBreakdown {
  day: string;
  minutes: number;
}

export interface ListeningHabits {
  weeklyMinutes: number;
  favoriteGenre: string;
  topArtist: string;
  topTrack: string;
  streakDays: number;
  weeklyBreakdown: DailyBreakdown[];
}

export const demoListeningHabits: ListeningHabits = {
  weeklyMinutes: 482,
  favoriteGenre: "Synthwave",
  topArtist: "AI Flow",
  topTrack: "Neural Network Groove",
  streakDays: 12,
  weeklyBreakdown: [
    { day: "Mon", minutes: 60 },
    { day: "Tue", minutes: 45 },
    { day: "Wed", minutes: 72 },
    { day: "Thu", minutes: 38 },
    { day: "Fri", minutes: 95 },
    { day: "Sat", minutes: 110 },
    { day: "Sun", minutes: 62 }
  ]
};
