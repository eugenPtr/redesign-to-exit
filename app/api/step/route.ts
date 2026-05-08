import { getSteps, getPrompts } from "@/lib/get-steps";
import { callStepAdvisor } from "@/lib/llm-client";
import {
  buildStepPrompt,
  type PriorStepContext,
} from "@/lib/prompts";

type StepRequestBody = {
  stepNumber: number;
  currentAnswers: Record<string, string>;
  priorContext: PriorStepContext[];
};

export async function POST(request: Request) {
  let body: StepRequestBody;
  try {
    body = (await request.json()) as StepRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { stepNumber, currentAnswers, priorContext } = body;
  if (typeof stepNumber !== "number") {
    return Response.json({ error: "stepNumber required" }, { status: 400 });
  }

  const [steps, prompts] = await Promise.all([getSteps(), getPrompts()]);
  const stepDef = steps.find((s) => s.number === stepNumber);
  if (!stepDef) {
    return Response.json(
      {
        designMove:
          "(stub) Reframe your operator income as a productized engine.",
        howToDoIt: [
          "(stub) Wire framework data in next issue",
          "(stub) Replace this mock once STEPS populated",
        ],
      },
      { status: 200 },
    );
  }

  const prompt = buildStepPrompt(
    {
      stepNumber,
      stepDef,
      userAnswers: currentAnswers ?? {},
    },
    priorContext ?? [],
    prompts,
  );

  try {
    const result = await callStepAdvisor(prompt);
    return Response.json(result);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "LLM call failed" },
      { status: 500 },
    );
  }
}
