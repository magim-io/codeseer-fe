/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  ChartTreeMap,
  ChevronDown,
  ChevronRight,
  CircleChevronLeft,
  ClipboardText,
  PlusIcon,
  Settings,
  UsersIcon,
} from "../../Icons";
import TeamService from "../../services/team.service";
import { IDomain } from "../../types/domain/domain.interface";
import { IOrganization } from "../../types/organization/organization";
import { ITeam } from "../../types/team/team.interface";
import CreateTeamForm from "../CreateTeamForm/CreateTeamForm";

import "./Sidebar.style.scss";

interface ISidebar {
  data: IOrganization;
  domains: IDomain[];
  teams: ITeam[];
}

function Sidebar({ data, domains, teams }: ISidebar) {
  const navigate = useNavigate();

  const [openDomains, setOpenDomains] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  const handleJoinTeam = async (teamId: string, teamName: string) => {
    try {
      const res = await TeamService.joinTeam({
        teamId,
        orgId: data.organizationId,
      });

      if (res.data.success) {
        toast.success(`Join team ${teamName} successfully!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showCreateTeam && (
        <CreateTeamForm
          isShown={showCreateTeam}
          setIsShown={setShowCreateTeam}
          orgId={data.organizationId}
        />
      )}
      <section className="sidebar__wrapper relative w-[360px] min-h-screen flex flex-col justify-between resize-x py-9">
        <CircleChevronLeft className="sidebar__circle-chevrion-left absolute  -right-4 top-[100px] bg-white rounded-full text-md_gray cursor-pointer" />
        <div className="flex flex-col gap-6 px-6">
          <div className="flex flex-col">
            <div className="flex gap-4 items-center text-primary_text text-lg font-semibold">
              {data.organization.name} <ChevronDown className="w-5 h-5" />
            </div>
            <span className="text-md_gray">Software Project</span>
          </div>
          <div className="w-full h-[1px] bg-primary_gray" />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className=" flex items-center gap-2 py-1 text-xl font-semibold text-primary_text cursor-pointer hover:opacity-80"
              onClick={() => setOpenDomains(!openDomains)}
            >
              <ChevronDown className="w-5 h-5" />
              Domains
            </button>
            <ul
              className={`flex flex-col gap-2 h-fit overflow-hidden transition-all ease-in-out duration-300 ${
                openDomains ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <li className="ml-6 flex flex-col">
                <div className="flex items-center gap-2 py-1 text-lg text-md_gray cursor-pointer hover:font-medium">
                  <ChevronDown className="w-4 h-4" />
                  Battle Maids&apos; Domain
                </div>
                <ul className=" ml-4 flex flex-col gap-2 text-primary_gray text-base">
                  <li className="flex gap-2 items-center hover:bg-md_blue hover:text-white w-fit px-2 py-1 rounded-md cursor-pointer">
                    <ClipboardText className="w-4 h-4" /> Reports
                  </li>
                  <li className="flex gap-2 items-center hover:bg-md_blue hover:text-white w-fit px-2 py-1 rounded-md cursor-pointer bg-md_blue text-white">
                    <ChartTreeMap className="w-4 h-4" /> Version 1.0.1
                  </li>
                  <li className="flex gap-2 items-center hover:bg-md_blue hover:text-white w-fit px-2 py-1 rounded-md cursor-pointer">
                    <ChartTreeMap className="w-4 h-4" /> Version 1.0.1
                  </li>
                  <li className="flex gap-2 items-center ">
                    <ChartTreeMap className="w-4 h-4" /> Version 1.0.1
                  </li>
                </ul>
              </li>
              {domains.map((domain: IDomain) => (
                <li key={domain.domainId} className="ml-6 flex flex-col">
                  <button
                    type="button"
                    className="flex items-center gap-2 py-1 text-lg text-md_gray cursor-pointer hover:font-medium"
                    onClick={() => navigate("/explorer")}
                  >
                    <ChevronRight className="w-4 h-4" />
                    {domain.domain.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className=" flex items-center gap-2 py-1 text-xl font-semibold text-primary_text cursor-pointer hover:opacity-80">
              <ChevronDown className="w-5 h-5" />
              Teams
            </div>
            <ul className="flex flex-col gap-2">
              {teams.map((team: ITeam) => (
                <li key={team.teamId} className="ml-6 flex justify-between">
                  <div className="flex items-center gap-3 py-1 text-lg text-md_gray cursor-pointer hover:font-medium">
                    <UsersIcon className="w-auto h-5" />
                    {team.team.name}
                  </div>

                  <button
                    onClick={handleJoinTeam.bind(
                      null,
                      team.teamId,
                      team.team.name
                    )}
                    type="button"
                    className="font-medium px-4 py-1 border border-drark_blue rounded-full"
                  >
                    Join
                  </button>
                </li>
              ))}
              <li className="ml-4">
                <button
                  type="button"
                  className="py-1 flex gap-1 items-center hover:bg-md_blue hover:text-white w-fit px-2 rounded-md"
                  onClick={() => setShowCreateTeam(true)}
                >
                  <PlusIcon className="w-4 h-4" /> Add new Team
                </button>
              </li>
            </ul>
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
    </>
  );
}

export default Sidebar;
