import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import logo from "../../assets/images/codeseer_logo.png";
import useClickOutside from "../../hooks/useClickOutside";
import { BellFillIcon, PlusIcon, SearchIcon } from "../../Icons";
import AddMemberForm from "../AddMemberForm/AddMemberForm";
import CreateDomainForm from "../CreateDomainForm/CreateDomainForm";
import CreateOrganization from "../CreateOrganization/CreateOrganization";

function Navbar() {
  const avatarDropdownRef = useRef<HTMLUListElement>(null);
  const avatarDropdownWrapperRef = useRef<HTMLDivElement>(null);
  const [showCreateOrganization, setShowCreateOrganization] = useState(false);
  const [showCreateDomain, setShowCreateDomain] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const { organizationId } = useParams();
  console.log(organizationId);

  const showAvatarDropdown = () => {
    const check = avatarDropdownRef.current?.classList.contains("invisible");
    if (check) {
      avatarDropdownRef.current?.classList.toggle("invisible");
      avatarDropdownRef.current?.classList.replace("opacity-0", "opacity-100");
      avatarDropdownRef.current?.classList.replace("scale-90", "scale-100");
    } else {
      setTimeout(
        () => avatarDropdownRef.current?.classList.toggle("invisible"),
        200
      );
      avatarDropdownRef.current?.classList.replace("opacity-100", "opacity-0");
      avatarDropdownRef.current?.classList.replace("scale-100", "scale-90");
    }
  };
  useClickOutside(avatarDropdownWrapperRef, () => {
    if (!avatarDropdownRef.current?.classList.contains("invisible")) {
      showAvatarDropdown();
    }
  });

  return (
    <>
      {showCreateOrganization && (
        <CreateOrganization
          isShown={showCreateOrganization}
          setIsShown={setShowCreateOrganization}
        />
      )}
      {showCreateDomain && (
        <CreateDomainForm
          isShown={showCreateDomain}
          setIsShown={setShowCreateDomain}
        />
      )}
      {showAddMember && organizationId && (
        <AddMemberForm setIsShown={setShowAddMember} orgId={organizationId} />
      )}

      <div className="navbar flex justify-between items-center px-12 py-4  border-b border-gray-300 bg-md_blue z-10 shadow-sm">
        {/* ***************************LEFT NAV BAR******************************* */}
        <div className="flex gap-4 items-center cursor-pointer">
          <img alt="logo" src={logo} className="object-contain w-full h-11" />
          <h1 className="font-semibold text-2xl text-white">CodeSeer</h1>
        </div>
        {/* ****************************SEARCH BOX************************************** */}
        <div className="rounded-md relative flex items-center gap-3 max-w-[360px]  py-2 px-4 w-96 border border-solid border-white">
          <SearchIcon className="text-white w-[18px] h-[18px]" />
          <input
            type="text"
            className="w-full border-none focus:border-none focus:outline-none text-white bg-transparent text-sm placeholder:italic placeholder:text-white flex items-center"
            placeholder="What are you searching for..."
          />
        </div>
        {/* *******************************RIGHT NAV BAR**************************************** */}
        <div className="flex items-center gap-8">
          <BellFillIcon className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition duration-200" />
          <div className="codebase-plus-icon relative cursor-pointer ">
            <PlusIcon className="w-5 h-5 text-white rounded-full " />
            <div className="codebase-plus-dropdown absolute right-0 w-fit whitespace-nowrap flex flex-col items-start gap-1 rounded-md bg-white drop-shadow-xl scale-95 opacity-0 invisible transition duration-200 text-gray-700 text-sm z-20">
              <button
                type="button"
                onClick={() => setShowCreateOrganization(true)}
                className="text-left w-full px-3 py-2 hover:bg-slate-300 rounded-tr-md rounded-tl-md"
              >
                Create Organization
              </button>
              <button
                type="button"
                className="text-left w-full px-3 py-2 hover:bg-slate-300 rounded-br-md rounded-bl-md"
                onClick={() => setShowCreateDomain(true)}
              >
                Create Domain
              </button>
              {organizationId && (
                <button
                  type="button"
                  className="text-left w-full px-3 py-2 hover:bg-slate-300 rounded-br-md rounded-bl-md"
                  onClick={() => setShowAddMember(true)}
                >
                  Add Member
                </button>
              )}
            </div>
          </div>
          <div
            ref={avatarDropdownWrapperRef}
            className="relative flex items-center justify-center"
          >
            <button
              className="rounded-full w-8 h-8 overflow-hidden border border-white outline-none"
              type="button"
              onClick={showAvatarDropdown}
            >
              <img
                alt="avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9S87a1sDDtCCyyU5oLkwQs66C1uby47uqlg&usqp=CAU"
                className="w-full h-auto object-cover"
              />
            </button>
            <ul
              ref={avatarDropdownRef}
              className="codebase_avatar_dropdown min-w-[240px] flex flex-col gap-1  absolute top-full right-0 mt-2 bg-white whitespace-nowrap text-gray-700 rounded-md overflow-hidden invisible opacity-0 scale-90 transition duration-200 origin-top-right shadow-2xl"
            >
              <li className="pl-3 pr-6 py-2 cursor-pointer hover:bg-slate-300 flex flex-col">
                <h1 className="font-semibold">Neyterym</h1>
                <span className="text-gray-500">@neyterym299</span>
              </li>
              {/* ****Divider**** */}
              <li className="h-[1px] bg-slate-400" />
              <li className="pl-3 pr-6 py-2 cursor-pointer hover:bg-slate-300">
                <a href="/set-status">Set status</a>
              </li>
              <li className="pl-3 pr-6 py-2 cursor-pointer hover:bg-slate-300">
                <a href="/edit-profile">Edit Profile</a>
              </li>
              <li className="pl-3 pr-6 py-2 cursor-pointer hover:bg-slate-300">
                <a href="Preferences">Preferences</a>
              </li>
              {/* ****Divider**** */}
              <li className="h-[1px] bg-slate-400" />
              <li className="pl-3 pr-6 py-2 cursor-pointer hover:bg-slate-300">
                Sign out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
