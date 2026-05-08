import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide17ThankYou({
  data,
  companyName,
}: {
  data: PitchDeckJSON["thankYou"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[18%] top-[38%] right-[8%]">
          <h2 className="text-[2.8vw] font-light leading-[1.1] text-[#3924D9]">{data.message}</h2>
          <p className="text-[0.9vw] font-light text-gray-400 mt-[2vw]">{data.contactName}</p>
          <p className="text-[0.9vw] font-light text-gray-400 mt-[0.3vw]">{data.contact}</p>
        </div>

        <div className="absolute bottom-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.75vw] text-gray-300 tracking-wide">{data.date}</span>
        </div>
      </div>
    </SlideWrapper>
  );
}
