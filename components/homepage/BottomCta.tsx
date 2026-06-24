import Link from "next/link";

export function BottomCta() {
  return (
    <section className="px-10">
      <div className="landing-divider-pattern mx-auto h-20 max-w-[1280px] border-x border-t border-border bg-surface" />
      <div className="landing-soft-gradient mx-auto max-w-[1280px] border-x border-t border-border px-6 py-24 text-center">
        <h2 className="mx-auto max-w-[760px] text-[36px] font-bold leading-[42px] text-text-slate sm:text-[48px] sm:leading-[56px]">
          Your next job search can feel a lot less overwhelming
        </h2>
        <p className="mx-auto mt-6 max-w-[620px] text-base font-medium leading-6 text-text-secondary">
          Set up your profile, upload your resume, and start finding matches in
          minutes.
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
      <div className="landing-divider-pattern mx-auto h-20 max-w-[1280px] border-x border-t border-border bg-surface" />
    </section>
  );
}
