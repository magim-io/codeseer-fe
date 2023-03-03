import React, { useState } from "react";

import "./style.scss";

function Home() {
  const [selectedMenu, setSelectedMenu] = useState("Onboarding");

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="ml-12 m-10 font-semibold text-2xl">Your Organization</h1>
      <div className="w-full bg-slate-50 flex flex-col">
        <div className="flex justify-between pl-12 pr-20 pt-6 pb-4">
          <h2 className="font-semibold">Recent Organization</h2>
          <span className="opacity-70 underline cursor-pointer hover:opacity-100">
            Create new
          </span>
        </div>
        <div className="flex px-12 gap-4 overflow-x-hidden pb-8">
          {new Array(4).fill("").map((item, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="flex rounded-md overflow-hidden shadow-md border border-gray-200 hover:shadow-lg whitespace-nowrap flex-shrink-0"
            >
              <div className="w-5 bg-drark_blue " />
              <div className="flex flex-col w-[240px] gap-2 text-sm pt-4 pb-2">
                <div className="w-full flex flex-col pl-5 pr-5 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <h1 className="text-lg px-1 pt-1">FPLMS</h1>
                    <span className="px-1 pb-1">Team-managed software</span>
                  </div>
                  <h1 className="text-gray-400 text-base my-2 px-1 py-1">
                    QUICK ACCESS
                  </h1>
                  <span className="cursor-pointer hover:bg-gray-200 px-1 py-2 rounded-md">
                    Domains: Analytic tech debt
                  </span>
                  <span className="w-full flex justify-between items-center cursor-pointer hover:bg-gray-200 px-1 py-1 rounded-md">
                    Teams
                    <span className="px-4 py-1 rounded-full bg-drark_blue text-white">
                      4
                    </span>
                  </span>
                </div>
                <div className="h-[1px] bg-gray-400" />
                <div className="flex justify-between pl-6 pr-6">
                  Current Repo <span>Kenflix</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-16 mt-10 flex flex-col min-h-[300px]">
        <div className="flex gap-4 text-lg font-semibold text-gray-500 relative before:content-[''] before:h-[2px] before:bg-gray-300 before:absolute before:bottom-0 before:right-0 before:left-0">
          {["Onboarding", "Maintenance", "Migration", "Continuous"].map(
            (item) => (
              <button
                type="button"
                className={`cursor-pointer hover:text-drark_blue transition-colors duration-200 ${
                  selectedMenu === item
                    ? "border-b-2  border-gray-500 z-[1] text-drark_blue"
                    : ""
                }`}
                onClick={() => setSelectedMenu(item)}
                key={item}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
