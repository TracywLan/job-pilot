"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createAuthActions } from "@insforge/sdk/ssr";

import { hasInsforgeConfig } from "@/lib/insforge-config";

type OAuthProvider = "google" | "github";

const CODE_VERIFIER_COOKIE = "insforge_code_verifier";

async function getRedirectUrl(): Promise<string> {
  const requestHeaders = await headers();
  const origin =
    requestHeaders.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  return new URL("/api/auth/callback", origin).toString();
}

async function signInWithProvider(provider: OAuthProvider): Promise<never> {
  if (!hasInsforgeConfig()) {
    console.error("[actions/auth]", "InsForge configuration is missing or invalid");
    redirect("/login?error=config");
  }

  const cookieStore = await cookies();
  const auth = createAuthActions({ cookies: cookieStore });
  const redirectTo = await getRedirectUrl();
  const { data, error } = await auth
    .signInWithOAuth(provider, {
      redirectTo,
      skipBrowserRedirect: true,
      additionalParams:
        provider === "google" ? { prompt: "select_account" } : undefined,
    })
    .catch((error: unknown) => {
      console.error("[actions/auth]", error);
      return { data: null, error };
    });

  if (error || !data?.url || !data.codeVerifier) {
    console.error("[actions/auth]", error ?? "OAuth init returned incomplete data");
    redirect("/login?error=oauth");
  }

  cookieStore.set(CODE_VERIFIER_COOKIE, data.codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  redirect(data.url);
}

export async function signInWithGoogle(): Promise<never> {
  return signInWithProvider("google");
}

export async function signInWithGithub(): Promise<never> {
  return signInWithProvider("github");
}

export async function signOut(): Promise<never> {
  const cookieStore = await cookies();
  const auth = createAuthActions({ cookies: cookieStore });
  const { error } = await auth.signOut().catch((error: unknown) => {
    console.error("[actions/auth]", error);
    return { error };
  });

  if (error) {
    console.error("[actions/auth]", error);
  }

  redirect("/login");
}
