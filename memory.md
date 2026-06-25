# Memory — Feature 04 Database Schema

Last updated: 2026-06-24 22:27 EDT

## What was built

Completed Feature 04 — Database Schema.

Created and applied the backend infrastructure for JobPilot:

- `migrations/20260624_feature_04_database_schema.sql` — committed SQL migration that creates `profiles`, `agent_runs`, `jobs`, and `agent_logs`, plus the `profiles.updated_at` trigger, indexes, grants, RLS policies, and resume storage policies on `storage.objects`.
- InsForge live backend — applied the migration through MCP and created the private `resumes` storage bucket.
- `context/progress-tracker.md` — marked `04 Database Schema` complete and moved the project to Phase 2 with `05 Profile Page — Full UI` next.
- `context/ui-registry.md` — added a note that Feature 04 introduced no new UI components because it was backend-only.

Previous Feature 03 PostHog initialization work is still present in the worktree, including:

- `app/providers.tsx`, `app/PostHogPageView.tsx`, `app/PostHogIdentify.tsx`
- `lib/posthog-client.ts`, `lib/posthog-server.ts`
- `components/auth/LogoutButton.tsx`
- related wiring in `app/layout.tsx`, `app/dashboard/page.tsx`, and `actions/auth.ts`

## Decisions made

- Established a checked-in SQL migration file as the source of truth for backend schema, then applied the same SQL through InsForge MCP.
- Kept `profiles` lazy-created for now; do not auto-create profile rows during auth.
- Enforced enum-like fields with SQL check constraints instead of loose text.
- Used `profiles.id` as the auth-linked owner key and `user_id` ownership on the other three tables.
- Made the `resumes` bucket private and restricted `storage.objects` access to the `resumes/{user_id}/...` path pattern.
- Included operational schema basics now: UUID defaults, timestamp defaults, indexes, the `profiles.updated_at` trigger, and explicit privilege tightening so `anon` does not retain broad table access.

## Problems solved

- Verified the real InsForge auth/storage shape before writing SQL: `auth.users` exists, `auth.uid()` is available for RLS, and storage access is controlled through `storage.objects`.
- Found that newly created public tables had broader base privileges than desired, then fixed that by revoking access from `anon` and relying on authenticated grants plus RLS.
- Confirmed the storage model by enabling RLS on `storage.objects` and adding bucket-specific policies instead of assuming bucket creation alone enforced per-user access.

## Current state

- Feature 04 is complete both in the repo and in the live InsForge backend.
- InsForge MCP verification confirmed the four tables, constraints, indexes, RLS policies, `profiles.updated_at` trigger, resume storage policies, and the private `resumes` bucket.
- `context/progress-tracker.md` now says Phase 2 is active, last completed `04 Database Schema`, next `05 Profile Page — Full UI`.
- No new UI was built in Feature 04.
- `npm run lint` and `npm run build` were not rerun for Feature 04 because this session only changed SQL and tracking docs.
- The worktree still contains the earlier PostHog feature files and an unrelated `.gitignore` change adding `.env.local`; do not revert unrelated changes unless the user asks.

## Next session starts with

Start Feature 05 — Profile Page UI.

Before implementing:

1. Run `/remember restore`.
2. Read the required context files from `AGENTS.md` in order.
3. Use `/architect` before building because Feature 05 is a substantial UI feature.
4. Build the full `/profile` page with mock data only first, following `context/build-plan.md`, `context/ui-rules.md`, `context/ui-tokens.md`, and `context/ui-registry.md`.
5. After building the UI, update `context/progress-tracker.md` and `context/ui-registry.md`.

## Open questions

- Feature 05 should confirm whether any reusable profile UI primitives already exist before creating new ones.
- Feature 06 will need to decide how completion percentage and missing-field indicators are calculated and whether they are persisted or derived on save.
- Later feature work still needs to fire the typed PostHog helpers at the four approved event points.
