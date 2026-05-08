import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide07SolutionDetail({
  data,
  companyName,
}: {
  data: PitchDeckJSON["solution"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[4%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[8%] top-[8%] right-[8%]">
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[1vw]">
            Our Solution
          </p>
          <h2 className="text-[2.8vw] font-light leading-[1.05] text-[#3924D9]">
            {data.description}
          </h2>
        </div>

        <div className="absolute left-[8%] top-[42%] w-[35%] flex flex-col gap-[0.6vw]">
          {data.points.map((pt, i) => (
            <p key={i} className="text-[1.2vw] font-light text-gray-500 leading-relaxed">
              {pt}
            </p>
          ))}
        </div>

        <div className="absolute right-[5%] top-[32%] bottom-[8%] w-[48%] border border-gray-200 flex items-center justify-center">
          <span className="text-[1.2vw] text-gray-300">Image may be added here if needed</span>
        </div>
      </div>
    </SlideWrapper>
  );
}
