import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="px-10 py-14">
      <div className="mx-auto max-w-[1280px] overflow-hidden border border-border bg-surface">
        <div className="landing-soft-gradient px-6 pb-16 pt-20 text-center">
          <h1 className="mx-auto max-w-[760px] text-[38px] font-bold leading-[44px] text-text-slate sm:text-[52px] sm:leading-[60px]">
            Job hunting is hard. Your tools shouldn&apos;t be.
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-base font-medium leading-6 text-text-secondary">
            Stop applying blind. JobPilot finds the jobs, researches the
            companies, and gives you everything you need to stand out.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-md bg-overlay px-6 text-sm font-medium leading-5 text-accent-foreground hover:bg-overlay-dark"
            >
              Get Started <span className="ml-2"> &gt;</span>
            </Link>
            <Link
              href="/find-jobs"
              className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-medium leading-5 text-text-primary hover:bg-surface-secondary"
            >
              Find Your First Match
            </Link>
          </div>
        </div>

        <div className="border-t border-border bg-surface-tertiary px-8 py-14">
          <div className="mx-auto max-w-[1130px]">
            <Image
              src="/images/dashboard-demo.png"
              alt="JobPilot dashboard preview"
              width={4788}
              height={2416}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
