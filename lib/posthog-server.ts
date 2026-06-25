import { PostHog } from "posthog-node";

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

export type ServerPostHogEvent =
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

export function createPostHogServer(): PostHog | null {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!posthogKey || !posthogHost) {
    console.warn("[posthog-server]", "PostHog configuration is missing");
    return null;
  }

  return new PostHog(posthogKey, {
    host: posthogHost,
    flushAt: 1,
    flushInterval: 0,
  });
}

export async function captureServerPostHogEvent({
  event,
  properties,
}: ServerPostHogEvent): Promise<void> {
  const posthog = createPostHogServer();

  if (!posthog) {
    return;
  }

  try {
    posthog.capture({
      distinctId: properties.userId,
      event,
      properties,
    });
  } finally {
    await Promise.resolve(posthog.shutdown());
  }
}
