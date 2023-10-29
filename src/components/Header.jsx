import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Switcher from "../Switcher";
import SetLanguage from "./SetLanguage";
import Search from "./Search/Search";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState("dark");
  const handleModeChange = (newMode) => {
    // console.log("Chế độ mới:", newMode);
    setMode(newMode);
    const elementsToChange = document.querySelectorAll(".dark");

    // Duyệt qua danh sách các phần tử và cập nhật thuộc tính CSS
    elementsToChange.forEach((element) => {
      if (newMode === "light") {
        element.style.backgroundColor = "#ffffff";
        element.style.color = "#000000";
      } else {
        element.style.backgroundColor = "#000000";
        element.style.color = "#ffffff";
      }
    });
  };
  return (
    <div className="sticky top-0 z-[2000]">
      <div className="bg-white dark:bg-slate-800 dark:hover:text-black  w-full flex items-center justify-between py-3 px-32 border-b border-blue-400 dark:border-b-white drop-shadow-xl">
        <div className="inline-flex items-center ">
          <div className=" max-w-[80px] min-w-[80px] rounded-lg overflow-hidden">
            <img src="/assets/images/bg-stock.jpg" className="" alt="" />
          </div>
          {/* <span className=" dark:text-white">Stock</span>
          <span className=" dark:text-yellow-500">Maket</span> */}
          <Search />
          <Navbar />
        </div>
        <div className="flex items-center dark:text-white">
          <span
            className="px-3 py-1 rounded-3xl hover:bg-slate-200"
            onClick={() => navigate("/login-page")}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-right-to-bracket"
              className="mr-1"
              flip
            />
            {t("Đăng nhập")}
          </span>
          <span>
            <img
              src="/assets/images/img_user.png"
              alt=""
              className="bg-white max-w-[28px] max-h-[28px] p-1 rounded-full"
            />
          </span>
        </div>
        <Switcher />
        <SetLanguage />
      </div>
    </div>
  );
};

export default Header;
