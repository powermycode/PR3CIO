import { FeaturePage } from "../../components/feature-page";
import { whyArtistsChoose } from "../../lib/pr3cio-content";

export default function Page() {
  const content = whyArtistsChoose.find(c => c.slug === "rewards")!;
  return (
    <FeaturePage 
      title={content.title} 
      description={content.description}
    />
  );
}
