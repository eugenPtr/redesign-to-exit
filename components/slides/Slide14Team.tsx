import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide14Team({
  data,
  companyName,
}: {
  data: PitchDeckJSON["team"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-[6%] left-0 right-0 flex justify-center">
          <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
        </div>

        <div className="absolute left-[8%] top-[10%]">
          <p className="text-[0.7vw] tracking-[0.15em] uppercase text-gray-400 mb-[1.5vw]">
            Our Team
          </p>
          <h2 className="text-[2.8vw] font-light leading-[1.05] text-[#3924D9]">Team</h2>
        </div>

        <div className="absolute left-[8%] right-[8%] top-[38%] bottom-[8%] flex gap-[4vw]">
          {data.members.slice(0, 3).map((m, i) => (
            <div key={i} className="flex-1 flex flex-col gap-[1vw]">
              <div className="w-[7vw] h-[7vw] rounded-full border border-gray-200 flex items-center justify-center">
                <span className="text-[0.9vw] text-gray-300">Picture</span>
              </div>
              <h4 className="text-[1vw] font-semibold text-gray-700 mt-[0.5vw]">{m.name}</h4>
              <p className="text-[0.85vw] font-semibold text-gray-500">{m.role}</p>
              {m.points.map((pt, j) => (
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
