export type StepState = {
  answers: Record<string, string>;
  designMove: string;
  howToDoIt: string[];
  completedAt: string;
};

export type PitchDeckJSON = {
  cover: {
    companyName: string;
    valueProposition: string;
    targetAudience: string;
    founderName: string;
  };
  problem: {
    headline: string;
    clarifyingParagraph: string;
    facts: Array<{ headline: string; data: string }>;
  };
  opportunityGap: { marketGap: string; supportingParagraph: string };
  opportunitySize: { tam: string; sam: string; som: string };
  solution: { description: string; points: string[] };
  operatingModel: { columns: Array<{ headline: string; paragraph: string }> };
  valueCreation: { headline: string; paragraph: string };
  businessModel: { revenueStreams: string; tractionEvidence: string };
  milestones: Array<{ year: string; objective: string }>;
  goToMarket: { columns: Array<{ headline: string; points: string[] }> };
  competitiveAdvantage: { headline: string; description: string };
  team: { members: Array<{ name: string; role: string; description: string }> };
  impact: { points: string[]; vision: string };
  ask: { amount: string; useOfFunds: string; paragraph: string };
  thankYou: { message: string; contactName: string };
};

export type AppState = {
  steps: Record<number, StepState>;
  pitchDeck: PitchDeckJSON | null;
};

const STORAGE_KEY = "gia-design-to-exit-state";

const EMPTY_STATE: AppState = { steps: {}, pitchDeck: null };

function read(): AppState {
  if (typeof window === "undefined") return { ...EMPTY_STATE };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_STATE };
    const parsed = JSON.parse(raw) as AppState;
    return {
      steps: parsed.steps ?? {},
      pitchDeck: parsed.pitchDeck ?? null,
    };
  } catch {
    return { ...EMPTY_STATE };
  }
}

function write(next: AppState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getState(): AppState {
  return read();
}

export function saveStepState(
  stepNum: number,
  payload: Omit<StepState, "completedAt">,
): void {
  const current = read();
  current.steps[stepNum] = {
    ...payload,
    completedAt: new Date().toISOString(),
  };
  write(current);
}

export function savePitchDeck(json: PitchDeckJSON): void {
  const current = read();
  current.pitchDeck = json;
  write(current);
}

export function resetState(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
