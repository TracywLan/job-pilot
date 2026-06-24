<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Read Before Anything Else

Read in this exact order before any implementation:

1. context/project-overview.md
2. context/architecture.md
3. context/ui-tokens.md
4. context/ui-rules.md
5. context/ui-registry.md
6. context/code-standards.md
7. context/library-docs.md
8. context/build-plan.md
9. context/progress-tracker.md

## Rules That Never Change

- Never use hardcoded hex values or raw Tailwind color classes
- Update `progress-tracker.md` and `ui-registry.md` after every feature
- Before any third party library — load its installed skill first,
  then read `context/library-docs.md` for project-specific rules
- If the same problem persists after one corrective prompt —
  stop immediately and run /recover

## Available Skills

- `/architect` — before any complex feature. Think before building.
- `/imprint` — after any new UI component. Capture patterns.
- `/review` — before demo or when something feels off.
- `/recover` — when something breaks after one failed correction.
- `/remember save` — when a feature spans multiple sessions.
- `/remember restore` — when returning after a multi-session feature.

## InsForge MCP Instructions

The InsForge MCP server is configured for Codex as `insforge`.

### What InsForge Provides

InsForge is the backend-as-a-service platform for this project:

- Database: PostgreSQL with PostgREST API
- Authentication: email/password plus OAuth providers such as Google and GitHub
- Storage: file upload and download
- AI: OpenRouter key provisioning and model catalog for direct OpenAI-compatible integrations
- Functions: serverless function deployment
- Realtime: WebSocket pub/sub for database and client events

### Documentation Tools

Before writing or editing InsForge integration code, call the InsForge MCP `fetch-docs` or `fetch-sdk-docs` tool for current documentation.

Use `fetch-docs` with `docType`:

- `instructions` - Essential backend setup
- `real-time` - Realtime pub/sub over WebSockets
- `db-sdk` - Database operations with the TypeScript SDK
- `auth-sdk` - TypeScript SDK auth methods for custom auth flows
- `storage-sdk` - File storage operations
- `functions-sdk` - Serverless function invocation
- `ai-integration-sdk` - AI integration with OpenRouter and OpenAI-compatible clients
- `deployment` - Frontend deployment

Use `fetch-sdk-docs` for a specific feature and language:

- Features: `db`, `storage`, `functions`, `auth`, `ai`, `realtime`, `payments`
- Languages: `typescript`, `swift`, `kotlin`, `rest-api`

### SDK vs MCP

Use SDKs for application logic:

- Authentication
- Database CRUD
- Storage operations
- AI integration through OpenRouter or OpenAI-compatible APIs
- Serverless function invocation
- Payments checkout and customer portal session creation

Use MCP tools for infrastructure:

- Project scaffolding with `download-template`
- Backend metadata with `get-backend-metadata`
- Database schema management with `run-raw-sql` and `get-table-schema`
- Storage bucket management with `create-bucket`, `list-buckets`, `delete-bucket`
- Serverless function deployment with `create-function`, `update-function`, `delete-function`
- Frontend deployment with `create-deployment`

### Important Project Overrides

- This existing project uses Tailwind CSS v4 with tokens in `app/globals.css`; do not downgrade or switch to Tailwind 3.4 unless the user explicitly asks.
- This project currently documents `@insforge/ssr` patterns in `context/library-docs.md`; when implementing InsForge code, fetch the latest MCP docs first and reconcile them with the project architecture.
- SDK operations generally return `{ data, error }`; handle the `error` value explicitly.
- Database inserts may require array format depending on the SDK/API surface.
- Serverless functions have one endpoint and do not support nested route paths.
- Storage uploads should store URLs in the database after upload.
- AI integrations should keep provider keys server-side.
