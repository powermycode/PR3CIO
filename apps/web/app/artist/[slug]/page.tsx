import { Metadata } from "next";
import { artists } from "../../../data/artists";
import ArtistClient from "./ArtistClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = artists.find(a => a.slug === params.slug);
  const name = artist?.name || "Artist";
  
  return {
    title: `${name} | PR3CIO Independent Artist`,
    description: `Discover ${name} on PR3CIO, a platform for independent artists creating original music using AI powered studio tools.`,
    openGraph: {
      title: `${name} | PR3CIO Independent Artist`,
      description: `Discover ${name} on PR3CIO, a platform for independent artists creating original music using AI powered studio tools.`,
      type: "website",
    }
  };
}

export default function Page() {
  return <ArtistClient />;
}
