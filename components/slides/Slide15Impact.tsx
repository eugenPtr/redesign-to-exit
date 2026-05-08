import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide15Impact({
  data,
  companyName,
}: {
  data: PitchDeckJSON["impact"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[8%] top-[18%] w-[40%] flex flex-col gap-[4%]">
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[3%]">
            The Impact
          </p>
          {data.points.slice(0, 3).map((pt, i) => (
            <div key={i} className="flex items-center gap-[2vw]">
              <span className="text-[3.5vw] font-light text-[#3924D9] leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[1.2vw] font-light text-gray-600">{pt}</p>
            </div>
          ))}
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-gray-100 overflow-hidden">
          <div className="absolute bottom-[18%] left-[8%] right-0 bg-[#3924D9] px-[2vw] py-[1.5vw]">
            <p className="text-[1.8vw] font-light text-white leading-[1.1]">{data.vision}</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
