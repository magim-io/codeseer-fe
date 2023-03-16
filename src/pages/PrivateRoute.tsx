import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoute() {
  const accessToken = Cookies.get("mgt");

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
