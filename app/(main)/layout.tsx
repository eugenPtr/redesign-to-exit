import AppShell from "@/components/AppShell";
import { StepsProvider } from "@/components/StepsProvider";
import { getSteps } from "@/lib/get-steps";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps = await getSteps();
  return (
    <StepsProvider steps={steps}>
      <AppShell>{children}</AppShell>
    </StepsProvider>
  );
}
