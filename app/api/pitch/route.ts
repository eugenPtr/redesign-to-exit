import { callPitchGenerator } from "@/lib/llm-client";
import { buildPitchPrompt, type PriorStepContext } from "@/lib/prompts";

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

  try {
    const raw = await callPitchGenerator(prompt);
    return new Response(raw, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "LLM call failed" },
      { status: 500 },
    );
  }
}
