/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactQuill from "react-quill";

import { ChevronDown, CloseIcon } from "../../Icons";
import OrganizationService from "../../services/organization.service";

import "./style.scss";

function CreateOrganization({ setIsShown }: any) {
  const labelDropdown = useRef<HTMLUListElement>(null);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [value, setValue] = useState("");

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

  const selectLabelItem = (label: string) => {
    setSelectedLabel(label);
    openLabelDropdown();
  };

  const handleCreateOrg = async (event: any) => {
    event.preventDefault();
    const { organizationName, organizationLogin } = event.target;

    try {
      const res = await OrganizationService.createNewOrganization({
        login: organizationLogin.value as string,
        name: organizationName.value,
        description: value,
      });

      if (res.data.success) {
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="fixed inset-0  py-14  flex justify-center z-20">
      <div
        className="backdrop-brightness-75 backdrop-blur-sm fixed inset-0  py-5"
        onClick={closeModal}
      />
      <form
        onSubmit={handleCreateOrg}
        className="w-[600px] h-fit overflow-y-auto  flex flex-col bg-white rounded-xl z-40 "
      >
        <div className=" p-6 border-b border-md_blue flex justify-between">
          <h1 className="text-md_blue text-3xl font-semibold">
            Create Organization
          </h1>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>
        <div className="w-full h-full flex flex-col gap-5 px-6 pt-4 pb-8">
          <div className=" flex flex-col gap-3">
            <label htmlFor="organization_name" className="text-lg font-medium">
              Organization Name
            </label>
            <input
              id="organization_name"
              name="organizationName"
              type="text"
              className="py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500"
              placeholder="Meta, Google, Azure,..."
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="organization_login" className="text-lg font-medium">
              Login
            </label>
            <input
              id="organization_login"
              name="organizationLogin"
              type="text"
              className="py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500"
              placeholder="Meta, Google, Azure,..."
              required
            />
          </div>
          <div className="flex flex-col gap-3 relative">
            <label htmlFor="organization_login" className="text-lg font-medium">
              Label
            </label>
            <button
              type="button"
              className="relative w-full"
              onClick={openLabelDropdown}
            >
              <div className="flex items-center justify-between py-4 px-7 border border-gray-400 rounded-md text-gray-500">
                <span>
                  {selectedLabel !== ""
                    ? selectedLabel
                    : "Type of Organization"}
                </span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            <ul
              ref={labelDropdown}
              className="create-organization-label__dropdown absolute top-full z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in duration-100 opacity-0 invisible"
              role="listbox"
            >
              <li
                className="py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white"
                role="option"
                aria-selected
                onClick={() => selectLabelItem("Onboarding")}
              >
                Onboarding
              </li>
              <li
                className="py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white"
                role="option"
                aria-selected
                onClick={() => selectLabelItem("Maintenace")}
              >
                Maintenace
              </li>
              <li
                className="py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white"
                role="option"
                aria-selected
                onClick={() => selectLabelItem("Migrating")}
              >
                Migrating
              </li>
              <li
                className="py-4 px-6 cursor-pointer hover:bg-primary_blue hover:text-white"
                role="option"
                aria-selected
                onClick={() => selectLabelItem("Continuous")}
              >
                Continuous
              </li>
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

export default CreateOrganization;
