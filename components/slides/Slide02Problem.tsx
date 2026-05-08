import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide02Problem({
  data,
  companyName,
}: {
  data: PitchDeckJSON["problem"];
  companyName: string;
}) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 flex">
        {/* LEFT PANEL — white */}
        <div className="relative w-[66%] h-full bg-white">
          <div
            className="absolute top-[6%] left-0 flex justify-center"
            style={{ right: "-51%" }}
          >
            <span className="text-[0.85vw] text-[#3924D9]">{companyName}</span>
          </div>

          <p className="absolute top-[16%] left-[10%] text-[0.7vw] tracking-[0.15em] uppercase text-gray-400">
            Problem Statement
          </p>

          <h2 className="absolute top-[22%] left-[8%] right-[5%] text-[3vw] font-light leading-[1.05] text-[#3924D9]">
            {data.headline}
          </h2>

          <p className="absolute bottom-[18%] left-[8%] right-[10%] text-[1.2vw] font-light text-gray-500 leading-relaxed">
            {data.clarifyingParagraph}
          </p>
        </div>

        {/* RIGHT PANEL — blue */}
        <div className="w-[34%] h-full bg-[#3924D9] flex flex-col px-[3vw] py-[8%]">
          <p className="text-[1vw] text-white mb-[6%]">Facts</p>
          <div className="flex flex-col gap-[6%] flex-1">
            {data.facts.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-start gap-[1vw]">
                <span className="text-[2.8vw] font-light text-white leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col mt-[0.5vw]">
                  <p className="text-[1vw] font-semibold text-white">{f.headline}</p>
                  <p className="text-[1vw] text-white/80 font-light">{f.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
