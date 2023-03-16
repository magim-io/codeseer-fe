import React from "react";
import { useNavigate } from "react-router-dom";

import { IOrganization } from "../../../types/organization/organization";

interface IOrgItem {
  data: IOrganization;
}

function OrgItem({ data }: IOrgItem) {
  const navigate = useNavigate();

  return (
    <div className="flex rounded-md overflow-hidden shadow-md border border-gray-200 hover:shadow-lg whitespace-nowrap flex-shrink-0">
      <div className="w-5 bg-drark_blue " />
      <div className="flex flex-col w-[240px] gap-2 text-sm pt-4 pb-2">
        <div className="w-full flex flex-col pl-5 pr-5 text-sm">
          <button
            type="button"
            className="flex flex-col cursor-pointer"
            onClick={() => navigate(`/organization/${data.organizationId}`)}
          >
            <h1 className="text-lg px-1 pt-1">{data.organization.name}</h1>
            <span className="px-1 pb-1">Team-managed software</span>
          </button>
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
  );
}

export default OrgItem;
