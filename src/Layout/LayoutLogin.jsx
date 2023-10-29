import React from "react";
import { Outlet } from "react-router-dom";

const LayoutLogin = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <Outlet />
    </div>
  );
};

export default LayoutLogin;
