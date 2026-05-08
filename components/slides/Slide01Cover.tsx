import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide01Cover({ data }: { data: PitchDeckJSON["cover"] }) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{data.companyName}</span>
        </div>

        <div className="absolute left-[7%] top-[48%]">
          <h1 className="text-[3vw] font-light leading-[1.05] text-[#3924D9] max-w-[75%]">
            {data.valueProposition}
          </h1>
          <p className="text-[2.2vw] font-light text-gray-400 mt-[0.5vw]">
            {data.targetAudience}
          </p>
        </div>

        <div className="absolute bottom-[7%] left-[7%]">
          <span className="text-[0.9vw] text-gray-400">{data.founderName}</span>
        </div>
      </div>
    </SlideWrapper>
  );
}
