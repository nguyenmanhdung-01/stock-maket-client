import React, { useEffect, useState } from "react";

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
  faBars,
  faBell,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/redux/auth/useAuth";
import localStorageUtils, { KeyStorage } from "../utils/local-storage";
import Notification from "./Notifications";
import axios from "axios";
import Sidebar from "./Sidebar/Sidebar";

const DOMAIN = process.env.REACT_APP_STOCK;
const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dropdownRef = React.useRef(null);
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  // console.log("auth1", auth);

  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.closeDropdown();
    }
  };

  const handleLogout = () => {
    localStorageUtils.remove(KeyStorage.AUTH);
    localStorage.removeItem("selectedTab");
    window.location.href = "/";
  };

  const getDataNotifications = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/notification/`);
      const notifications = response.data.filter(
        (notification) =>
          notification.recipientId === auth.userID?.id.toString()
      );
      setNotifications(notifications);
    } catch (error) {
      console.log(error.message);
    }
  };

  const unwatchedNotifications = notifications.filter(
    (notification) => notification.watched === false
  );

  useEffect(() => {
    getDataNotifications();
  }, []);
  return (
    <div className="sticky top-0 z-[2000]">
      <div className="w-full flex items-center justify-end bg-navy-700 py-1 px-32 xl:px-32 lg:px-32 md:px-10 sm:px-8 border-b border-blue-400 dark:border-b-white drop-shadow-xl">
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
                className="px-3 py-1 rounded-3xl hover:bg-slate-200 hover:text-black cursor-pointer mr-2"
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
                        ? auth?.userID.Avatar
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
                classNames={"py-2 top-5 right-0 drop-shadow-3xl w-max"}
              />

              <Dropdown
                button={
                  <>
                    <FontAwesomeIcon
                      icon={faBell}
                      className="text-2xl ml-4 cursor-pointer"
                    />
                    {unwatchedNotifications.length > 0 ? (
                      <>
                        <span className="animate-ping  absolute right-0 inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                        <span className="absolute right-0 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </>
                    ) : null}
                  </>
                }
                ref={dropdownRef}
                animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                children={
                  <Notification
                    closeDropDown={closeDropdown}
                    refreshData={getDataNotifications}
                  />
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
      <div className=" bg-white dark:bg-slate-800 dark:hover:text-black w-full flex items-center justify-around px-32 xl:flex lg:flex md:hidden sm:hidden">
        <Navbar />
        <Search />
      </div>
      <div className="xl:hidden lg:hidden md:block sm:block bg-white dark:bg-slate-800 px-5 py-2 leading-none">
        {open ? (
          <FontAwesomeIcon
            icon={faXmark}
            className="text-xl transition-all"
            onClick={() => setOpen(false)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="text-xl transition-all"
            onClick={() => setOpen(true)}
          />
        )}
        <Sidebar open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Header;
