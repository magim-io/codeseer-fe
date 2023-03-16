import React from "react";

import FolderTree from "../../../components/FolderTree/FolderTree";
import { explorer } from "../initial_setup";

function ActionBar() {
  return (
    <div className="w-[400px] p-3 bg-light_white flex flex-col gap-3">
      <div className="w-full bg-white rounded-lg py-2 px-3 flex flex-col gap-[10px]">
        <div className="w-full text-center">Version</div>
        <ul className="flex flex-col gap-[10px]">
          <li className="p-2 flex justify-between bg-md_blue text-white rounded-[4px]">
            <span>Version 1.0.1</span>
            <span>20/10/2022</span>
          </li>
          <li className="p-2 flex justify-between text-md_blue hover:bg-md_blue hover:text-white rounded-[4px] cursor-pointer transition-all duration-200">
            <span>Version 1.0.1</span>
            <span>20/10/2022</span>
          </li>
          <li className="p-2 flex justify-between text-md_blue hover:bg-md_blue hover:text-white rounded-[4px] cursor-pointer transition-all duration-200">
            <span>Version 1.0.1</span>
            <span>20/10/2022</span>
          </li>
        </ul>
      </div>
      <div className="flex-grow w-full max-h-[600px] py-2 px-4 bg-white overflow-y-scroll ">
        <FolderTree explorer={explorer[0]} />
      </div>
      <fieldset className="h-[200px] w-full bg-white rounded-lg px-4 py-5">
        <legend className="sr-only">Rules</legend>
        <div
          className="text-sm font-semibold leading-6 text-gray-900"
          aria-hidden="true"
        >
          Rules
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="orphan"
                name="orphan"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary_blue focus:ring-primary_blue"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="orphan" className="font-medium text-gray-900">
                Orphan
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="inherit"
                name="inherit"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary_blue focus:ring-primary_blue"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="inherit" className="font-medium text-gray-900">
                Inherit
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="naming-convention"
                name="naming-convention"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary_blue focus:ring-primary_blue"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="naming-convention"
                className="font-medium text-gray-900"
              >
                Naming Convention
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="circular-dependency"
                name="circular-dependency"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary_blue focus:ring-primary_blue"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="circular-dependency"
                className="font-medium text-gray-900"
              >
                Circular
              </label>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default ActionBar;
