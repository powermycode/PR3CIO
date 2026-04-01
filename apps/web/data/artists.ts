export interface Artist {
  name: string;
  slug: string;
  genre: string;
  listeners: string;
  country?: string;
  image: string;
  bio?: string;
  verified?: boolean;
  sponsored?: boolean;
  followers?: string;
  tracks?: number;
  featuredTrack?: {
    title: string;
    audioUrl: string;
    cover?: string;
  };
}

export const artists: Artist[] = [
  {
    name: "Rico Milano",
    slug: "rico-milano",
    genre: "Hip Hop",
    listeners: "283K",
    country: "USA",
    image: "/artists/RicoMilanoPr3cio.png",
    bio: "Rico Milano is a rising force in the USA Hip Hop scene, known for his unique blend of lyrical depth and modern production.",
    verified: true,
    sponsored: true,
    featuredTrack: {
      title: "Edo Soul",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
  },
  {
    name: "Artizz",
    slug: "artizz",
    genre: "Hip Hop",
    listeners: "413K",
    country: "USA",
    image: "/artists/ArtizzPr3cio.png",
    bio: "Artizz brings a fresh perspective to Hip Hop with complex flows and storytelling that resonates globally.",
    verified: true,
    sponsored: true,
    featuredTrack: {
      title: "Artizz Flow",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
  },
  {
    name: "L ESJ",
    slug: "lesj",
    genre: "Hip Hop",
    listeners: "269K",
    country: "USA",
    image: "/artists/LesjPr3cio.png",
    bio: "L ESJ is redefining the sound of modern Hip Hop with infectious energy and innovative beats.",
    verified: true,
    sponsored: true,
    featuredTrack: {
      title: "Neno",
      audioUrl: "/uploads/lesj-elite-neno-master.m4a",
    },
  },
  {
    name: "Nani",
    slug: "nani",
    genre: "RnB",
    listeners: "156K",
    country: "USA",
    image: "/artists/nani.jpg",
    bio: "Nani is a rising star with a unique sound that blends classic RnB elements with a modern, melodic twist.",
    verified: true,
    sponsored: false,
    featuredTrack: {
      title: "Ojz",
      audioUrl: "/uploads/track_ew2zn0n4-nani-ojz-2-17-23.mp3",
    },
  },
  {
    name: "Don Julio",
    slug: "don-julio",
    genre: "Hip Hop",
    listeners: "128K",
    country: "USA",
    image: "/artists/don-julio.jpg",
    bio: "Don Julio is a master of rhythm and flow, bringing a unique perspective to the modern hip hop landscape.",
    verified: true,
    sponsored: false,
  },
  {
    name: "Casanova33",
    slug: "casanova33",
    genre: "Hip Hop",
    listeners: "95K",
    country: "USA",
    image: "/artists/casanova33.jpg",
    bio: "Casanova33 blends infectious energy with compelling storytelling, carving out a distinct space in the urban music scene.",
    verified: true,
    sponsored: false,
  },
];
