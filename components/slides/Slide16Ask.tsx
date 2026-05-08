import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide16Ask({
  data,
  companyName,
}: {
  data: PitchDeckJSON["ask"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <p className="absolute top-[10%] left-[8%] text-[0.7vw] tracking-[0.15em] uppercase text-gray-400">
          Ask
        </p>

        <h2 className="absolute top-[13%] left-[8%] right-[8%] text-[2.8vw] font-light leading-[1.05] text-[#3924D9]">
          Financials & Funding ask
        </h2>

        <div className="absolute top-[42%] left-[8%] w-[50%]">
          <h4 className="text-[1.1vw] font-semibold text-gray-700 mb-[1vw]">
            {data.sectionTitle}
          </h4>
          <p className="text-[0.9vw] font-light text-gray-500 leading-relaxed">{data.paragraph}</p>
        </div>
      </div>
    </SlideWrapper>
  );
}
