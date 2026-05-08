import rawData from "./framework-data.json";

export type SubQuestion = {
  id: string;
  question: string;
  placeholder: string;
  demoAnswer: string;
};

export type Step = {
  number: number;
  title: string;
  description: string;
  subQuestions: SubQuestion[];
  designMoveExample: string;
  howToDoItExample: string[];
  exitImpact: string;
  pitchSlide: string;
};

function isSubQuestion(v: unknown): v is SubQuestion {
  if (typeof v !== "object" || v === null) return false;
  const q = v as Record<string, unknown>;
  return (
    typeof q.id === "string" &&
    typeof q.question === "string" &&
    typeof q.placeholder === "string" &&
    typeof q.demoAnswer === "string"
  );
}

function isStep(v: unknown): v is Step {
  if (typeof v !== "object" || v === null) return false;
  const s = v as Record<string, unknown>;
  return (
    typeof s.number === "number" &&
    typeof s.title === "string" &&
    typeof s.description === "string" &&
    Array.isArray(s.subQuestions) &&
    s.subQuestions.every(isSubQuestion) &&
    typeof s.designMoveExample === "string" &&
    Array.isArray(s.howToDoItExample) &&
    s.howToDoItExample.every((x: unknown) => typeof x === "string") &&
    typeof s.exitImpact === "string" &&
    typeof s.pitchSlide === "string"
  );
}

function loadSteps(): Step[] {
  if (!Array.isArray(rawData)) {
    throw new Error("framework-data.json: expected an array at root");
  }
  const invalid = rawData
    .map((item, i) => (!isStep(item) ? i : null))
    .filter((i) => i !== null);
  if (invalid.length > 0) {
    throw new Error(
      `framework-data.json: invalid step(s) at index: ${invalid.join(", ")}`
    );
  }
  return rawData as Step[];
}

export const STEPS: Step[] = loadSteps();
