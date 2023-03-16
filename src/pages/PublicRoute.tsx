import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function PublicRoute() {
  const accessToken = Cookies.get("mgt");
  return !accessToken ? <Outlet /> : <Navigate to="/home" />;
}

export default PublicRoute;
