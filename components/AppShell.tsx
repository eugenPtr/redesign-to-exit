"use client";

import { createContext, useContext, useState, type ReactNode, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import StepProgress from "./StepProgress";
import { resetState } from "@/lib/state";

type StepContextValue = {
  currentStep: number;
  setCurrentStep: (n: number) => void;
};

const StepContext = createContext<StepContextValue | null>(null);

export function useStepContext(): StepContextValue {
  const ctx = useContext(StepContext);
  if (!ctx) throw new Error("useStepContext must be used inside AppShell");
  return ctx;
}

function DemoBadge() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";
  if (!isDemo) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-full bg-brand-headline/10 px-3 py-1 text-xs font-semibold text-brand-headline">
        DEMO
      </span>
      <Link
        href="/app"
        className="text-xs text-brand-text underline underline-offset-2 hover:text-brand-headline"
      >
        Exit demo
      </Link>
    </div>
  );
}

function ResetButton() {
  const router = useRouter();

  function handleReset() {
    if (!confirm("Start from scratch? All progress will be lost.")) return;
    resetState();
    router.push("/");
  }

  return (
    <button
      onClick={handleReset}
      className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
    >
      Start from scratch
    </button>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      <div className="flex min-h-full flex-1 flex-col bg-brand-bg">
        <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
          <Link href="/" className="text-xl font-semibold tracking-tight text-brand-headline">
            Redesign to Exit
          </Link>
          <div className="flex items-center gap-6">
            <Suspense fallback={null}>
              <DemoBadge />
            </Suspense>
            <Suspense fallback={null}>
              <ResetButton />
            </Suspense>
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <StepProgress currentStep={currentStep} onSelectStep={setCurrentStep} />
      </div>
    </StepContext.Provider>
  );
}
