import React from "react";

import {
  ChartTreeMap,
  ChevronDown,
  ChevronRight,
  CircleChevronLeft,
  ClipboardText,
  Settings,
} from "../../Icons";

import "./style.scss";

function Sidebar() {
  return (
    <section className="sidebar__wrapper relative w-[340px] min-h-screen flex flex-col justify-between resize-x py-9">
      <CircleChevronLeft className="sidebar__circle-chevrion-left absolute  -right-4 top-[100px] bg-white rounded-full text-md_gray cursor-pointer" />
      <div className="flex flex-col gap-6 px-6">
        <div className="flex flex-col">
          <div className="flex gap-4 items-center text-primary_text text-lg font-semibold">
            FPLMS <ChevronDown className="w-5 h-5" />
          </div>
          <span className="text-md_gray">Software Project</span>
        </div>
        <div className="w-full h-[1px] bg-primary_gray" />
        <div className="flex flex-col gap-2">
          <div className=" flex items-center gap-2 py-1 text-xl font-semibold text-primary_text cursor-pointer hover:opacity-80">
            <ChevronDown className="w-5 h-5" />
            Domains
          </div>
          <div className="ml-6 flex flex-col">
            <div className="flex items-center gap-2 py-1 text-lg text-md_gray cursor-pointer hover:font-medium">
              <ChevronDown className="w-4 h-4" />
              Battle Maids&apos; Domain
            </div>
            <ul className="ml-4 flex flex-col gap-2 text-primary_gray text-base">
              <li className="flex gap-2 items-center hover:bg-md_blue hover:text-white w-fit px-2 py-1 rounded-md cursor-pointer">
                <ClipboardText className="w-4 h-4" /> Reports
              </li>
              <li className="flex gap-2 items-center hover:bg-md_blue hover:text-white w-fit px-2 py-1 rounded-md cursor-pointer bg-md_blue text-white">
                <ChartTreeMap className="w-4 h-4" /> Version 1.0.1
              </li>
              <li className="flex gap-2 items-center hover:bg-md_blue hover:text-white w-fit px-2 py-1 rounded-md cursor-pointer">
                <ChartTreeMap className="w-4 h-4" /> Version 1.0.1
              </li>
              <li className="flex gap-2 items-center hover:bg-md_blue hover:text-white w-fit px-2 py-1 rounded-md cursor-pointer">
                <ChartTreeMap className="w-4 h-4" /> Version 1.0.1
              </li>
            </ul>
          </div>
          <div className="ml-6 flex flex-col">
            <div className="flex items-center gap-2 py-1 text-lg text-md_gray cursor-pointer hover:font-medium">
              <ChevronRight className="w-4 h-4" />
              Area Guardians&apos; Domain
            </div>
          </div>
          <div className="ml-6 flex flex-col">
            <div className="flex items-center gap-2 py-1 text-lg text-md_gray cursor-pointer hover:font-medium">
              <ChevronRight className="w-4 h-4" />
              Floor Guardians&apos; Domain
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" flex items-center gap-2 py-1 text-xl font-semibold text-primary_text cursor-pointer hover:opacity-80">
            <ChevronDown className="w-5 h-5" />
            Teams
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" flex items-center gap-2 py-1 text-xl font-semibold text-primary_text cursor-pointer hover:opacity-80">
            <Settings className="w-5 h-5" />
            Organization Settings
          </div>
        </div>
      </div>
      <div className="text-center w-full flex flex-col text-md_gray text-sm">
        <p>You&apos;re in a domain-managed place</p>
        <p className="font-semibold">Learn more</p>
      </div>
    </section>
  );
}

export default Sidebar;
