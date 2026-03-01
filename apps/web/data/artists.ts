export interface Artist {
  name: string;
  slug: string;
  genre: string;
  listeners: string;
  country: string;
  image: string;
  bio?: string;
  verified?: boolean;
  sponsored?: boolean;
  featuredTrack?: {
    title: string;
    audioUrl: string;
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
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }
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
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
  },
  {
    name: "Lesj",
    slug: "lesj",
    genre: "Hip Hop",
    listeners: "269K",
    country: "USA",
    image: "/artists/LesjPr3cio.png",
    bio: "Lesj is redefining the sound of modern Hip Hop with infectious energy and innovative beats.",
    verified: true,
    sponsored: true,
    featuredTrack: {
      title: "Lesj Vibe",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    }
  }
];
