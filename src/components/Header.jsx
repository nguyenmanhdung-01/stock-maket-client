import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Switcher from "../Switcher";
import SetLanguage from "./SetLanguage";
import Search from "./Search/Search";
import Navbar from "./Navbar/Navbar";
import Dropdown from "./Dropdown";
import {
  faArrowRightFromBracket,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/redux/auth/useAuth";
import { BsArrowBarUp } from "react-icons/bs";
import localStorageUtils, { KeyStorage } from "../utils/local-storage";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dropdownRef = React.useRef(null);
  const { auth } = useAuth();
  // console.log("auth1", auth);
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

  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.closeDropdown();
    }
  };

  const handleLogout = () => {
    localStorageUtils.remove(KeyStorage.AUTH);
    window.location.reload();
  };
  return (
    <div className="sticky top-0 z-[2000]">
      <div className="w-full flex items-center justify-end bg-navy-700 py-1 px-32 border-b border-blue-400 dark:border-b-white drop-shadow-xl">
        <div className="inline-flex items-center ">
          {/* <div className=" max-w-[80px] min-w-[80px] rounded-lg overflow-hidden">
            <img src="/assets/images/bg-stock.jpg" className="" alt="" />
          </div> */}
          {/* <span className=" dark:text-white">Stock</span>
          <span className=" dark:text-yellow-500">Maket</span> */}
        </div>
        <div className="flex items-center text-white mr-4">
          {auth.userID === undefined ? (
            <>
              <span
                className="px-3 py-1 rounded-3xl hover:bg-slate-200 hover:text-black mr-2"
                onClick={() => navigate("/login-page")}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-right-to-bracket"
                  className="mr-1"
                  flip
                />
                {t("Đăng nhập")}
              </span>
            </>
          ) : (
            <div className=" flex items-center">
              <Dropdown
                button={
                  <img
                    src={
                      auth?.userID.Avatar !== null
                        ? `/uploads/${auth?.userID.Avatar}`
                        : "/assets/images/img_user.png"
                    }
                    alt=""
                    className="bg-white w-[30px] h-[30px] border border-white rounded-full object-cover"
                  />
                }
                ref={dropdownRef}
                animation=" transition-all duration-300 ease-in-out"
                children={
                  <ul className=" bg-yellow-400 rounded-sm">
                    <li
                      className=" px-2 py-1 hover:text-blue-700 text-lg cursor-pointer"
                      onClick={() => {
                        navigate(`user-info/${auth?.userID.id}`);
                        closeDropdown();
                      }}
                    >
                      <span>Thông tin cá nhân</span>
                    </li>
                    <li className=" px-2 py-1 hover:text-blue-700 text-lg">
                      <button
                        className="flex items-center font-bold"
                        onClick={handleLogout}
                      >
                        <FontAwesomeIcon
                          icon={faArrowRightFromBracket}
                          className=" mr-2"
                        />
                        LogOut
                      </button>
                    </li>
                  </ul>
                }
                classNames={"py-2 top-5 left-[10px] drop-shadow-3xl w-max"}
              />

              <Dropdown
                button={
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-xl ml-4 cursor-pointer"
                  />
                }
                ref={dropdownRef}
                animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                children={
                  <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold text-navy-700 dark:text-white">
                        Notification
                      </p>
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        Mark all read
                      </p>
                    </div>

                    <button className="flex w-full items-center">
                      <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                        <BsArrowBarUp />
                      </div>
                      <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                        <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                          New Update: Horizon UI Dashboard PRO
                        </p>
                        <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                          A new update for your downloaded item is available!
                        </p>
                      </div>
                    </button>

                    <button className="flex w-full items-center">
                      <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                        <BsArrowBarUp />
                      </div>
                      <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                        <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                          New Update: Horizon UI Dashboard PRO
                        </p>
                        <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                          A new update for your downloaded item is available!
                        </p>
                      </div>
                    </button>
                  </div>
                }
                classNames={"py-2 top-5 z-auto right-0 drop-shadow-3xl w-max"}
              />
            </div>
          )}
        </div>
        <Switcher />
        <SetLanguage />
      </div>
      <div className="banner"></div>
      <div className=" bg-white dark:bg-slate-800 dark:hover:text-black w-full flex items-center justify-around px-32">
        <Navbar />
        <Search />
      </div>
    </div>
  );
};

export default Header;
