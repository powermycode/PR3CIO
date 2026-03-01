import { FeaturePage } from "../../components/feature-page";
import { whatYouCanDo } from "../../lib/pr3cio-content";

export default function Page() {
  const content = whatYouCanDo.find(c => c.slug === "showcase")!;
  return (
    <FeaturePage 
      title={content.title} 
      description={content.description}
      image="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200"
    />
  );
}
