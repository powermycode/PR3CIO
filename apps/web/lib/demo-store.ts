export interface DemoReport {
  id: string;
  reason: string;
  status: "OPEN" | "REVIEWED" | "RESOLVED" | "DISMISSED";
  trackId?: string;
  artistId?: string;
  createdAt: string;
}

export interface DemoTrack {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  genre: string;
  durationSec: number;
  plays: number;
  likes: number;
  audioUrl: string;
  isOG: boolean;
}

export interface DemoArtistProfile {
  id: string;
  stageName: string;
  bio: string;
  genres: string[];
  instagram: string;
  youtube: string;
  tiktok: string;
  monthlyListeners: number;
  streamCount: number;
  ogBadge: boolean;
}

export interface DemoListenerProfile {
  id: string;
  name: string;
  bio: string;
  following: number;
  playlists: number;
  likedSongs: number;
}

export interface DemoComment {
  id: string;
  trackId: string;
  userName: string;
  message: string;
  createdAt: string;
}

export interface DemoAIProject {
  id: string;
  artistId: string;
  mood: string;
  genre: string;
  theme: string;
  customLyrics?: string;
  generatedLyrics: string;
  instrumentalUrl: string;
  provider: "suno" | "mock" | "mock-fallback";
  metadata: Record<string, unknown>;
  status: "QUEUED" | "GENERATING" | "COMPLETED" | "FAILED";
  createdAt: string;
  publishedTrackId?: string;
}

interface DemoState {
  reports: DemoReport[];
  removedTracks: Set<string>;
  bannedArtists: Set<string>;
  totalStreams: number;
  activeArtists: number;
  projectedRevenueMicros: number;
  tracks: DemoTrack[];
  artistProfile: DemoArtistProfile;
  listenerProfile: DemoListenerProfile;
  comments: DemoComment[];
  aiProjects: DemoAIProject[];
}

const globalForDemo = globalThis as typeof globalThis & {
  __pr3cioDemoState?: DemoState;
};

function createDefaultState(): DemoState {
  return {
    reports: [
      {
        id: "rpt_01",
        reason: "Potential copyright concern",
        status: "OPEN",
        trackId: "track-id",
        createdAt: new Date().toISOString()
      },
      {
        id: "rpt_02",
        reason: "Explicit content without tag",
        status: "OPEN",
        artistId: "artist-id",
        createdAt: new Date().toISOString()
      }
    ],
    removedTracks: new Set<string>(),
    bannedArtists: new Set<string>(),
    totalStreams: 128340,
    activeArtists: 742,
    projectedRevenueMicros: 44892000,
    tracks: [
      {
        id: "trk_01",
        title: "Neon Skyline",
        artistId: "artist-id",
        artistName: "PR3CIO Demo Artist",
        genre: "Synth Pop",
        durationSec: 198,
        plays: 21450,
        likes: 3120,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        isOG: true
      },
      {
        id: "trk_02",
        title: "Midnight Circuit",
        artistId: "artist-id",
        artistName: "PR3CIO Demo Artist",
        genre: "Electronic",
        durationSec: 224,
        plays: 18220,
        likes: 2550,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        isOG: true
      },
      {
        id: "trk_03",
        title: "Afterlight",
        artistId: "artist-id",
        artistName: "PR3CIO Demo Artist",
        genre: "R&B",
        durationSec: 205,
        plays: 14120,
        likes: 1910,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        isOG: true
      }
    ],
    artistProfile: {
      id: "artist-id",
      stageName: "PR3CIO Demo Artist",
      bio: "Independent songwriter and producer blending cinematic textures with late-night vocals.",
      genres: ["Synth Pop", "Electronic", "R&B"],
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      tiktok: "https://tiktok.com",
      monthlyListeners: 48920,
      streamCount: 312440,
      ogBadge: true
    },
    listenerProfile: {
      id: "listener-id",
      name: "Avery Rivers",
      bio: "Night-drive playlists, OG discoveries, and weekly artist deep dives.",
      following: 54,
      playlists: 12,
      likedSongs: 187
    },
    comments: [
      {
        id: "cmt_01",
        trackId: "trk_01",
        userName: "Maya",
        message: "Hook is insane. Replay all day.",
        createdAt: new Date().toISOString()
      }
    ],
    aiProjects: []
  };
}

