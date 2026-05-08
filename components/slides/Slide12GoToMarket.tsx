import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide12GoToMarket({
  data,
  companyName,
}: {
  data: PitchDeckJSON["goToMarket"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[8%] top-[11%] right-[8%]">
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[1.5vw]">
            Go To Market
          </p>
          <h2 className="text-[2.8vw] font-light leading-[1.05] text-[#3924D9]">
            a lean growth strategy
          </h2>
        </div>

        <div className="absolute left-[8%] right-[8%] top-[38%] bottom-[8%] grid grid-cols-3 gap-x-[3vw] gap-y-[2vw]">
          {data.columns.slice(0, 5).map((col, i) => (
            <div key={i} className="flex flex-col gap-[0.5vw]">
              <h4 className="text-[1vw] font-semibold text-gray-700">{col.headline}</h4>
              {col.points.map((pt, j) => (
                <p key={j} className="text-[0.85vw] font-light text-gray-400">
                  {pt}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
