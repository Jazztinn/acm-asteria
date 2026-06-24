import { tool } from "ai";
import { z } from "zod";

/**
 * Tool registry passed to streamText/generateText.
 *
 * Add a tool: define with `tool({ description, parameters, execute })`,
 * then add it to the exported `tools` object. The model decides when to
 * call them. Works identically across Gemini and Ollama (models that
 * support function calling — e.g. llama3.1+).
 */

const getCurrentTime = tool({
  description: "Get the current server date and time in ISO 8601 format.",
  parameters: z.object({
    timezone: z
      .string()
      .optional()
      .describe("IANA timezone, e.g. 'Asia/Manila'. Defaults to server timezone."),
  }),
  execute: async ({ timezone }) => {
    const now = new Date();
    return {
      iso: now.toISOString(),
      formatted: timezone
        ? now.toLocaleString("en-US", { timeZone: timezone })
        : now.toLocaleString(),
    };
  },
});

const echo = tool({
  description: "Echo a message back. Useful for testing tool-calling end-to-end.",
  parameters: z.object({
    message: z.string().describe("Text to echo back."),
  }),
  execute: async ({ message }) => ({ echoed: message }),
});

export const tools = {
  getCurrentTime,
  echo,
};
