"use client";

import { useEffect } from "react";

import { insforge } from "@/lib/insforge-client";
import { identifyPostHogUser } from "@/lib/posthog-client";

export function PostHogIdentify() {
  useEffect(() => {
    let isMounted = true;

    async function identifyCurrentUser(): Promise<void> {
      try {
        const {
          data: { user },
          error,
        } = await insforge.auth.getCurrentUser();

        if (error) {
          console.error("[PostHogIdentify] Auth error:", error);
          return;
        }

        if (isMounted && user) {
          identifyPostHogUser(user.id);
        }
      } catch (err) {
        console.error("[PostHogIdentify] Unexpected error:", err);
      }
    }

    void identifyCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}
