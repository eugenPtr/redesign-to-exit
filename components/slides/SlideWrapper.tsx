export function SlideWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-screen h-screen snap-start flex items-center justify-center overflow-hidden bg-gray-100">
      <div
        className="relative bg-white overflow-hidden shadow-lg"
        style={{
          width: "min(88vw, calc(88vh * 16 / 9))",
          height: "min(88vh, calc(88vw * 9 / 16))",
        }}
      >
        {children}
      </div>
    </section>
  );
}
