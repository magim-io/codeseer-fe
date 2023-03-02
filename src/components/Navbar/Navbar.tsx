import React, { useRef } from 'react';
import logo from '../../assets/images/codeseer_logo.png';
import useClickOutside from '../../hooks/useClickOutside';
import { BellFillIcon, PlusIcon, SearchIcon } from '../../Icons';

const Navbar = () => {
  const avatarDropdownRef = useRef<HTMLUListElement>(null);
  const avatarDropdownWrapperRef = useRef<HTMLDivElement>(null);

  const showAvatarDropdown = () => {
    const check = avatarDropdownRef.current?.classList.contains('invisible');
    if (check) {
      avatarDropdownRef.current?.classList.toggle('invisible');
      avatarDropdownRef.current?.classList.replace('opacity-0', 'opacity-100');
      avatarDropdownRef.current?.classList.replace('scale-90', 'scale-100');
    } else {
      setTimeout(
        () => avatarDropdownRef.current?.classList.toggle('invisible'),
        200
      );
      avatarDropdownRef.current?.classList.replace('opacity-100', 'opacity-0');
      avatarDropdownRef.current?.classList.replace('scale-100', 'scale-90');
    }
  };
  useClickOutside(avatarDropdownWrapperRef, () => {
    if (!avatarDropdownRef.current?.classList.contains('invisible')) {
      showAvatarDropdown();
    }
  });

  return (
    <div className="navbar flex justify-between items-center px-12 py-4 bg-white border-b border-gray-300 z-50 shadow-sm">
      {/* ***************************LEFT NAV BAR******************************* */}
      <div className="flex gap-4 items-center cursor-pointer">
        <img alt="logo" src={logo} className="object-contain w-full h-10" />
        <h1 className="font-semibold text-xl text-gray-700">CodeSeer</h1>
      </div>
      {/* ****************************SEARCH BOX************************************** */}
      <div className="rounded-md relative flex gap-3 bg-white px-4 py-2 w-96 border-2 border-slate-200">
        <SearchIcon className="text-gray-500" />
        <input
          type="text"
          className="w-full focus:border-none focus:outline-none text-primary_text"
        />
      </div>
      {/* *******************************RIGHT NAV BAR**************************************** */}
      <div className="flex items-center gap-6">
        <BellFillIcon className="text-slate-500 cursor-pointer hover:scale-110 transition duration-200" />
        <div className="codebase-plus-icon relative cursor-pointer ">
          <PlusIcon className=" text-slate-500 rounded-full w-full h-full" />
          <div className="codebase-plus-dropdown absolute right-0 w-fit whitespace-nowrap flex flex-col gap-1 rounded-md bg-white drop-shadow-xl scale-95 opacity-0 invisible transition duration-200 text-gray-700 text-sm z-20">
            <a
              href="/home/create-organization"
              className="px-3 py-2 hover:bg-slate-300 rounded-tr-md rounded-tl-md"
            >
              Create Organization
            </a>
            <a
              href="/create-domain"
              className="px-3 py-2 hover:bg-slate-300 rounded-br-md rounded-bl-md"
            >
              Create Domain
            </a>
          </div>
        </div>
        <div ref={avatarDropdownWrapperRef} className="relative">
          <div className="rounded-full w-8 h-8 overflow-hidden">
            <img
              alt="avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9S87a1sDDtCCyyU5oLkwQs66C1uby47uqlg&usqp=CAU"
              className="codebase_avatar_img w-full h-full object-cover cursor-pointer"
              onClick={showAvatarDropdown}
            />
          </div>
          <ul
            ref={avatarDropdownRef}
            className={`codebase_avatar_dropdown min-w-[240px] flex flex-col gap-1  absolute top-full right-0 mt-2 bg-white whitespace-nowrap text-gray-700 rounded-md overflow-hidden invisible opacity-0 scale-90 transition duration-200 origin-top-right shadow-2xl`}
          >
            <li className="pl-3 pr-6 py-2 cursor-pointer hover:bg-slate-300 flex flex-col">
              <h1 className="font-semibold">Neyterym</h1>
              <span className="text-gray-500">@neyterym299</span>
            </li>
            {/* ****Divider**** */}
            <li className="h-[1px] bg-slate-400"></li>
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
            <li className="h-[1px] bg-slate-400"></li>
            <li className="pl-3 pr-6 py-2 cursor-pointer hover:bg-slate-300">
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
