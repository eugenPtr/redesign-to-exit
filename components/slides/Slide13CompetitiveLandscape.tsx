import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide13CompetitiveLandscape({
  data,
  companyName,
}: {
  data: PitchDeckJSON["competitiveAdvantage"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[8%] top-[16%] w-[36%]">
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[2vw]">
            Competitive Advantage
          </p>
          <h2 className="text-[3vw] font-light leading-[1.05] text-[#3924D9] mb-[1.5vw]">
            {data.headline}
          </h2>
          <p className="text-[1.2vw] font-light text-gray-500 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="absolute right-[5%] top-[18%] bottom-[8%] w-[48%] border border-gray-200 flex items-center justify-center">
          <span className="text-[1.2vw] text-gray-300">Chart may be added here if needed</span>
        </div>
      </div>
    </SlideWrapper>
  );
}
