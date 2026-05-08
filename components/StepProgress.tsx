"use client";

import { Fragment, useEffect, useState } from "react";
import { STEPS } from "@/lib/framework-data";
import { getState, type AppState } from "@/lib/state";

type StepStatus = "locked" | "active" | "completed";

type Props = {
  currentStep: number;
  onSelectStep?: (stepNumber: number) => void;
};

const TOTAL_STEPS = 16;

function statusFor(
  stepNumber: number,
  currentStep: number,
  state: AppState,
): StepStatus {
  if (state.steps[stepNumber]?.designMove) return "completed";
  if (stepNumber === currentStep) return "active";
  return "locked";
}

function reachable(stepNumber: number, state: AppState): boolean {
  if (stepNumber === 1) return true;
  return Boolean(state.steps[stepNumber - 1]?.designMove);
}

function titleFor(stepNumber: number): string {
  return STEPS[stepNumber - 1]?.title ?? `Step ${stepNumber}`;
}

const stripedDone =
  "bg-[repeating-linear-gradient(135deg,var(--color-brand-headline)_0_8px,color-mix(in_srgb,var(--color-brand-headline)_55%,white)_8px_16px)]";
const solidLocked = "bg-zinc-200";

export default function StepProgress({ currentStep, onSelectStep }: Props) {
  const [state, setState] = useState<AppState>({ steps: {}, pitchDeck: null });

  useEffect(() => {
    setState(getState());
    const refresh = () => setState(getState());
    window.addEventListener("storage", refresh);
    window.addEventListener("step-saved", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("step-saved", refresh);
    };
  }, []);

  return (
    <nav
      aria-label="Step progress"
      className="w-full border-t border-zinc-200 bg-brand-bg px-6 py-6"
    >
      <ol className="flex w-full items-start">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n, idx) => {
          const status = statusFor(n, currentStep, state);
          const canClick = reachable(n, state);
          const isLast = idx === TOTAL_STEPS - 1;

          const circleBase =
            "relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-colors";
          const circleStyles =
            status === "completed"
              ? "bg-brand-headline text-white"
              : status === "active"
                ? "bg-brand-headline text-white ring-4 ring-brand-headline/20"
                : "bg-zinc-200 text-zinc-400";

          const connectorClass =
            status === "completed" || status === "active"
              ? stripedDone
              : solidLocked;

          const labelStyles =
            status === "completed"
              ? "text-brand-headline"
              : status === "active"
                ? "font-semibold text-brand-headline"
                : "text-zinc-400";

          return (
            <Fragment key={n}>
              <li className="flex min-w-0 flex-1 flex-col items-center">
                <button
                  type="button"
                  disabled={!canClick}
                  onClick={() => canClick && onSelectStep?.(n)}
                  className={`${circleBase} ${circleStyles} ${
                    canClick ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  aria-current={status === "active" ? "step" : undefined}
                  aria-label={`Step ${n}: ${titleFor(n)}`}
                >
                  {status === "completed" ? "✓" : n}
                </button>
                <span
                  className={`mt-2 max-w-full truncate px-1 text-[10px] leading-tight ${labelStyles}`}
                  title={titleFor(n)}
                >
                  {titleFor(n)}
                </span>
              </li>
              {!isLast && (
                <li
                  aria-hidden="true"
                  className={`mt-4 h-1 flex-1 ${connectorClass}`}
                />
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
