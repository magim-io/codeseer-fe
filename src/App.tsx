import React from "react";
import { Route, Routes } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from "react-toastify";

import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/PublicRoute";
import { LayoutedComponent } from "./components";
import { Codebase, Home, Login, Organization, Welcome } from "./pages";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Welcome />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/home"
            element={<LayoutedComponent component={<Home />} />}
          />
          <Route
            path="/explorer"
            element={<LayoutedComponent component={<Codebase />} />}
          />
          <Route
            path="/organization/:organizationId"
            element={<LayoutedComponent component={<Organization />} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
