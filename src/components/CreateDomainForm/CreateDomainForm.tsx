/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactQuill from "react-quill";
import { toast } from "react-toastify";

import { ChevronDown, CloseIcon } from "../../Icons";
import DomainService from "../../services/domain.service";
import TeamService from "../../services/team.service";
import { ITeam } from "../../types/team/team.interface";

import "./CreateDomainForm.style.scss";

function CreateDomainForm({ setIsShown }: any) {
  const labelDropdown = useRef<HTMLUListElement>(null);
  const [selectedTeam, setSelectedTeam] = useState<ITeam>();
  const [value, setValue] = useState("");
  const [teams, setTeams] = useState<ITeam[]>([]);

  const openLabelDropdown = () => {
    if (labelDropdown.current!!.classList.contains("invisible")) {
      labelDropdown.current!!.classList.toggle("opacity-0");
      labelDropdown.current!!.classList.toggle("invisible");
    } else {
      labelDropdown.current!!.classList.toggle("opacity-0");
      setTimeout(() => {
        labelDropdown.current!!.classList.toggle("invisible");
      }, 100);
    }
  };

  const closeModal = () => {
    setIsShown(false);
  };

  const selectAssignedTeam = (team: ITeam) => {
    setSelectedTeam(team);
    openLabelDropdown();
  };

  const handleCreateDomain = async (event: any) => {
    event.preventDefault();
    const { domainName, domainDirectory, domainRepository } = event.target;

    try {
      const res = await DomainService.createNewDomain({
        teamId: selectedTeam?.teamId as string,
        payload: {
          name: domainName.value,
          directory: domainDirectory.value,
          repository: domainRepository.value,
        },
      });

      if (res.data.success) {
        toast.success(`Create domain ${domainName.value} successfully!`);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await TeamService.retrieveTeams();
        if (res.data.success) {
          setTeams(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="fixed inset-0  py-14  flex justify-center z-20">
      <div
        className="backdrop-brightness-75 backdrop-blur-sm fixed inset-0 py-5 "
        onClick={closeModal}
      />
      <form
        onSubmit={handleCreateDomain}
        className="w-[600px]   flex flex-col bg-white rounded-xl z-40 "
      >
        <div className=" p-6 border-b border-md_blue flex justify-between">
          <h1 className="text-md_blue text-3xl font-semibold">Create Domain</h1>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>
        <div className="w-full h-full flex flex-col gap-5 px-6 pt-4 pb-8 max-h-screen overflow-y-scroll">
          <div className=" flex flex-col gap-3">
            <label htmlFor="domain_name" className="text-lg font-medium">
              Domain name
            </label>
            <input
              id="domain_name"
              name="domainName"
              type="text"
              className="py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500"
              placeholder="Login domain, Auth domain, Mange domain,..."
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="domain_account" className="text-lg font-medium">
              Accounts
            </label>
            <input
              id="domain_account"
              name="domainAccount"
              type="text"
              className="py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500"
              placeholder="Ken-nguyen-2000"
              required
            />
            <a
              href="https://github.com/apps/magim-bot/installations/new"
              className="text-drark_blue underline"
            >
              + Add new accounts/organizations
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="domain_repository" className="text-lg font-medium">
              Repositories
            </label>
            <input
              id="domain_repository"
              name="domainRepository"
              type="text"
              className="py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500"
              placeholder="Lost-and-Found, Facebook-clone,..."
              required
            />
            <a
              href="https://github.com/apps/magim-bot"
              className="text-drark_blue underline"
            >
              + Add more repsitories from this accounts/organizations
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="domain_directory" className="text-lg font-medium">
              Directory
            </label>
            <input
              id="domain_directory"
              name="domainDirectory"
              type="text"
              className="py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500"
              placeholder="src/components/, src/, root/, dist/,..."
              required
            />
          </div>
          <div className="flex flex-col gap-3 relative">
            <label htmlFor="organization_login" className="text-lg font-medium">
              Assigned to
            </label>
            <button
              type="button"
              className="relative w-full"
              onClick={openLabelDropdown}
            >
              <div className="flex items-center justify-between py-4 px-7 border border-gray-400 rounded-md text-gray-500">
                <span>{selectedTeam ? selectedTeam.team.name : "Team"}</span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            <ul
              ref={labelDropdown}
              className="create-organization-label__dropdown absolute top-full z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in duration-100 opacity-0 invisible"
              role="listbox"
            >
              {teams.map((team: ITeam) => (
                <li
                  key={team.teamId}
                  className="py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white"
                  role="option"
                  aria-selected
                  onClick={selectAssignedTeam.bind(null, team)}
                >
                  {team.team.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 relative mb-10">
            <label
              htmlFor="organization_description"
              className="text-lg font-medium"
            >
              Description
            </label>
            <ReactQuill
              id="organization_description"
              className="h-[120px] "
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="p-6 border-t border-md_blue w-full flex justify-end">
          <button
            type="submit"
            className="bg-md_blue text-white font-semibold px-6 py-2 rounded-md"
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateDomainForm;
