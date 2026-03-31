export interface ArtistRecord {
  id: string;
  slug: string;
  name: string;
  genre: string;
  bio: string;
  city: string;
  accent: string;
  avatarUrl: string;
  monthlyListeners: number;
  totalStreams: number;
  trackCount: number;
  joinedAt: string;
}

export interface StoredFileRef {
  kind: "public" | "temp" | "remote";
  fileName: string;
  fileUrl: string;
  mimeType: string;
  filePath?: string;
}

export interface TrackRecord {
  id: string;
  slug: string;
  artistId: string;
  artistName: string;
  title: string;
  genre: string;
  mood: string;
  durationSec: number;
  bpm: number;
  coverUrl: string;
  previewUrl: string;
  streams: number;
  likes: number;
  uploadedAt: string;
  sourceFileName: string;
  provider: "seed" | "upload" | "suno" | "mock";
  prompt?: string;
  storage?: StoredFileRef;
}

export interface HomeSnapshot {
  artists: ArtistRecord[];
  tracks: TrackRecord[];
  totalArtists: number;
  totalTracks: number;
  totalStreams: number;
  weeklyGrowthPercent: number;
}

export interface AdminSnapshot extends HomeSnapshot {
  avgTracksPerArtist: number;
}

export interface IngestResult {
  artistCreated: boolean;
  artist: ArtistRecord;
  track: TrackRecord;
}

interface UploadTrackInput {
  trackId: string;
  artistName: string;
  title: string;
  fileName: string;
  previewUrl: string;
  storage: StoredFileRef;
}

interface GeneratedTrackInput {
  title: string;
  artistName: string;
  prompt: string;
  previewUrl: string;
  provider: "suno" | "mock";
  storage: StoredFileRef;
}

const accentPalette = ["#7C4DFF", "#4CC9F0", "#5B8CFF", "#9B5DE5", "#22C55E", "#F97316"] as const;
const genres = ["Alt R&B", "Trap Soul", "Indie Pop", "Lo-fi", "Afrobeats", "Drill", "Synthwave"] as const;
const moods = ["Late Night", "Cinematic", "Velvet", "Dark Pulse", "Glow", "After Hours"] as const;
const previewUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
] as const;

const lesj = createArtist({
  id: "artist_lesj",
  name: "LESJ",
  genre: "Alt R&B",
  bio: "Dominican-born storyteller blending velvet melodies with AI-assisted production.",
  city: "New York, US",
  accent: "#7C4DFF",
  monthlyListeners: 18420,
  totalStreams: 604201,
  joinedAt: "2026-01-03T10:00:00.000Z"
});

const ricoMilano = createArtist({
  id: "artist_rico",
  name: "Rico Milano",
  genre: "Drill",
  bio: "Street-coded hooks, precision drops, and premium rollout instincts.",
  city: "Toronto, CA",
  accent: "#4CC9F0",
  monthlyListeners: 13110,
  totalStreams: 480881,
  joinedAt: "2026-01-18T10:00:00.000Z"
});

const artizz = createArtist({
  id: "artist_artizz",
  name: "Artizz",
  genre: "Indie Pop",
  bio: "Bright toplines and futuristic textures designed for repeat plays.",
  city: "London, UK",
  accent: "#5B8CFF",
  monthlyListeners: 9705,
  totalStreams: 320446,
  joinedAt: "2026-02-03T10:00:00.000Z"
});

const nani = createArtist({
  id: "artist_nani",
  name: "Nani",
  genre: "RnB",
  bio: "Nani is a rising star with a unique sound that blends classic RnB elements with a modern, melodic twist.",
  city: "Remote Studio",
  accent: "#9B5DE5",
  monthlyListeners: 156000,
  totalStreams: 1200000,
  joinedAt: "2026-03-01T10:00:00.000Z"
});

const seedArtists: ArtistRecord[] = [lesj, ricoMilano, artizz, nani];

