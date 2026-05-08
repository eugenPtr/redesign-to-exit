import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide04MarketOpportunity({
  data,
  companyName,
}: {
  data: PitchDeckJSON["opportunitySize"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[8%] top-[32%] w-[38%]">
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[2vw]">
            The Opportunity
          </p>
          <h2 className="text-[3vw] font-light leading-[1.05] text-[#3924D9] mb-[1.5vw]">
            market
            <br />
            opportunity
          </h2>
          <p className="text-[1.2vw] font-light text-gray-500 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="absolute right-[3%] top-[10%] bottom-[10%] w-[50%] flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
            <text x="310" y="90" fontSize="14" fill="#6b7280">TAM:</text>
            <text x="310" y="108" fontSize="13" fill="#3924D9" fontWeight="500">{data.tam}</text>

            <circle cx="200" cy="230" r="130" fill="none" stroke="#3924D9" strokeWidth="1.5" />
            <text x="245" y="180" fontSize="14" fill="#6b7280">SAM:</text>
            <text x="245" y="198" fontSize="13" fill="#3924D9" fontWeight="500">{data.sam}</text>

            <circle cx="200" cy="270" r="75" fill="none" stroke="#4AE5C8" strokeWidth="1.5" />
            <text x="222" y="262" fontSize="14" fill="#6b7280">SOM:</text>
            <text x="222" y="280" fontSize="13" fill="#4AE5C8" fontWeight="500">{data.som}</text>
          </svg>
        </div>
      </div>
    </SlideWrapper>
  );
}
