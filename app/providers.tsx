"use client";

import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

import { initPostHog, posthog } from "@/lib/posthog-client";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