const seedTracks: TrackRecord[] = [
  createTrack({
    id: "track_afterglow",
    artist: lesj,
    title: "Afterglow Receiver",
    genre: "Alt R&B",
    mood: "After Hours",
    durationSec: 153,
    bpm: 102,
    streams: 128902,
    likes: 9201,
    uploadedAt: "2026-03-20T08:00:00.000Z",
    sourceFileName: "LESJ - Afterglow Receiver.mp3",
    previewUrl: previewUrls[0],
    provider: "seed"
  }),
  createTrack({
    id: "track_runup",
    artist: ricoMilano,
    title: "Run Up The Skyline",
    genre: "Drill",
    mood: "Dark Pulse",
    durationSec: 145,
    bpm: 141,
    streams: 84502,
    likes: 6109,
    uploadedAt: "2026-03-18T08:00:00.000Z",
    sourceFileName: "Rico Milano - Run Up The Skyline.mp3",
    previewUrl: previewUrls[1],
    provider: "seed"
  }),
  createTrack({
    id: "track_velvet",
    artist: artizz,
    title: "Velvet Static",
    genre: "Indie Pop",
    mood: "Glow",
    durationSec: 171,
    bpm: 116,
    streams: 53002,
    likes: 4720,
    uploadedAt: "2026-03-14T08:00:00.000Z",
    sourceFileName: "Artizz - Velvet Static.mp3",
    previewUrl: previewUrls[2],
    provider: "seed"
  }),
  createTrack({
    id: "track_bluehour",
    artist: lesj,
    title: "Blue Hour Signal",
    genre: "Alt R&B",
    mood: "Late Night",
    durationSec: 162,
    bpm: 98,
    streams: 46220,
    likes: 3352,
    uploadedAt: "2026-03-10T08:00:00.000Z",
    sourceFileName: "LESJ - Blue Hour Signal.mp3",
    previewUrl: previewUrls[3],
    provider: "seed"
  }),
  createTrack({
    id: "track_hypecode",
    artist: ricoMilano,
    title: "Hypecode Freestyle",
    genre: "Drill",
    mood: "Cinematic",
    durationSec: 139,
    bpm: 138,
    streams: 38214,
    likes: 2648,
    uploadedAt: "2026-03-07T08:00:00.000Z",
    sourceFileName: "Rico Milano - Hypecode Freestyle.mp3",
    previewUrl: previewUrls[4],
    provider: "seed"
  }),
  createTrack({
    id: "track_nani_ojz",
    artist: nani,
    title: "Nani Ojz 2.17.23",
    genre: "RnB",
    mood: "Velvet",
    durationSec: 182,
    bpm: 98,
    streams: 45000,
    likes: 3200,
    uploadedAt: "2026-03-31T02:48:00.000Z",
    sourceFileName: "Nani Ojz 2.17.23.mp3",
    previewUrl: "/uploads/track_ew2zn0n4-nani-ojz-2-17-23.mp3",
    provider: "seed"
  })
];

const artistsStore = [...seedArtists];
const tracksStore = [...seedTracks];

recountArtists();

export function getHomeSnapshot(): HomeSnapshot {
  const artists = artistsStore
    .slice()
    .sort((left, right) => right.monthlyListeners - left.monthlyListeners)
    .map(cloneArtist);
  const tracks = tracksStore
    .slice()
    .sort((left, right) => Date.parse(right.uploadedAt) - Date.parse(left.uploadedAt))
    .map(cloneTrack);

  return {
    artists,
    tracks,
    totalArtists: artists.length,
    totalTracks: tracks.length,
    totalStreams: tracks.reduce((sum, track) => sum + track.streams, 0),
    weeklyGrowthPercent: 18.4
  };
}

export function getAdminSnapshot(): AdminSnapshot {
  const snapshot = getHomeSnapshot();
  return {
    ...snapshot,
    avgTracksPerArtist: snapshot.totalArtists === 0 ? 0 : Number((snapshot.totalTracks / snapshot.totalArtists).toFixed(1))
  };
}

export function getTrackById(trackId: string): TrackRecord | undefined {
  return tracksStore.find((track) => track.id === trackId);
}

export function createTrackId(): string {
  return `track_${createId()}`;
}

export function addUploadedTrack(input: UploadTrackInput): IngestResult {
  const { artist, artistCreated } = findOrCreateArtist(input.artistName);
  const track = createTrack({
    id: input.trackId,
    artist,
    title: input.title,
    genre: artist.genre,
    mood: pickCyclic(moods, tracksStore.length),
    durationSec: randomBetween(132, 218),
    bpm: randomBetween(92, 148),
    streams: randomBetween(900, 7200),
    likes: randomBetween(60, 980),
    uploadedAt: new Date().toISOString(),
    sourceFileName: input.fileName,
    previewUrl: input.previewUrl,
    provider: "upload",
    storage: input.storage
  });

  tracksStore.unshift(track);
  recountArtists();

  return {
    artistCreated,
    artist: cloneArtist(artist),
    track: cloneTrack(track)
  };
}

export function addGeneratedTrack(input: GeneratedTrackInput): IngestResult {
  const { artist, artistCreated } = findOrCreateArtist(input.artistName);
  const track = createTrack({
    id: createTrackId(),
    artist,
    title: input.title,
    genre: artist.genre,
    mood: pickCyclic(moods, tracksStore.length),
    durationSec: randomBetween(138, 210),
    bpm: randomBetween(90, 146),
    streams: randomBetween(1200, 8600),
    likes: randomBetween(140, 1400),
    uploadedAt: new Date().toISOString(),
    sourceFileName: `${slugify(input.title) || "generated-track"}.mp3`,
    previewUrl: input.previewUrl,
    provider: input.provider,
    prompt: input.prompt,
    storage: input.storage
  });

  tracksStore.unshift(track);
  recountArtists();

  return {
    artistCreated,
    artist: cloneArtist(artist),
    track: cloneTrack(track)
  };
}

