import { Metadata } from "next";
import LuisClient from "./LuisClient";

export const metadata: Metadata = {
  title: "PR3CIO | AI Music Platform Founded by Luis",
  description: "PR3CIO is an AI powered music creation platform helping independent artists create, release and earn from original music.",
  openGraph: {
    title: "PR3CIO | AI Music Platform Founded by Luis",
    description: "PR3CIO is an AI powered music creation platform helping independent artists create, release and earn from original music.",
    type: "website",
  }
};

export default function Page() {
  return <LuisClient />;
}
