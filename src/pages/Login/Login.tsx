import React from "react";

import github from "../../assets/images/login_github_logo.png";
import bg from "../../assets/images/welcome-bg.jpg";

import "./style.scss";

function Login() {
  return (
    <div className=" w-full h-screen relative">
      <img
        alt="background"
        src={bg}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className=" bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] rounded-2xl flex flex-col overflow-hidden">
        <div className="flex flex-col gap-4 py-7 px-8 items-center text-center">
          <h1 className="text-[44px] font-medium">Welcome to CodeSeer</h1>
          <img
            alt="github"
            src={github}
            className="w-32 h-w-32 object-cover rounded-full overflow-hidden"
          />
          <a
            href="https://github.com/login/oauth/authorize?client_id=6fceac8e04ce38d752ed&scope=user:email"
            className="px-16 py-3 border-2 font-semibold text-lg border-drark_blue rounded-full cursor-pointer hover:bg-drark_blue hover:text-white transition-all duration-200"
            type="button"
          >
            Login with Github
          </a>
        </div>
        <div className="w-full h-[1px] bg-gray-500 my-2" />
        <div className="flex flex-col items-center  gap-1 py-4 text-center text-sm">
          <p>Not yout? Log in with a different account</p>
          <p>
            Need an account?{" "}
            <a href="/login" className="underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
