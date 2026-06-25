"use client";

import posthog from "posthog-js";

type JobSearchStartedProperties = {
  userId: string;
  jobTitle: string;
  location: string;
};

type JobFoundProperties = {
  userId: string;
  source: string;
  matchScore: number;
};

type ProfileCompletedProperties = {
  userId: string;
};

type CompanyResearchedProperties = {
  userId: string;
  jobId: string;
  company: string;
};

export type PostHogEvent =
  | {
      event: "job_search_started";
      properties: JobSearchStartedProperties;
    }
  | {
      event: "job_found";
      properties: JobFoundProperties;
    }
  | {
      event: "profile_completed";
      properties: ProfileCompletedProperties;
    }
  | {
      event: "company_researched";
      properties: CompanyResearchedProperties;
    };

let isPostHogInitialized = false;

export function initPostHog(): typeof posthog {
  if (typeof window === "undefined" || isPostHogInitialized) {
    return posthog;
  }

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!posthogKey || !posthogHost) {
    console.warn("[posthog-client]", "PostHog configuration is missing");
    return posthog;
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: "identified_only",
    capture_pageview: false,
  });
  isPostHogInitialized = true;

  return posthog;
}

export function identifyPostHogUser(userId: string): void {
  initPostHog().identify(userId);
}

export function resetPostHog(): void {
  initPostHog().reset();
}

export function capturePostHogEvent({ event, properties }: PostHogEvent): void {
  initPostHog().capture(event, properties);
}

export { posthog };
