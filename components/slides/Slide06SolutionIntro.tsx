import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide06SolutionIntro({
  data,
  companyName,
}: {
  data: PitchDeckJSON["solution"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[8%] top-[28%] w-[38%]">
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[2vw]">
            Our Solution
          </p>
          <h2 className="text-[3vw] font-light leading-[1.05] text-[#3924D9] mb-[1vw]">
            {data.solutionName}
          </h2>
          <p className="text-[1.2vw] font-light text-gray-400">{data.positioningPhrase}</p>
        </div>

        <div className="absolute right-[5%] top-[30%] w-[44%] flex flex-col gap-[0.6vw]">
          {data.points.map((pt, i) => (
            <p key={i} className="text-[1.3vw] font-light text-gray-500">
              {pt}
            </p>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
