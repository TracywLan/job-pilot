import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { signInWithGithub, signInWithGoogle } from "@/actions/auth";
import { hasInsforgeConfig } from "@/lib/insforge-config";
import { createInsforgeServer } from "@/lib/insforge-server";

type LoginPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getErrorMessage(error: string | string[] | undefined): string | null {
  if (!error) {
    return null;
  }

  if (error === "config") {
    return "Sign in is not configured yet.";
  }

  return "We could not complete sign in. Please try again.";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const isConfigured = hasInsforgeConfig();

  if (isConfigured) {
    const insforge = await createInsforgeServer();
    const {
      data: { user },
      error,
    } = await insforge.auth.getCurrentUser();

    if (error) {
      console.error("[login]", error);
    }

    if (user) {
      redirect("/dashboard");
    }
  }

  const query = await searchParams;
  const errorMessage = getErrorMessage(query.error);

  return (
    <main className="mx-auto min-h-screen max-w-[1440px] overflow-hidden bg-background">
      <section className="landing-soft-gradient min-h-screen px-6 py-10 sm:px-10">
        <Link href="/" aria-label="JobPilot home" className="inline-flex">
          <Image src="/logo.png" alt="JobPilot" width={118} height={40} priority />
        </Link>

        <div className="mx-auto flex min-h-[calc(100vh-104px)] w-full max-w-[500px] flex-col justify-center py-12">
          <div className="text-center">
            <p className="text-xs font-medium uppercase leading-4 text-accent">
              Welcome back
            </p>
            <h1 className="mt-3 text-[34px] font-bold leading-[40px] text-text-slate sm:text-[42px] sm:leading-[50px]">
              Welcome to JobPilot
            </h1>
            <p className="mx-auto mt-3 max-w-[360px] text-sm font-medium leading-5 text-text-secondary">
              Find stronger job matches with your AI-powered search assistant.
            </p>
          </div>

          <div className="mt-8">
            {errorMessage ? (
              <p className="mb-5 rounded-md border border-border bg-surface px-3 py-2 text-center text-sm font-medium leading-5 text-error shadow-sm">
                {errorMessage}
              </p>
            ) : null}

            <div className="grid gap-3">
              <form action={signInWithGoogle}>
                <button
                  type="submit"
                  disabled={!isConfigured}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 text-sm font-semibold leading-5 text-text-primary shadow-sm hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaGoogle className="size-5 text-info-medium" aria-hidden="true" />
                  <span>Continue with Google</span>
                </button>
              </form>

              <div className="my-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm font-medium leading-5 text-text-muted">
                  or
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form action={signInWithGithub}>
                <button
                  type="submit"
                  disabled={!isConfigured}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-md bg-overlay px-4 text-sm font-semibold leading-5 text-accent-foreground shadow-sm hover:bg-overlay-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaGithub className="size-5" aria-hidden="true" />
                  <span>Continue with GitHub</span>
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm font-medium leading-5 text-text-secondary">
              New here? Your account is created automatically after sign in.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
