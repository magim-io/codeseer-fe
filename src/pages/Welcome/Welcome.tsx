import React from "react";
import { useNavigate } from "react-router-dom";

import banner from "../../assets/images/bg-banner.png";
import logo from "../../assets/images/codeseer_logo.png";

import "./style.scss";

function Welcome() {
  const navigate = useNavigate();

  const navigateLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="welcome__wrapper w-full h-screen flex items-center justify-center">
      <div className="max-w-[1200px] flex flex-col bg-white rounded-2xl px-14 py-8">
        <div className="w-full  flex justify-between items-center">
          <img alt="codeseer" src={logo} className="w-16 h-16 object-contain" />
          <div className="flex gap-4 text-lg font-semibold text-primary_text">
            <span className="cursor-pointer hover:bg-drark_blue hover:text-white px-4 py-1 rounded-full">
              Home
            </span>
            <span className="cursor-pointer hover:bg-drark_blue hover:text-white px-4 py-1 rounded-full">
              Features
            </span>
            <span className="cursor-pointer hover:bg-drark_blue hover:text-white px-4 py-1 rounded-full">
              Team
            </span>
            <span className="cursor-pointer hover:bg-drark_blue hover:text-white px-4 py-1 rounded-full">
              Pricing
            </span>
            <span className="cursor-pointer hover:bg-drark_blue hover:text-white px-4 py-1 rounded-full">
              Contact
            </span>
          </div>
          <button
            type="button"
            className="px-6 py-1 flex items-center rounded-2xl text-lg text-white font-semibold bg-drark_blue bg-opacity-80 hover:bg-opacity-95"
            onClick={navigateLoginPage}
          >
            Sign In
          </button>
        </div>
        <div className="w-full flex gap-14 justify-between py-10">
          <div className="flex flex-col gap-6 mt-9 min-w-fit">
            <h2 className="text-dark_blue_4 text-lg">
              Codebase Visualize Website
            </h2>
            <p className="text-5xl flex flex-col">
              <span>Read code easier,</span> Ship code faster
            </p>
            <p className="w-80 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut.
            </p>
            <button
              type="button"
              className="w-fit px-6 py-1 rounded-lg bg-drark_blue text-white drop-shadow-2xl"
              onClick={navigateLoginPage}
            >
              Get started
            </button>
          </div>
          <img alt="banner" src={banner} />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
