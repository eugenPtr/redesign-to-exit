import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide10RevenueStreams({
  data,
  companyName,
}: {
  data: PitchDeckJSON["businessModel"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[8%] top-[28%] w-[36%]">
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[2vw]">
            Business Model
          </p>
          <h2 className="text-[3vw] font-light leading-[1.05] text-[#3924D9]">
            revenue
            <br />
            streams &<br />
            traction
          </h2>
        </div>

        <div className="absolute right-[5%] top-[30%] w-[44%] flex flex-col gap-[1vw]">
          {data.points.map((pt, i) => (
            <div key={i} className="flex items-start gap-[0.8vw]">
              <span className="text-[1.2vw] text-gray-400 mt-[0.1vw]">·</span>
              <p className="text-[1.2vw] font-light text-gray-500 leading-relaxed">{pt}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
