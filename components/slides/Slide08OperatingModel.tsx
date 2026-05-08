import { Lightbulb, Cloud, Trophy } from "lucide-react";
import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

const ICONS = [Lightbulb, Cloud, Trophy] as const;

export function Slide08OperatingModel({ data }: { data: PitchDeckJSON["operatingModel"] }) {
  return (
    <SlideWrapper>
      <div className="absolute inset-0 flex">
        <p className="absolute top-[8%] left-[5%] text-[0.65vw] tracking-[0.15em] uppercase text-gray-400 leading-[1.6] z-10">
          Our Operating
          <br />
          Model
        </p>

        {data.columns.slice(0, 3).map((col, i) => {
          const Icon = ICONS[i];
          const isCenter = i === 1;
          return (
            <div
              key={i}
              className={`w-1/3 h-full flex flex-col items-center justify-center gap-[2vw] px-[3vw] ${isCenter ? "bg-[#3924D9]" : "bg-white"}`}
            >
              <div
                className={`w-[12vw] h-[12vw] rounded-full flex items-center justify-center ${isCenter ? "border-2 border-white" : "border border-gray-300"}`}
              >
                <Icon
                  style={{ width: "4vw", height: "4vw" }}
                  className={isCenter ? "text-white" : "text-gray-700"}
                  strokeWidth={1}
                />
              </div>
              <h3
                className={`text-[1.5vw] font-light ${isCenter ? "text-white" : "text-[#3924D9]"}`}
              >
                {col.headline}
              </h3>
              <p
                className={`text-[1.2vw] font-light text-center ${isCenter ? "text-white/80" : "text-gray-500 leading-relaxed"}`}
              >
                {col.paragraph}
              </p>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
}
