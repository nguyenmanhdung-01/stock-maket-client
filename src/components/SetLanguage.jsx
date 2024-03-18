import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
const SetLanguage = () => {
  const { t, i18n } = useTranslation();
  const dropdownRef = React.useRef(null);

  const changeLanguage = (lng) => {
    // console.log("Changing language", lng);
    i18n.changeLanguage(lng);
    dayjs.locale(lng);
    closeDropdown();
  };

  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.closeDropdown();
    }
  };
  return (
    <div className="">
      <Dropdown
        button={
          <p className="cursor-pointer text-xl">
            <FontAwesomeIcon icon={faGlobe} className=" text-white" />
          </p>
        }
        ref={dropdownRef}
        animation=" transition-all duration-300 ease-in-out"
        children={
          <div className="flex flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-navy-700 dark:text-white">
                {t("Ngôn ngữ")}
              </p>
            </div>

            <button
              className="flex w-full items-center hover:opacity-80"
              onClick={() => changeLanguage("vi")}
            >
              <div className=" w-[40px] rounded-xl bg-gradient-to-b p-1 text-2xl text-white">
                <img src="/assets/images/vietnam.webp" alt="" />
              </div>
              <span>{t("Tiếng Việt")}</span>
            </button>

            <button
              className="flex w-full items-center hover:opacity-80"
              onClick={() => changeLanguage("en")}
            >
              <div className="w-[40px] rounded-xl bg-gradient-to-b p-1 text-2xl text-white">
                <img src="/assets/images/la-co-anh.jpg" alt="" />
              </div>
              <span>{t("Tiếng Anh")}</span>
            </button>
          </div>
        }
        classNames={"py-2 top-4 drop-shadow-3xl w-max right-0"}
      />
    </div>
  );
};

export default SetLanguage;
