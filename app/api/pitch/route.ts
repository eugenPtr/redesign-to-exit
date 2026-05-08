import { callPitchGenerator } from "@/lib/llm-client";
import { buildPitchPrompt, type PriorStepContext } from "@/lib/prompts";
import { PitchDeckSchema } from "@/lib/pitch-schema";

type PitchRequestBody = {
  allSteps: PriorStepContext[];
};

export async function POST(request: Request) {
  let body: PitchRequestBody;
  try {
    body = (await request.json()) as PitchRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const allSteps = Array.isArray(body?.allSteps) ? body.allSteps : [];
  const prompt = buildPitchPrompt(allSteps);

  let raw: string;
  try {
    raw = await callPitchGenerator(prompt);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "LLM call failed" },
      { status: 500 },
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return Response.json({ error: "LLM returned invalid JSON" }, { status: 422 });
  }

  const result = PitchDeckSchema.safeParse(parsed);
  if (!result.success) {
    return Response.json(
      { error: result.error.message },
      { status: 422 },
    );
  }

  return Response.json(result.data);
}
