import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowBarUp } from "react-icons/bs";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import useAuth from "../../hooks/redux/auth/useAuth";
import Notification from "../Notifications/index";
import axios from "axios";

const DOMAIN = process.env.REACT_APP_STOCK;

const NavbarAdmin = (props) => {
  const dropdownRef = React.useRef(null);
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const getDataNotifications = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/notification/`);
      const notifications = response.data.filter(
        (notification) => notification.recipientId === auth.userID.id.toString()
      );
      setNotifications(notifications);
    } catch (error) {
      console.log(error.message);
    }
  };

  const unwatchedNotifications = notifications.filter(
    (notification) => notification.watched === false
  );

  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.closeDropdown();
    }
  };

  useEffect(() => {
    getDataNotifications();
  }, []);
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[200px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[200px] xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        {/* start Notification */}
        <Dropdown
          ref={dropdownRef}
          button={
            <>
              <IoMdNotificationsOutline className="h-6 w-6 text-gray-600 dark:text-white" />

              {unwatchedNotifications.length > 0 ? (
                <>
                  <span className="animate-ping  absolute right-0 inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                  <span className="absolute right-0 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </>
              ) : null}
            </>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <Notification
              closeDropDown={closeDropdown}
              refreshData={getDataNotifications}
            />
          }
          classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
        />
        {/* start Horizon PRO */}

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-6 w-6 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-6 w-6 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={
                auth.userID?.Avatar !== null
                  ? auth.userID?.Avatar
                  : "/assets/images/img_user.png"
              }
              alt="Ảnh đại diện"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Xin chào, {auth.userID.HoVaTen || "Người dùng"}
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <div
                  onClick={() => navigate("/admin/profile-manager")}
                  className="text-sm cursor-pointer text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </div>

                <a
                  href=" "
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default NavbarAdmin;
