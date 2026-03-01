import { FeaturePage } from "../../components/feature-page";
import { whatYouCanDo } from "../../lib/pr3cio-content";

export default function Page() {
  const content = whatYouCanDo.find(c => c.slug === "create-with-ai")!;
  return (
    <FeaturePage 
      title={content.title} 
      description={content.description}
      image="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200"
    />
  );
}
