"use client";

import { Suspense } from "react";
import StepScreen from "@/components/StepScreen";
import { useStepContext } from "@/components/AppShell";

function AppContent() {
  const { currentStep } = useStepContext();
  return <StepScreen stepNumber={currentStep} />;
}

export default function AppPage() {
  return (
    <Suspense>
      <AppContent />
    </Suspense>
  );
}
