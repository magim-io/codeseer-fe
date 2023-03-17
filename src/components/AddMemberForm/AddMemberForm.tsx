/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { toast } from "react-toastify";

import { CloseIcon } from "../../Icons";
import OrganizationService from "../../services/organization.service";

function AddMemberForm({ setIsShown, orgId }: any) {
  const closeModal = () => {
    setIsShown(false);
  };

  const handleAddMember = async (event: any) => {
    event.preventDefault();
    console.log(orgId);
    try {
      const res = await OrganizationService.inviteMemberToOrganization({
        memberEmail: "johndoe@gmail.com",
        organizationId: orgId,
      });
      if (res.data.success) {
        toast.success("Add member succeed!");
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="fixed inset-0  flex justify-center items-center z-20">
      <div
        className="backdrop-brightness-75 backdrop-blur-sm fixed inset-0  py-5"
        onClick={closeModal}
      />
      <form
        onSubmit={handleAddMember}
        className="w-[600px] h-fit flex flex-col -my-20 bg-white rounded-xl z-40 "
      >
        <div className=" p-6 border-b border-md_blue flex justify-between">
          <h1 className="text-md_blue text-3xl font-semibold">Add Member</h1>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>
        <div className="w-full flex flex-col gap-5 px-6 pt-4 pb-8 h-fit overflow-y-auto">
          <div className=" flex flex-col gap-3">
            <label htmlFor="member_email" className="text-lg font-medium">
              Email
            </label>
            <input
              id="member_email"
              name="memberEmail"
              type="email"
              className="py-4 px-7 border border-gray-400 rounded-md placeholder:text-gray-500"
              placeholder="ngkien299@gmail.com,..."
              required
            />
          </div>
        </div>
        <div className="p-6 border-t border-md_blue w-full flex justify-end">
          <button
            type="submit"
            className="bg-md_blue text-white font-semibold px-6 py-2 rounded-md"
          >
            Invite
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddMemberForm;
