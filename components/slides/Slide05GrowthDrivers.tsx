import React from "react";
import { SlideWrapper } from "./SlideWrapper";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export function Slide05GrowthDrivers({
  data,
  companyName,
}: {
  data: PitchDeckJSON["marketGrowthDrivers"];
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
            Why Now
          </p>
          <h2 className="text-[3vw] font-light leading-[1.05] text-[#3924D9]">
            market
            <br />
            growth
            <br />
            drivers
          </h2>
        </div>

        <div className="absolute right-[5%] top-[20%] w-[50%]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left text-[0.9vw] font-semibold text-gray-700 px-[1vw] py-[1.2vw] w-1/3">
                  Trend
                </th>
                <th className="text-left text-[0.9vw] font-semibold text-gray-700 px-[1vw] py-[1.2vw] w-1/3">
                  Market Effect
                </th>
                <th className="text-left text-[0.9vw] font-semibold text-gray-700 px-[1vw] py-[1.2vw] w-1/3">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <React.Fragment key={i}>
                  <tr className="bg-gray-50">
                    <td className="text-[0.9vw] text-gray-500 font-light px-[1vw] py-[2vw]">
                      {row.trend}
                    </td>
                    <td className="text-[0.9vw] text-gray-500 font-light px-[1vw] py-[2vw]">
                      {row.marketEffect}
                    </td>
                    <td className="text-[0.9vw] text-gray-500 font-light px-[1vw] py-[2vw]">
                      {row.source}
                    </td>
                  </tr>
                  {i < data.rows.length - 1 && (
                    <tr className="h-[1.5vw]">
                      <td colSpan={3} />
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SlideWrapper>
  );
}
