import Link from "next/link";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { createInsforgeServer } from "@/lib/insforge-server";

export default async function DashboardPage() {
  const insforge = await createInsforgeServer();
  const {
    data: { user },
    error,
  } = await insforge.auth.getCurrentUser();

  if (error) {
    console.error("[dashboard]", error);
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1440px] bg-background">
      <Navbar ctaHref="/dashboard" />
      <section className="px-10 py-8">
        <div className="mx-auto max-w-[1280px] rounded-xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-xs font-medium uppercase leading-4 text-accent">
            Dashboard
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-8 text-text-primary">
            Welcome to JobPilot
          </h1>
          <p className="mt-2 max-w-[620px] text-sm font-medium leading-5 text-text-secondary">
            Your dashboard is ready. The full analytics and activity view comes
            later in the build plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/profile"
              className="inline-flex h-10 items-center justify-center rounded-md bg-overlay px-5 text-sm font-medium leading-5 text-accent-foreground hover:bg-overlay-dark"
            >
              Set up profile
            </Link>
            <Link
              href="/find-jobs"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-5 text-sm font-medium leading-5 text-text-primary hover:bg-surface-secondary"
            >
              Find jobs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
