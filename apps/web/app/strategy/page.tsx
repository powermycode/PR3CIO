import { Metadata } from "next";
import StrategyClient from "./StrategyClient";

export const metadata: Metadata = {
  title: "PR3CIO Global Expansion Strategy | AI Music Platform",
  description: "Explore PR3CIO's artist acquisition strategy and global expansion plan across India, USA, Brazil and Dominican Republic.",
  openGraph: {
    title: "PR3CIO Global Expansion Strategy | AI Music Platform",
    description: "Explore PR3CIO's artist acquisition strategy and global expansion plan across India, USA, Brazil and Dominican Republic.",
    type: "website",
  }
};

export default function Page() {
  return <StrategyClient />;
}
