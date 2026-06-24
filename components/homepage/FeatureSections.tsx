import Image from "next/image";

import { FeatureTextBlock } from "@/components/homepage/FeatureTextBlock";
import { PatternDivider } from "@/components/homepage/PatternDivider";

const searchFeatures = [
  {
    title: "Find jobs that actually fit",
    description:
      "Search by title and location or paste a job link. Get matched roles you can quickly scan.",
    accent: true,
  },
  {
    title: "Know the Company Before You Apply",
    description:
      "Stop guessing what a company is about. JobPilot browses their site and gives you everything you need to apply with confidence.",
    accent: false,
  },
  {
    title: "Keep track of every application",
    description:
      "Keep a clear view of every job you've found, tailored. Your activity and progress all stay in one simple place.",
    accent: false,
  },
];

const applicationFeatures = [
  {
    title: "Understand your match score",
    description:
      "See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what's missing.",
  },
  {
    title: "AI-Powered Job Matching",
    description:
      "Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter.",
    accent: true,
  },
  {
    title: "Focus on the right roles",
    description:
      "Filter out low fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying.",
  },
];

export function FeatureSections() {
  return (
    <section className="px-10">
      <div className="mx-auto max-w-[1280px] overflow-hidden border-x border-border bg-surface">
        <div className="grid min-h-[690px] grid-cols-1 lg:grid-cols-2">
          <div className="border-b border-border lg:border-b-0 lg:border-r">
            <div className="flex min-h-[220px] items-end border-b border-border p-16">
              <h2 className="max-w-[430px] text-[34px] font-bold leading-[40px] text-text-slate sm:text-[42px] sm:leading-[48px]">
                Manage Your Job Search With Ease
              </h2>
            </div>
            <div>
              {searchFeatures.map((feature) => (
                <FeatureTextBlock key={feature.title} {...feature} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center bg-surface-muted p-16">
            <Image
              src="/images/jobs-lists.png"
              alt="Matched jobs list"
              width={2364}
              height={1778}
              className="h-auto w-full max-w-[580px]"
            />
          </div>
        </div>

        <PatternDivider />

        <div className="grid min-h-[690px] grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center bg-surface-muted p-12">
            <Image
              src="/images/agnet-log.png"
              alt="JobPilot agent log"
              width={2144}
              height={1656}
              className="h-auto w-full max-w-[560px]"
            />
          </div>

          <div className="border-t border-border lg:border-l lg:border-t-0">
            <div className="flex min-h-[220px] items-end border-b border-border p-16">
              <h2 className="max-w-[500px] text-[34px] font-bold leading-[40px] text-text-slate sm:text-[42px] sm:leading-[48px]">
                Apply With More Confidence, Every Time
              </h2>
            </div>
            <div>
              {applicationFeatures.map((feature) => (
                <FeatureTextBlock key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>

        <PatternDivider />
      </div>
    </section>
  );
}
