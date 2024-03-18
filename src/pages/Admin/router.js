import React from "react";

import { MdHome, MdBarChart, MdPerson, MdLock } from "react-icons/md";
import MainDashboard from "./Views/MainDashboard/MainDashboard";
import UserManager from "./Views/UserManager/UserManager";
import ContactManager from "./Views/ContactManager/ContactManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faUsers,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import ProfileOverview from "./Views/profile";
import QL_PhanQuyen from "./Views/QL_PhanQuyen/QL_PhanQuyen";
import ContactManagerDetail from "./Views/ContactManager/ContactManagerDetail";
import CategoryManager from "./Views/CategoryManager/CategoryManager";
import NewsManager from "./Views/NewsManager/NewsManager";
import NewsDetail from "./Views/NewsManager/NewsDetail";
import useAuth from "../../hooks/redux/auth/useAuth";
import { getNhomQuyen } from "../../utils/constants/formatStringName";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

// const GenerateRoutes = () => {
//   const { auth } = useAuth();
//   const nhomQuyen = getNhomQuyen(auth);
//   const tenDangNhapAdmin = auth.userID?.TenDangNhap?.toLowerCase() === "admin";

//   function containsAny(arr, valuesToCheck) {
//     return valuesToCheck.some((value) => arr?.includes(value));
//   }
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
    name: "Quản lý danh mục",
    layout: "/admin",
    path: "categoryManager",
    icon: <FontAwesomeIcon icon={faBars} className="h-6 w-6" />,
    component: <CategoryManager />,
    secondary: true,
  },
  {
    name: "Quản lý tin tức",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "newsManager",
    component: <NewsManager />,
  },
  {
    name: "Chi tiết tin tức",
    layout: "/admin",
    path: "/newsDetail/:id",
    component: <NewsDetail />,
    hidden: true,
  },
  {
    name: "Quản lý liên hệ",
    layout: "/admin",
    path: "contactManager",
    icon: <FontAwesomeIcon icon={faAddressBook} className="h-6 w-6" />,
    // component:
    //   containsAny(nhomQuyen, [14, 15, 16]) || tenDangNhapAdmin ? (
    //     <ContactManager />
    //   ) : (
    //     <NotFoundPage />
    //   ),
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
    name: "Quản lý phân quyền",
    layout: "/admin",
    path: "phan-quyen",
    icon: <FontAwesomeIcon icon={faUsersGear} className="h-6 w-6" />,
    component: <QL_PhanQuyen />,
    quyen: ["admin"],
  },

  {
    name: "Chi tiết phản hồi",
    layout: "/admin",
    path: "/contactManager/:id",
    component: <ContactManagerDetail />,
    hidden: true,
  },

  {
    name: "Sign Out",
    layout: "/auth",
    path: "sign-out",
    icon: <MdLock className="h-6 w-6" />,
    //   component: <SignIn />,
  },
  {
    name: "",
    layout: "/admin",
    path: "/notFoundPage",
    component: <NotFoundPage />,
    hidden: true,
  },
];
//   return routes;
// };

export default routes;
