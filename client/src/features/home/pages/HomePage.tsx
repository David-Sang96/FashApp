import Featured from "../components/Featured";
import { HeroSection } from "../components/HeroSection";
import NewArrivals from "../components/NewArrivals";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col gap-8">
      <HeroSection />
      <NewArrivals />
      <Featured />
    </div>
  );
}
