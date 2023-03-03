import React from "react";

import github from "../../assets/images/github.png";
import linkedin from "../../assets/images/linkedin.png";
import twitter from "../../assets/images/twitter.png";

function Footer() {
  return (
    <div className="w-full bg-md_blue pt-6 pb-8 flex flex-col items-center justify-center gap-5">
      <h1 className="font-bold text-2xl text-white">CodeSeer</h1>
      <ul className="flex gap-10">
        <li className="text-white  ">About</li>
        <li className="text-white  ">Contact</li>
        <li className="text-white  ">Term of services</li>
        <li className="text-white  ">Privacy policy</li>
      </ul>
      <div className="flex gap-4">
        <span className="w-9 overflow-hidden">
          <img alt="Twitter" src={twitter} className="w-full h-auto" />
        </span>
        <span className="w-9 overflow-hidden">
          <img alt="Github" src={github} className="w-full h-auto" />
        </span>
        <span className="w-9 overflow-hidden">
          <img alt="Github" src={linkedin} className="w-full h-auto" />
        </span>
      </div>
      <p className="text-white ">
        Copyright @ 2023 CodeSeer. All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
