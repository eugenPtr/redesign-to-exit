import Anthropic from "@anthropic-ai/sdk";
import type { PromptMessages } from "./prompts";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 2048;

export type StepAdvisorResult = {
  designMove: string;
  howToDoIt: string[];
};

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  client = new Anthropic({ apiKey });
  return client;
}

function extractText(message: Anthropic.Messages.Message): string {
  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("No text content in LLM response");
  }
  return block.text;
}

function stripJsonFences(text: string): string {
  const trimmed = text.trim();
  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fence ? fence[1].trim() : trimmed;
}

export async function callStepAdvisor(prompt: PromptMessages): Promise<StepAdvisorResult> {
  const message = await getClient().messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: prompt.system,
    messages: [{ role: "user", content: prompt.user }],
  });
  const text = stripJsonFences(extractText(message));
  const parsed = JSON.parse(text) as Partial<StepAdvisorResult>;
  if (typeof parsed.designMove !== "string" || !Array.isArray(parsed.howToDoIt)) {
    throw new Error("Step advisor response did not match expected shape");
  }
  return {
    designMove: parsed.designMove,
    howToDoIt: parsed.howToDoIt.map(String),
  };
}

export async function callPitchGenerator(prompt: string): Promise<string> {
  const message = await getClient().messages.create({
    model: MODEL,
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });
  return stripJsonFences(extractText(message));
}
