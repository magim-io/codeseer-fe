import React from "react";

import { Sidebar } from "../../components";

function Organization() {
  return (
    <div className="w-full flex h-full">
      <Sidebar />
      <div className="flex-grow flex">Organization</div>
    </div>
  );
}

export default Organization;
