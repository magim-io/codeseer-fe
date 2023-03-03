import React from "react";

import github from "../../assets/images/avatar.png";

import "./style.scss";

function Login() {
  return (
    <div className=" w-full h-screen relative">
      <div className="login__wrapper absolute top-0 right-0 left-0 bottom-0 blur-sm" />
      <div className=" bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl flex flex-col overflow-hidden">
        <div className="flex flex-col gap-4 py-7 px-8 items-center text-center">
          <h1 className="text-3xl font-semibold">Welcome to CodeSeer</h1>
          <img
            alt="github"
            src={github}
            className="w-20 h-20 object-cover rounded-full overflow-hidden"
          />
          <a
            href="/home"
            className="px-8 py-2 text-base border border-black rounded-full cursor-pointer"
          >
            Login with Github
          </a>
        </div>
        <div className="w-full h-[1px] bg-gray-500 my-2" />
        <div className="flex flex-col gap-1 py-7 px-8 items-center text-center text-sm">
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
