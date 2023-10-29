import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  faHouseChimney,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState("home");
  const navigate = useNavigate();
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="flex items-center ml-3 dark:text-white">
      <div
        className={`px-3 rounded-3xl hover:bg-slate-200 mr-1 ${
          selectedTab === "home" ? "bg-slate-200 text-black" : ""
        }`}
        onClick={() => {
          handleTabClick("home");
          navigate("");
        }}
      >
        <FontAwesomeIcon icon={faHouseChimney} flip className="mr-1" />
        {t("Trang chủ")}
      </div>
      <div
        className={`px-3 rounded-3xl hover:bg-slate-200 mr-1 ${
          selectedTab === "news" ? "bg-slate-200 text-black" : ""
        }`}
        onClick={() => handleTabClick("news")}
      >
        <FontAwesomeIcon icon={faNewspaper} flip className="mr-1" />

        {t("Tin tức")}
      </div>
      <div
        className={`px-3 rounded-3xl hover:bg-slate-200 mr-1 ${
          selectedTab === "community" ? "bg-slate-200 text-black" : ""
        }`}
        onClick={() => {
          handleTabClick("community");
          navigate(`/community`);
        }}
      >
        <FontAwesomeIcon icon={faUsers} flip className="mr-1" />
        {t("Cộng đồng")}
      </div>
      <div
        className={`px-3 rounded-3xl hover:bg-slate-200 mr-1 ${
          selectedTab === "contact" ? "bg-slate-200 text-black" : ""
        }`}
        onClick={() => {
          handleTabClick("contact");
          navigate("/contact");
        }}
      >
        {t("Liên hệ")}
      </div>
    </div>
  );
};

export default Navbar;
