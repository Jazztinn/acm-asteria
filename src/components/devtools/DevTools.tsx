import { PageNavigator } from "./PageNavigator";

/**
 * Mounts dev tooling (the floating page navigator).
 *
 * Shown everywhere by default — including the Vercel deployment — so the
 * navigator is usable in the live demo.
 *
 * EASY OFF-SWITCH (pick one):
 *   1. Set NEXT_PUBLIC_SHOW_DEVTOOLS=false in the env (Vercel → Settings →
 *      Environment Variables), then redeploy. No code change.
 *   2. Or delete the <DevTools /> line in src/app/layout.tsx.
 */
export function DevTools() {
  if (process.env.NEXT_PUBLIC_SHOW_DEVTOOLS === "false") return null;
  return <PageNavigator />;
}
