import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";

import App from "./App";

// eslint-disable-next-line import/no-extraneous-dependencies
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "reactflow/dist/style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </BrowserRouter>
);
