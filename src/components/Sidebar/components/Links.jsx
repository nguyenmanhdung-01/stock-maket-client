/* eslint-disable */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/redux/auth/useAuth";
import { getNhomQuyen } from "../../../utils/constants/formatStringName";

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const nhomQuyen = getNhomQuyen(auth);

  // console.log("nhomQuyen", nhomQuyen);

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin"
        // route.layout === "/auth" ||
        // route.layout === "/rtl"
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className={`my-[5px] flex cursor-pointer items-center px-8 text-xl ${
                  route.hidden === true ? "hidden" : ""
                }`}
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : ""}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
