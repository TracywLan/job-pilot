import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BottomCta } from "@/components/homepage/BottomCta";
import { FeatureSections } from "@/components/homepage/FeatureSections";
import { Hero } from "@/components/homepage/Hero";
import { Testimonial } from "@/components/homepage/Testimonial";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-[1440px] bg-surface">
      <Navbar />
      <Hero />
      <FeatureSections />
      <Testimonial />
      <BottomCta />
      <Footer />
    </main>
  );
}
