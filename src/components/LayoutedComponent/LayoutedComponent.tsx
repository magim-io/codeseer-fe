import React from "react";

import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function LayoutedComponent({ component }: any) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow ">{component}</div>
      <Footer />
    </div>
  );
}

export default LayoutedComponent;
