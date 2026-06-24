/**
 * Route registry for the dev-only floating page navigator.
 * Add an entry here for every page you want quick-jump access to.
 */
export interface DevRoute {
  label: string;
  path: string;
  group?: string;
}

export const devRoutes: DevRoute[] = [
  { label: "Home / Chat", path: "/", group: "App" },
  { label: "Sign In", path: "/login", group: "Auth" },
  { label: "Profile", path: "/profile", group: "App" },
  { label: "API: Chat", path: "/api/chat", group: "API" },
];
