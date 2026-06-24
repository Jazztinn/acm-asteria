import { PageNavigator } from "./PageNavigator";

/**
 * Mounts dev-only tooling. Renders nothing in production builds.
 */
export function DevTools() {
  if (process.env.NODE_ENV === "production") return null;
  return <PageNavigator />;
}
