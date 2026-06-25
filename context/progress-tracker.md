# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 04 Database Schema
**Next:** 05 Profile Page — Full UI

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- 2026-06-24 — Built the homepage as static Server Components with local assets from `public/`, matching `context/designs/landing-page.png`.
- 2026-06-24 — Added token-based `landing-soft-gradient` and `landing-divider-pattern` utilities in `app/globals.css` so the landing design can use gradients/patterns without hardcoded component colors.
- 2026-06-24 — Root layout now imports Inter through `next/font/google` and applies the `--font-sans` variable on the `<html>` element.
- 2026-06-24 — Implemented InsForge OAuth with `@insforge/sdk` SSR helpers: server actions initiate Google/GitHub OAuth, `/api/auth/callback` exchanges the code, `/api/auth/refresh` refreshes sessions, and root `proxy.ts` protects dashboard/profile/find-jobs routes.
- 2026-06-24 — Homepage primary CTAs now route authenticated users to `/dashboard` and unauthenticated users to `/login`.
- 2026-06-24 — Added a minimal protected `/dashboard` destination so successful OAuth redirects do not land on a 404 before the full dashboard feature is built.
- 2026-06-24 — Addressed auth review findings: InsForge config validation now rejects malformed URLs, OAuth init/callback errors are logged server-side, and proxy redirects preserve auth cookie updates from session refresh/cleanup.
- 2026-06-24 — Initialized PostHog with browser and server clients. Root layout now wraps app content in the PostHog provider, tracks manual pageviews, identifies the current InsForge user on the client, resets PostHog before sign-out, and exposes typed helpers for the four approved PostHog events.
- 2026-06-24 — Added the Feature 04 SQL migration at `migrations/20260624_feature_04_database_schema.sql`, created the `profiles`, `agent_runs`, `jobs`, and `agent_logs` tables in InsForge with RLS/check constraints/indexes, and created the private `resumes` storage bucket with per-user storage policies on `storage.objects`.
- 2026-06-24 — Fixed schema foreign key issue: added `handle_new_auth_user()` trigger on `auth.users` to auto-create profile rows on first sign-up, ensuring `agent_runs`, `jobs`, and `agent_logs` inserts never fail due to missing profile foreign key.

---

## Notes

- Homepage verification: `npm run lint` passed, `npm run build` passed after rerunning with network access for `next/font/google` to fetch Inter.
- Local dev server already running at `http://localhost:3000`. Attempted screenshot capture was blocked because Puppeteer's bundled Chrome is missing the system library `libnspr4.so`; verified the running page responds with the expected homepage content instead.
- Auth verification: `npm run lint` passed and `npm run build` passed. Local probes: `/login` returns 200 and unauthenticated `/dashboard` redirects to `/login`. OAuth live sign-in still requires InsForge environment variables and provider configuration.
- PostHog verification: `npm run lint` passed and `npm run build` passed after rerunning with network access for `next/font/google` to fetch Inter. Dashboard placeholder includes a Sign out button that calls `resetPostHog()` before the server sign-out action redirects to `/login`.
- Database schema verification: InsForge MCP confirmed all four tables, constraints, indexes, RLS policies, the `profiles.updated_at` trigger, `storage.objects` resume policies, and a private `resumes` bucket. Later: added `handle_new_auth_user()` trigger on `auth.users` to auto-create profiles, guaranteeing profile existence before child table inserts.
