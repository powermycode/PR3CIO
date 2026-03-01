export interface ContentCard {
  readonly title: string;
  readonly description: string;
  readonly slug: string;
}

export interface FooterLink {
  readonly href: string;
  readonly label: string;
}

export const pr3cioTagline = "PR3CIO — Powered by Creativity. Fueled by Community. Driven by Music.";

export const pr3cioSubtitle = "People Reimagining Communication Collaboration Creativity Input Output";

export const whatYouCanDo: readonly ContentCard[] = [
  {
    title: "Create Music With AI & Your Own Style",
    slug: "create-with-ai",
    description:
      "Unleash next-level creativity with built-in AI tools that help you generate lyrics, compose melodies, and craft full arrangements — even if you don't have expensive studio gear or years of training. Collaborate with AI to produce polished tracks that feel unmistakably you."
  },
  {
    title: "Showcase Your Work to Fans & Industry",
    slug: "showcase",
    description:
      "Your sound deserves to be heard. PR3CIO gives you a real stage — not just a profile. Upload tracks, build your audience, and let fans stream your music, follow your journey, and share your art worldwide."
  },
  {
    title: "Earn Every Time Your Music Is Played",
    slug: "earn",
    description:
      "Artists on PR3CIO get more than exposure — they get fair revenue for streams, downloads, and feature placements. This is music with measurable growth — for you. Clear monetization model your target audience understands."
  }
];

export const whyArtistsChoose: readonly ContentCard[] = [
  {
    title: "AI-Assisted Creation",
    slug: "ai-assisted",
    description: "Not just tools — creative partners that help you turn ideas into finished songs."
  },
  {
    title: "Artist-First Growth",
    slug: "growth",
    description: "Release tracks, build fanbases, and get noticed — without middlemen."
  },
  {
    title: "Collaborative Community",
    slug: "community",
    description: "Connect with producers, singers, mixers, and creators who level up your sound."
  },
  {
    title: "Real Rewards",
    slug: "rewards",
    description: "You make the music. You own the art. You get paid — every stream, every time."
  }
];

export const pr3cioFooterLinks: readonly FooterLink[] = [
  { href: "/get-started", label: "Sign Up Free" },
  { href: "/contact-us", label: "Contact Support" },
  { href: "/about-us", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" }
];
