import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LayoutLogin = ({ children }) => {
  return (
    <div className="bg-login h-[100vh]">
      <main>{children}</main>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default LayoutLogin;
