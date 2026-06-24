import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BottomCta } from "@/components/homepage/BottomCta";
import { FeatureSections } from "@/components/homepage/FeatureSections";
import { Hero } from "@/components/homepage/Hero";
import { Testimonial } from "@/components/homepage/Testimonial";
import { hasInsforgeConfig } from "@/lib/insforge-config";
import { createInsforgeServer } from "@/lib/insforge-server";

export default async function HomePage() {
  let ctaHref = "/login";

  if (hasInsforgeConfig()) {
    const insforge = await createInsforgeServer();
    const { data, error } = await insforge.auth.getCurrentUser();

    if (error) {
      console.error("[home]", error);
    }

    ctaHref = data.user ? "/dashboard" : "/login";
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1440px] bg-surface">
      <Navbar ctaHref={ctaHref} />
      <Hero ctaHref={ctaHref} />
      <FeatureSections />
      <Testimonial />
      <BottomCta ctaHref={ctaHref} />
      <Footer />
    </main>
  );
}