export function getDemoState(): DemoState {
  if (!globalForDemo.__pr3cioDemoState) {
    globalForDemo.__pr3cioDemoState = createDefaultState();
  }

  return globalForDemo.__pr3cioDemoState;
}

export function getDemoDashboard() {
  const state = getDemoState();
  return {
    totalStreams: state.totalStreams,
    activeArtists: state.activeArtists,
    projectedRevenueMicros: state.projectedRevenueMicros
  };
}

export function getHomeSections() {
  const state = getDemoState();
  const visibleTracks = state.tracks.filter((track) => !state.removedTracks.has(track.id));
  return {
    trending: [...visibleTracks].sort((a, b) => b.plays - a.plays).slice(0, 6),
    newReleases: [...visibleTracks].reverse().slice(0, 6),
    recommended: visibleTracks.slice(0, 6)
  };
}

export function likeTrack(trackId: string) {
  const state = getDemoState();
  const track = state.tracks.find((item) => item.id === trackId);
  if (!track) {
    return null;
  }

  track.likes += 1;
  return track;
}

export function addComment(trackId: string, userName: string, message: string): DemoComment {
  const state = getDemoState();
  const comment: DemoComment = {
    id: `cmt_${Date.now()}`,
    trackId,
    userName,
    message,
    createdAt: new Date().toISOString()
  };

  state.comments.unshift(comment);
  return comment;
}

export function getComments(trackId: string): DemoComment[] {
  const state = getDemoState();
  return state.comments.filter((comment) => comment.trackId === trackId).slice(0, 30);
}

export function getArtistProfile(): DemoArtistProfile {
  return getDemoState().artistProfile;
}

export function getListenerProfile(): DemoListenerProfile {
  return getDemoState().listenerProfile;
}

export function markTrackRemoved(trackId: string, reason: string): void {
  const state = getDemoState();
  state.removedTracks.add(trackId);
  state.reports.unshift({
    id: `rpt_track_${Date.now()}`,
    reason: `Track removed: ${reason}`,
    status: "RESOLVED",
    trackId,
    createdAt: new Date().toISOString()
  });
}

export function markArtistBanned(artistId: string, reason: string): void {
  const state = getDemoState();
  state.bannedArtists.add(artistId);
  state.activeArtists = Math.max(0, state.activeArtists - 1);
  state.reports.unshift({
    id: `rpt_artist_${Date.now()}`,
    reason: `Artist banned: ${reason}`,
    status: "RESOLVED",
    artistId,
    createdAt: new Date().toISOString()
  });
}

export function createAiProject(input: Omit<DemoAIProject, "id" | "createdAt" | "publishedTrackId">): DemoAIProject {
  const state = getDemoState();
  const project: DemoAIProject = {
    ...input,
    id: `ai_${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  state.aiProjects.unshift(project);
  return project;
}

export function listAiProjects(artistId: string): DemoAIProject[] {
  const state = getDemoState();
  return state.aiProjects.filter((project) => project.artistId === artistId);
}

export function publishAiProject(projectId: string): DemoTrack | null {
  const state = getDemoState();
  const project = state.aiProjects.find((item) => item.id === projectId);
  if (!project || project.publishedTrackId) {
    return null;
  }

  const track: DemoTrack = {
    id: `trk_ai_${Date.now()}`,
    title: `${project.theme} (AI OG)`,
    artistId: project.artistId,
    artistName: state.artistProfile.stageName,
    genre: project.genre,
    durationSec: 210,
    plays: 0,
    likes: 0,
    audioUrl: project.instrumentalUrl,
    isOG: true
  };

  state.tracks.unshift(track);
  project.publishedTrackId = track.id;
  return track;
}
