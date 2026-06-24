# CLAUDE.md

Guidance for AI agents (and humans) working in this repo.

## Project

**acm-asteria** — Team Hague's submission for FEU Tech's "Journey to Asteria" Techsprint.
Next.js (App Router) + TypeScript app with a unified AI layer (Gemini / Ollama) and Supabase
(DB + Auth) backend.

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript (strict)
- **AI**: Vercel AI SDK (`ai`) with a provider switch — `@ai-sdk/google` (Gemini) and
  `ollama-ai-provider` (Ollama, local testing). Tool-calling on both.
- **Backend**: Supabase via `@supabase/ssr` (cookie-based auth), local CLI stack
- **Validation**: Zod

## Directory map

```
src/
  app/                  App Router. layout.tsx, page.tsx (chat), api/chat/route.ts
  components/
    devtools/           Dev-only floating PageNavigator (grid-snap page traverser)
  lib/
    ai/provider.ts      getModel() — switches Gemini/Ollama via AI_PROVIDER
    ai/tools.ts         Tool registry (add tools here)
    supabase/           client.ts (browser), server.ts, middleware.ts
    devtools/routes.ts  Route list shown in the dev navigator
    env.ts              Validated env access — import from here, not process.env
  types/database.types.ts  Generated Supabase types (npm run db:types)
public/                 Served static assets
assets/                 Source/design assets (not served)
supabase/               config.toml, migrations/, seed.sql
middleware.ts           Refreshes Supabase auth session
```

## Run

```bash
npm install
cp .env.example .env.local        # fill in keys

# Local Supabase (Docker required)
npm run db:start                  # supabase start
npm run db:reset                  # apply migrations + seed
npm run db:types                  # regenerate src/types/database.types.ts

# Local AI (offline)
ollama pull llama3.2              # set AI_PROVIDER=ollama

npm run dev                       # http://localhost:3000
```

## AI provider switch

`AI_PROVIDER=gemini|ollama` selects the backend. All call sites use `getModel()` from
`src/lib/ai/provider.ts` — never instantiate a provider directly elsewhere.

## Adding a tool

Define in `src/lib/ai/tools.ts` with `tool({ description, parameters: z.object(...), execute })`
and add to the exported `tools` registry. The model decides when to call it. Use Ollama models
that support function calling (llama3.1+).

## Dev page navigator

`src/components/devtools/PageNavigator.tsx` — floating, draggable menu that grid-snaps (24px) and
quick-jumps between pages. Dev-only (gated in `DevTools.tsx`). Toggle: **⌘/Ctrl + `**. Add pages to
`src/lib/devtools/routes.ts`.

## Conventions

- Import env through `@/lib/env`, not `process.env` directly.
- Server Supabase client in Server Components / Route Handlers / Actions; browser client in
  client components.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only — never expose to the browser.
- Path alias `@/*` → `src/*`.
- Run `npm run typecheck` and `npm run lint` before committing.
