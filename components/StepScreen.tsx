"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { STEPS } from "@/lib/framework-data";
import { getState, saveStepState, savePitchDeck } from "@/lib/state";
import { useStepContext } from "@/components/AppShell";
import type { PriorStepContext } from "@/lib/prompts";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

type RightPanel = "placeholder" | "loading" | "output" | "completed";

type Props = {
  stepNumber: number;
};

export default function StepScreen({ stepNumber }: Props) {
  const step = useMemo(() => STEPS[stepNumber - 1], [stepNumber]);
  const { setCurrentStep } = useStepContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [rightPanel, setRightPanel] = useState<RightPanel>("placeholder");
  const [designMove, setDesignMove] = useState("");
  const [howToDoIt, setHowToDoIt] = useState<string[]>([]);
  const designMoveRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = designMoveRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [designMove]);

  useEffect(() => {
    const saved = getState().steps[stepNumber];
    if (saved?.designMove) {
      setAnswers(saved.answers ?? {});
      setDesignMove(saved.designMove);
      setHowToDoIt(saved.howToDoIt ?? []);
      setRightPanel("completed");
    } else if (isDemo && step) {
      const demoAnswers = Object.fromEntries(
        step.subQuestions.map((q) => [q.id, q.demoAnswer]),
      );
      setAnswers(demoAnswers);
      setDesignMove("");
      setHowToDoIt([]);
      setRightPanel("placeholder");
    } else {
      setAnswers(saved?.answers ?? {});
      setDesignMove("");
      setHowToDoIt([]);
      setRightPanel("placeholder");
    }
  }, [stepNumber, isDemo, step]);

  const allAnswered = useMemo(
    () => step?.subQuestions.every((q) => answers[q.id]?.trim()) ?? false,
    [step, answers],
  );

  async function handleSeeRedesign() {
    if (!step || !allAnswered) return;
    setRightPanel("loading");

    const state = getState();
    const priorContext: PriorStepContext[] = STEPS.filter(
      (s) => s.number < stepNumber && state.steps[s.number]?.designMove,
    ).map((s) => ({
      stepNumber: s.number,
      title: s.title,
      answers: state.steps[s.number].answers,
      acceptedDesignMove: state.steps[s.number].designMove,
    }));

    try {
      const res = await fetch("/api/step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepNumber, currentAnswers: answers, priorContext }),
      });
      const data = (await res.json()) as {
        designMove?: string;
        howToDoIt?: string[];
        error?: string;
      };
      if (data.error || !data.designMove || !data.howToDoIt) {
        throw new Error(data.error ?? "Unexpected response");
      }
      setDesignMove(data.designMove);
      setHowToDoIt(data.howToDoIt);
      setRightPanel("output");
    } catch {
      setRightPanel("placeholder");
    }
  }


  function handleNextStep() {
    if (rightPanel === "output") {
      saveStepState(stepNumber, { answers, designMove, howToDoIt });
      window.dispatchEvent(new Event("step-saved"));
    }
    setCurrentStep(stepNumber + 1);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (e.key === "ArrowLeft" && stepNumber > 1) {
        setCurrentStep(stepNumber - 1);
      }
      if (e.key === "ArrowRight" && (rightPanel === "output" || rightPanel === "completed")) {
        handleNextStep();
      }
      if (e.key === "Enter" && allAnswered && rightPanel === "placeholder") {
        handleSeeRedesign();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [stepNumber, rightPanel, allAnswered]);

  if (!step) {
    return <GeneratePitchDeck onBack={() => setCurrentStep(16)} onNavigate={() => router.push("/pitch-deck")} />;
  }

  const stepBadge = String(step.number).padStart(2, "0");

  const isCompleted = rightPanel === "completed";

  const canContinue = rightPanel === "output" || rightPanel === "completed";

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      {/* Two-column content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left column — questions */}
        <div className="flex w-[55%] flex-col gap-6 overflow-y-auto border-r border-zinc-200 p-10">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">
              Step {stepBadge}
            </p>
            <h1 className="text-2xl font-semibold text-brand-headline">{step.title}</h1>
            <p className="text-sm text-brand-text">{step.description}</p>
          </header>

          <div className="space-y-5">
            {step.subQuestions.map((q) => (
              <div key={q.id} className="space-y-1.5">
                <label
                  htmlFor={`${step.number}-${q.id}`}
                  className="block text-sm font-medium text-brand-text"
                >
                  {q.question}
                </label>
                <textarea
                  id={`${step.number}-${q.id}`}
                  value={answers[q.id] ?? ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  placeholder={q.placeholder}
                  rows={3}
                  disabled={isCompleted}
                  className="w-full rounded-md border border-zinc-200 bg-white p-3 text-sm text-brand-text placeholder:text-zinc-400 focus:border-brand-headline focus:outline-none focus:ring-1 focus:ring-brand-headline disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Right column — output panel */}
        <div className="flex w-[45%] flex-col overflow-y-auto p-10">
          {(rightPanel === "placeholder" || rightPanel === "loading") && (
            <div className="flex flex-1 flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleSeeRedesign}
                disabled={!allAnswered || rightPanel === "loading"}
                className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full ${
                  allAnswered
                    ? "btn-breathe bg-brand-headline"
                    : "cursor-not-allowed bg-brand-headline opacity-40"
                }`}
                style={
                  allAnswered
                    ? { boxShadow: "0 8px 0 #150b6b, 0 10px 20px rgba(57,36,217,0.35)" }
                    : { boxShadow: "0 8px 0 rgba(21,11,107,0.3)" }
                }
              >
                {rightPanel === "loading" ? (
                  <svg
                    className="h-10 w-10 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="Loading"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <img
                    src="/rethink.svg"
                    alt="Redesign"
                    className="h-12 w-12 brightness-0 invert"
                  />
                )}
              </button>
            </div>
          )}

          {rightPanel === "output" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">
                  Design Move
                </p>
                <textarea
                  ref={designMoveRef}
                  value={designMove}
                  onChange={(e) => {
                    setDesignMove(e.target.value);
                    const el = e.target;
                    el.style.height = "auto";
                    el.style.height = `${el.scrollHeight}px`;
                  }}
                  className="w-full resize-none overflow-hidden rounded-md border border-zinc-200 bg-white p-3 text-base font-semibold text-brand-headline focus:border-brand-headline focus:outline-none focus:ring-1 focus:ring-brand-headline"
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">
                  How to Do It
                </p>
                <ul className="space-y-2">
                  {howToDoIt.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-brand-text">
                      <span className="shrink-0 font-semibold text-brand-headline">
                        {i + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleSeeRedesign}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-headline transition-all duration-100 active:translate-y-1"
                  style={{ boxShadow: "0 4px 0 #1e12a3" }}
                  aria-label="Regenerate"
                >
                  <img
                    src="/rethink.svg"
                    alt=""
                    className="h-8 w-8 brightness-0 invert"
                  />
                </button>
              </div>
            </div>
          )}

          {rightPanel === "completed" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">
                  Design Move
                </p>
                <p className="rounded-md border border-brand-headline/20 bg-brand-headline/5 p-3 text-base font-semibold text-brand-headline">
                  {designMove}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">
                  How to Do It
                </p>
                <ul className="space-y-2">
                  {howToDoIt.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-brand-text">
                      <span className="shrink-0 font-semibold text-brand-headline">
                        {i + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t border-zinc-200 px-10 py-4">
        <button
          type="button"
          onClick={() => setCurrentStep(stepNumber - 1)}
          disabled={stepNumber <= 1}
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-brand-text hover:border-zinc-300 disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          disabled={!canContinue}
          className="rounded-md bg-brand-headline px-4 py-2 text-sm font-medium text-white disabled:opacity-40 hover:opacity-90"
        >
          Continue →
        </button>
      </div>
    </section>
  );
}

function GeneratePitchDeck({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: () => void;
}) {
  const state = getState();
  const allComplete = STEPS.every((s) => !!state.steps[s.number]?.completedAt);
  const hasPitchDeck = !!state.pitchDeck;

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    hasPitchDeck ? "done" : "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleGenerate() {
    setStatus("loading");
    setErrorMsg("");

    const priorSteps: PriorStepContext[] = STEPS.filter(
      (s) => state.steps[s.number]?.designMove,
    ).map((s) => ({
      stepNumber: s.number,
      title: s.title,
      answers: state.steps[s.number].answers,
      acceptedDesignMove: state.steps[s.number].designMove,
    }));

    try {
      const res = await fetch("/api/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allSteps: priorSteps }),
      });
      const data = (await res.json()) as PitchDeckJSON & { error?: string };
      if (!res.ok || data.error) {
        throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      savePitchDeck(data);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-12">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">
          All 16 steps complete
        </p>
        <h1 className="text-2xl font-semibold text-brand-headline text-center">
          Ready to generate your pitch deck
        </h1>
        <p className="text-sm text-brand-text text-center max-w-md">
          {allComplete
            ? "Your answers and design moves are ready. Generate your investor pitch deck now."
            : "Complete all 16 steps before generating the pitch deck."}
        </p>

        {status === "error" && (
          <p className="text-sm text-red-600 max-w-md text-center">{errorMsg}</p>
        )}

        <div className="flex gap-3">
          {allComplete && status !== "done" && (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={status === "loading"}
              className="rounded-md bg-brand-headline px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40"
            >
              {status === "loading" ? "Generating…" : "Generate Pitch Deck"}
            </button>
          )}
          {status === "done" && (
            <button
              type="button"
              onClick={onNavigate}
              className="rounded-md bg-brand-headline px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              View Pitch Deck →
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-200 px-10 py-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-brand-text hover:border-zinc-300"
        >
          ← Back
        </button>
      </div>
    </section>
  );
}
