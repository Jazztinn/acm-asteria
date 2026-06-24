import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOllama } from "ollama-ai-provider";
import type { LanguageModelV1 } from "ai";
import { env } from "@/lib/env";

/**
 * Unified AI provider switch.
 *
 * One interface, two backends:
 *   - "gemini" → Google Generative AI (cloud, for prod/demo)
 *   - "ollama" → local Ollama daemon (offline testing)
 *
 * Both expose the Vercel AI SDK's standard LanguageModel + tool-calling,
 * so every call site (streamText / generateText) stays identical.
 * Toggle via AI_PROVIDER env var.
 */
export function getModel(): LanguageModelV1 {
  switch (env.ai.provider) {
    case "gemini": {
      const google = createGoogleGenerativeAI({ apiKey: env.ai.gemini.apiKey });
      return google(env.ai.gemini.model);
    }
    case "ollama": {
      const ollama = createOllama({ baseURL: env.ai.ollama.baseUrl });
      return ollama(env.ai.ollama.model);
    }
    default:
      throw new Error(`Unknown AI_PROVIDER: ${env.ai.provider}`);
  }
}
