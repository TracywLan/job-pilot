# Memory — Auth And Login Redesign

Last updated: 2026-06-24 16:37 EDT

## What was built

Completed Feature 02 — Auth.

Created InsForge OAuth auth flow and protected-route foundation:

- `actions/auth.ts` — server actions initiate Google and GitHub OAuth through InsForge SSR auth helpers.
- `app/(auth)/login/page.tsx` — redesigned OAuth login page based on `context/designs/Login-card.webp`, using JobPilot branding, `landing-soft-gradient`, centered welcome copy, Google/GitHub buttons, and `react-icons` provider logos.
- `app/api/auth/callback/route.ts` — OAuth callback exchanges `insforge_code` and redirects to `/dashboard`.
- `app/api/auth/refresh/route.ts` — InsForge refresh route.
- `proxy.ts` — Next.js 16 proxy protects `/dashboard`, `/profile`, `/find-jobs`, and nested find-jobs paths.
- `lib/insforge-client.ts`, `lib/insforge-server.ts`, `lib/insforge-config.ts` — InsForge browser/server clients and config validation.
- `app/dashboard/page.tsx` — minimal protected dashboard placeholder so successful OAuth redirects do not land on 404 before the full dashboard feature.

Updated docs and tracking:

- `context/progress-tracker.md` — marked `02 Auth` complete; next feature is `03 PostHog Initialization`.
- `context/ui-registry.md` — imprinted the redesigned Login Page and Dashboard Placeholder patterns.
- `context/code-standards.md` — added `react-icons` to approved dependencies for OAuth brand icons.
- `package.json` / `package-lock.json` — added `@insforge/sdk` and `react-icons`.

## Decisions made

- Used `@insforge/sdk` SSR helpers, not the older documented `@insforge/ssr` package, because the latest InsForge MCP docs and installed package expose `@insforge/sdk/ssr`.
- Used Next.js 16 root `proxy.ts` instead of deprecated `middleware.ts`, based on installed Next docs.
- OAuth starts on the server and stores the PKCE verifier in an httpOnly cookie; callback exchange also runs server-side so refresh cookies stay server-owned.
- Login remains OAuth-only. The reference login image was used for composition, not copied literally with email/password fields.
- The minimal `/dashboard` route is temporary and should not be confused with Feature 14’s full dashboard UI.
- Provider icons use `react-icons/fa` (`FaGoogle`, `FaGithub`) while colors stay token-based.

## Problems solved

- InsForge auth initially failed because `NEXT_PUBLIC_INSFORGE_URL` was configured with a key-shaped value instead of a URL. `lib/insforge-config.ts` now validates URL shape and rejects malformed/swapped config.
- Successful OAuth initially redirected to a 404 because `/dashboard` did not exist. Added a temporary protected dashboard destination.
- Review found proxy redirects could discard auth cookie refresh/cleanup mutations. `proxy.ts` now copies cookies from the session response to redirect responses.
- Review found callback failures were too opaque. OAuth init and callback exchange errors now log server-side while keeping user-facing messages generic.
- Login redesign briefly had stale JSX and stray `react-icons` imports; cleaned up and verified.

## Current state

- `npm run lint` passes.
- `npm run build` passes.
- Local probes previously confirmed `/login` returns 200 and unauthenticated `/dashboard` redirects to `/login`.
- Progress tracker says Phase 1 Foundation is active, last completed `02 Auth`, next `03 PostHog Initialization`.
- `context/designs/Login-card.webp` is present and was used as the login layout reference.
- Worktree still includes unrelated existing changes to `AGENTS.md` and deleted `CLAUDE.md`; these were not authored as part of auth and should not be reverted without user approval.

## Next session starts with

Start Feature 03 — PostHog Initialization.

Before implementing:

1. Run `/remember restore`.
2. Read the required context files from `AGENTS.md`.
3. Re-read the PostHog section in `context/library-docs.md` and any applicable current docs/skills.
4. Implement only PostHog setup: browser client, server client, root provider/init, identify after login, reset on logout when logout exists or add the correct placeholder plan if logout is not yet built.

## Open questions

- There is no logout UI/route yet, but Feature 03 expects `posthog.reset()` on logout. Decide whether Feature 03 should add a small logout action/button or defer reset wiring until logout exists.
- Confirm whether the temporary dashboard placeholder should stay until Feature 14 or be replaced earlier when dashboard UI work begins.
- OAuth provider setup depends on valid InsForge environment variables and provider configuration; do not persist or expose actual credential values.
