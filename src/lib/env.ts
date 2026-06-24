/**
 * Centralized, validated access to environment variables.
 * Import from here instead of reading process.env directly so missing
 * config fails loud and early.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const env = {
  ai: {
    provider: (process.env.AI_PROVIDER ?? "ollama") as "gemini" | "ollama",
    gemini: {
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
    },
    ollama: {
      baseUrl: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/api",
      model: process.env.OLLAMA_MODEL ?? "llama3.2:3b",
    },
  },
  supabase: {
    url: () => required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    anonKey: () =>
      required("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    serviceRoleKey: () =>
      required("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY),
  },
};
