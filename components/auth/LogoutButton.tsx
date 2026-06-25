"use client";

import { useTransition } from "react";

import { signOut } from "@/actions/auth";
import { resetPostHog } from "@/lib/posthog-client";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout(): void {
    resetPostHog();
    startTransition(() => {
      void signOut();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-5 text-sm font-medium leading-5 text-text-primary hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-60"
    >
      Sign out
    </button>
  );
}