function findOrCreateArtist(name: string): { artist: ArtistRecord; artistCreated: boolean } {
  const normalizedArtistName = normalizeArtistName(name);
  const existingArtist = artistsStore.find((artist) => normalizeArtistName(artist.name) === normalizedArtistName);

  if (existingArtist) {
    return { artist: existingArtist, artistCreated: false };
  }

  const artist = createArtist({
    id: `artist_${createId()}`,
    name,
    genre: pickCyclic(genres, artistsStore.length),
    bio: "Freshly onboarded through PR3CIO's AI-powered catalog ingestion workflow.",
    city: "Remote Studio",
    accent: pickCyclic(accentPalette, artistsStore.length),
    monthlyListeners: randomBetween(1200, 5200),
    totalStreams: randomBetween(8000, 42000),
    joinedAt: new Date().toISOString()
  });

  artistsStore.unshift(artist);
  return { artist, artistCreated: true };
}

function recountArtists() {
  for (const artist of artistsStore) {
    const artistTracks = tracksStore.filter((track) => track.artistId === artist.id);
    artist.trackCount = artistTracks.length;
    artist.totalStreams = artistTracks.reduce((sum, track) => sum + track.streams, 0);
    artist.monthlyListeners = Math.max(artist.monthlyListeners, Math.round(artist.totalStreams * 0.12));
  }
}

function createArtist(input: {
  id: string;
  name: string;
  genre: string;
  bio: string;
  city: string;
  accent: string;
  monthlyListeners: number;
  totalStreams: number;
  joinedAt: string;
}): ArtistRecord {
  return {
    id: input.id,
    slug: slugify(input.name),
    name: input.name,
    genre: input.genre,
    bio: input.bio,
    city: input.city,
    accent: input.accent,
    avatarUrl: createAvatarDataUri(input.name, input.accent),
    monthlyListeners: input.monthlyListeners,
    totalStreams: input.totalStreams,
    trackCount: 0,
    joinedAt: input.joinedAt
  };
}

function createTrack(input: {
  id: string;
  artist: ArtistRecord;
  title: string;
  genre: string;
  mood: string;
  durationSec: number;
  bpm: number;
  streams: number;
  likes: number;
  uploadedAt: string;
  sourceFileName: string;
  previewUrl: string;
  provider: TrackRecord["provider"];
  prompt?: string;
  storage?: StoredFileRef;
}): TrackRecord {
  return {
    id: input.id,
    slug: slugify(`${input.artist.name}-${input.title}`),
    artistId: input.artist.id,
    artistName: input.artist.name,
    title: input.title,
    genre: input.genre,
    mood: input.mood,
    durationSec: input.durationSec,
    bpm: input.bpm,
    coverUrl: createCoverDataUri(input.title, input.artist.name, input.artist.accent),
    previewUrl: input.previewUrl,
    streams: input.streams,
    likes: input.likes,
    uploadedAt: input.uploadedAt,
    sourceFileName: input.sourceFileName,
    provider: input.provider,
    ...(input.prompt ? { prompt: input.prompt } : {}),
    ...(input.storage ? { storage: input.storage } : {})
  };
}

function cloneArtist(artist: ArtistRecord): ArtistRecord {
  return { ...artist };
}

function cloneTrack(track: TrackRecord): TrackRecord {
  return {
    ...track,
    ...(track.storage ? { storage: { ...track.storage } } : {})
  };
}

function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function normalizeArtistName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickCyclic<T>(items: readonly T[], index: number): T {
  return items[index % items.length] as T;
}

function createAvatarDataUri(name: string, accent: string): string {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" rx="44" fill="#09111F"/>
      <circle cx="112" cy="36" r="26" fill="${accent}" fill-opacity="0.9"/>
      <circle cx="42" cy="124" r="34" fill="${accent}" fill-opacity="0.22"/>
      <text x="80" y="92" text-anchor="middle" fill="white" font-size="42" font-family="Arial, sans-serif" font-weight="700">${initials}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createCoverDataUri(title: string, artist: string, accent: string): string {
  const svg = `
    <svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="1200" rx="92" fill="#050913"/>
      <circle cx="250" cy="220" r="210" fill="${accent}" fill-opacity="0.35"/>
      <circle cx="920" cy="940" r="260" fill="${accent}" fill-opacity="0.18"/>
      <path d="M140 880C280 640 410 720 530 620C640 528 760 338 1060 420" stroke="${accent}" stroke-opacity="0.78" stroke-width="12" stroke-linecap="round"/>
      <path d="M128 960C276 730 408 820 542 702C662 596 800 420 1060 492" stroke="white" stroke-opacity="0.18" stroke-width="5" stroke-linecap="round"/>
      <text x="120" y="190" fill="white" font-size="54" font-family="Arial, sans-serif" font-weight="700">${escapeSvg(title)}</text>
      <text x="120" y="250" fill="white" fill-opacity="0.62" font-size="30" font-family="Arial, sans-serif">${escapeSvg(artist)}</text>
      <text x="120" y="1090" fill="white" fill-opacity="0.4" font-size="22" font-family="Arial, sans-serif">PR3CIO OG TRACK</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeSvg(value: string): string {
  return value.replace(/[&<>"]/g, (char) => {
    if (char === "&") return "&amp;";
    if (char === "<") return "&lt;";
    if (char === ">") return "&gt;";
    return "&quot;";
  });
}
