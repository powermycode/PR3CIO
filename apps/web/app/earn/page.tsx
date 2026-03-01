import { FeaturePage } from "../../components/feature-page";
import { whatYouCanDo } from "../../lib/pr3cio-content";

export default function Page() {
  const content = whatYouCanDo.find(c => c.slug === "earn")!;
  return (
    <FeaturePage 
      title={content.title} 
      description={content.description}
      image="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200"
    />
  );
}
