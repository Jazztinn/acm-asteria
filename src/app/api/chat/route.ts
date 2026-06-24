import { streamText, type CoreMessage } from "ai";
import { getModel } from "@/lib/ai/provider";
import { tools } from "@/lib/ai/tools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = streamText({
    model: getModel(),
    tools,
    maxSteps: 5,
    system: "You are a helpful assistant for Team Hague's Asteria hackathon project.",
    messages,
  });

  return result.toDataStreamResponse();
}
