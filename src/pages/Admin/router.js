import React from "react";

// Admin Imports

// import NFTMarketplace from "views/admin/marketplace";
// import Profile from "views/admin/profile";
// import DataTables from "views/admin/tables";
// // import RTLDefault from "views/rtl/default";

// // Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import MainDashboard from "./Views/MainDashboard/MainDashboard";
import UserManager from "./Views/UserManager/UserManager";
import PostManager from "./Views/PostManager/PostManager";
import ContactManager from "./Views/ContactManager/ContactManager";
import MainApp from "../Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import ProfileOverview from "./Views/profile";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Quản lý người dùng",
    layout: "/admin",
    path: "userManager",
    icon: <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />,
    component: <UserManager />,
    secondary: true,
  },
  {
    name: "Quản lý bài viết",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "postManager",
    component: <PostManager />,
  },
  {
    name: "Quản lý liên hệ",
    layout: "/admin",
    path: "contactManager",
    icon: <FontAwesomeIcon icon={faAddressBook} className="h-6 w-6" />,
    component: <ContactManager />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile-manager",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProfileOverview />,
  },

  {
    name: "Sign Out",
    layout: "/auth",
    path: "sign-out",
    icon: <MdLock className="h-6 w-6" />,
    //   component: <SignIn />,
  },
  //   {
  //     name: "Trang chủ",
  //     layout: "/",
  //     path: "/",
  //     icon: <MdHome className="h-6 w-6" />,
  //     component: <MainApp />,
  //   },
];
export default routes;
