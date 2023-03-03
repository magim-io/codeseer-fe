import React from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutedComponent } from "./components";
import { Codebase, Home, Login, Organization, Welcome } from "./pages";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="home"
          element={<LayoutedComponent component={<Home />} />}
        />
        <Route
          path="codebase"
          element={<LayoutedComponent component={<Codebase />} />}
        />
        <Route
          path="organization"
          element={<LayoutedComponent component={<Organization />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
