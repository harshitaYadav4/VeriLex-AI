import Hero from "../components/Hero";
import LogoCloud from "../components/LogoCloud";
import Features from "../components/Features";
import FeatureShowcase from "../components/FeatureShowcase";
import Technology from "../components/Technology";
import UseCases from "../components/UseCases";
import Pricing from "../components/Pricing";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoCloud />
      <Features />
      <FeatureShowcase />
      <Technology />
      <UseCases />
      <Pricing />
      <CTASection />
    </main>
  );
}
