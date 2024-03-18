import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/redux/auth/useAuth";
import { getRoleGroup } from "../utils/constants/formatStringName";
const LayoutDefault = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const nhomQuyen = getRoleGroup(auth);
  const handleChangeLink = (e) => {
    navigate(e.value);
  };
  return (
    <div className=" bg-white rounded-sm bg-login">
      <Header />
      <main className=" relative max-w-[1200px] m-auto px-3 py-3 mt-3 rounded-lg border-x border-x-slate-400 shadow-3xl">
        {children}

        <Outlet />
      </main>
      {nhomQuyen?.includes(21) && (
        <div
          onClick={() => {
            navigate("/admin/default", { replace: true });
            window.location.reload();
          }}
          className=" fixed left-1 top-[50%] bg-yellow-400 px-3 py-2 text-white text-xl shadow-lg border border-white rounded-r-lg hover:bg-yellow-600 cursor-pointer xl:block lg:block md:hidden sm:hidden"
        >
          <FontAwesomeIcon icon={faScrewdriverWrench} className=" mr-2" />
          Trang quản trị
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default LayoutDefault;
