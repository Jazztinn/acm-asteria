# acm-asteria

The official submission of **Team Hague** at FEU Tech's Journey to Asteria Techsprint.

**Live:** https://acm-asteria.vercel.app

Next.js + TypeScript app with Supabase (DB + Auth) and a floating page navigator.
Ships a unified AI layer (Gemini / Ollama) as scaffolding — no chat UI wired right now.
The root path `/` redirects to `/login`.

## Quick start

```bash
# 1. Install deps
npm install

# 2. Configure env
cp .env.example .env.local
#   - Set AI_PROVIDER=ollama (local) or gemini (cloud)
#   - Add GOOGLE_GENERATIVE_AI_API_KEY for Gemini
#   - Add Supabase URL + keys (printed by `supabase start`)

# 3. Local Supabase (needs Docker + Supabase CLI)
#    Install CLI: brew install supabase/tap/supabase   (or use npx supabase)
npm run db:start      # starts local Postgres/Auth/Studio
npm run db:reset      # applies migrations + seed
npm run db:types      # regenerates typed client

# 4. Local AI (offline testing)
ollama pull llama3.2:3b  # https://ollama.com

# 5. Run
npm run dev           # http://localhost:3000
```

## AI provider switch (scaffold)

The AI layer is present but not wired to any UI yet. When you build a feature on it,
flip `AI_PROVIDER` in `.env.local`:

- `ollama` → local Ollama daemon (`OLLAMA_MODEL`, default `llama3.2:3b`)
- `gemini` → Google Generative AI (`GEMINI_MODEL`, default `gemini-2.0-flash`)

Both share one code path via `getModel()` in `src/lib/ai/provider.ts`, with tool-calling
defined in `src/lib/ai/tools.ts`.

## Dev page navigator

A floating, draggable menu (grid-snaps to 24px) for jumping between pages.
Toggle with **⌘/Ctrl + `**. Add routes in `src/lib/devtools/routes.ts`.

Shown in all environments (including the Vercel demo) by default. To hide it: set
`NEXT_PUBLIC_SHOW_DEVTOOLS=false` and redeploy, or delete `<DevTools />` in
`src/app/layout.tsx`.

## Scripts

| Script              | Action                                  |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Start dev server                        |
| `npm run build`     | Production build                        |
| `npm run typecheck` | `tsc --noEmit`                          |
| `npm run lint`      | ESLint                                  |
| `npm run db:start`  | Start local Supabase                    |
| `npm run db:reset`  | Reset DB, apply migrations + seed       |
| `npm run db:types`  | Regenerate `src/types/database.types.ts`|

See `CLAUDE.md` for the full directory map and conventions.

## Deploy (Vercel)

Hosted on Vercel: **https://acm-asteria.vercel.app**

Auto-deploys via the connected GitHub repo — push to `main` ships production,
any other branch / PR ships a preview. Config lives in `vercel.json`
(`nextjs` framework, `sin1` region).

Required env vars (set per scope in Vercel → Settings → Environment Variables):

| Var                              | Value (prod)        |
| -------------------------------- | ------------------- |
| `AI_PROVIDER`                    | `gemini`            |
| `GOOGLE_GENERATIVE_AI_API_KEY`   | _(secret)_          |
| `GEMINI_MODEL`                   | `gemini-2.0-flash`  |
| `NEXT_PUBLIC_SUPABASE_URL`       | hosted project URL  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | publishable key     |

`AI_PROVIDER=ollama` is local-only — Vercel must use `gemini`. Point Supabase
at a hosted project (not `127.0.0.1`) and add the Vercel domain to Supabase
Auth → URL Config.

## Team

**Team Hague** — FEU Tech, Journey to Asteria Techsprint.

## AI assistance disclosure

Parts of this project's scaffolding and boilerplate were generated with AI coding assistants.
All architecture decisions, integration, and feature work are the team's own. Disclosed per
common hackathon transparency guidelines.

## Third-party

Built on open-source dependencies (Next.js, React, Supabase, Vercel AI SDK, Ollama provider) —
all under permissive licenses (MIT/Apache-2.0). No proprietary or restricted code included.

## License

[MIT](./LICENSE) © 2026 Team Hague.

