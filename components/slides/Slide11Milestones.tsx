import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide11Milestones({
  data,
  companyName,
}: {
  data: PitchDeckJSON["milestones"];
  companyName: string;
}) {
  const milestones = data.slice(0, 4);

  return (
    <SlideWrapper>
      <div className="absolute inset-0 flex flex-col">
        {/* TOP HALF — white */}
        <div className="h-[50%] bg-white relative flex flex-col justify-end px-[8%] pb-[3%]">
          <div className="absolute top-[12%] left-0 right-0 flex justify-center">
            <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
          </div>
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[1.5vw]">
            Key Milestones
          </p>
          <h2 className="text-[2.8vw] font-light leading-[1.05] text-[#3924D9]">
            from MVP to Scale
          </h2>
        </div>

        {/* BOTTOM HALF — blue */}
        <div className="h-[50%] bg-[#3924D9] flex items-start px-[8%] pt-[4%]">
          {milestones.map((m, i) => {
            const isLast = i === milestones.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col gap-[1vw]">
                <span
                  className={`text-[4vw] font-light leading-none ${isLast ? "text-[#4AE5C8]" : "text-white"}`}
                >
                  {m.year}
                </span>
                <p className="text-[0.9vw] font-light text-white/80 max-w-[80%]">
                  {m.objective}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SlideWrapper>
  );
}
