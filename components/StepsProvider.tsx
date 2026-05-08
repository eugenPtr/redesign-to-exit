"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Step } from "@/lib/framework-data";

const StepsContext = createContext<Step[] | null>(null);

export function useSteps(): Step[] {
  const ctx = useContext(StepsContext);
  if (!ctx) throw new Error("useSteps must be used inside StepsProvider");
  return ctx;
}

export function StepsProvider({
  steps,
  children,
}: {
  steps: Step[];
  children: ReactNode;
}) {
  return (
    <StepsContext.Provider value={steps}>{children}</StepsContext.Provider>
  );
}
