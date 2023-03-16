import React, { useEffect, useState } from "react";

import OrganizationService from "../../services/organization.service";
import { IOrganization } from "../../types/organization/organization";

import OrgItem from "./OrgItem/OrgItem";

import "./style.scss";

function Home() {
  const [selectedMenu, setSelectedMenu] = useState("Onboarding");
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await OrganizationService.retrieveOrganizations();

        if (res.data.success) {
          setOrganizations(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrganizations();
  }, []);

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
          {organizations.map((org: IOrganization) => (
            <OrgItem key={org.organizationId} data={org} />
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
