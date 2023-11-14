import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  faHouseChimney,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
const DOMAIN = process.env.REACT_APP_STOCK;
const Navbar = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);
  const [newsCategory, setNewsCategory] = useState([]);
  const [selectedTab, setSelectedTab] = useState("home");
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const fetchData = async () => {
    try {
      const sheet = page ? page : 1;
      const category = await axios.get(
        `${DOMAIN}/newscategory/getAllNewsCategory?page=${sheet}`,
        {
          withCredentials: true,
        }
      );
      console.log("category", category);
      const group = groupCategoryByFatherId(category.data.newsCategories);

      setArr(group);
      setNewsCategory(category.data.newsCategories);
      // setCount(category.data.countCategory);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const groupCategoryByFatherId = (categories) => {
    const categoryMap = {};
    const topLevelcategories = [];

    // Tạo một map để ánh xạ các comment theo id
    for (const category of categories) {
      const categoryId = category.news_category_id;

      if (!categoryMap[categoryId]) {
        categoryMap[categoryId] = {
          ...categoryMap,
          children: [],
        };
      }

      const mappedComment = categoryMap[categoryId];

      // Kiểm tra nếu có father_id, thêm comment hiện tại vào danh sách con của cha tương ứng
      if (category.father_id) {
        if (!categoryMap[category.father_id]) {
          categoryMap[category.father_id] = {
            children: [],
          };
        }

        categoryMap[category.father_id].children.push(mappedComment);
      } else {
        topLevelcategories.push(mappedComment);
      }

      // Kiểm tra nếu comment hiện tại đã có con trong map, thì gán danh sách con của nó vào comment hiện tại
      if (categoryMap[categoryId].children.length > 0) {
        mappedComment.children = categoryMap[categoryId].children;
      }
    }

    return topLevelcategories;
  };

  const handleClick = (item) => {
    console.log("item", item);
    navigate(`/news/${item.slug}`, { state: { item } });
  };

  return (
    <div className="flex items-center ml-3 dark:text-white py-2">
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
        className={`px-3 rounded-3xl hover:bg-slate-200 group/item mr-1 ${
          selectedTab === "news" ? "bg-slate-200 text-black" : ""
        }`}
        onClick={() => {
          handleTabClick("news");
          navigate(`/news`);
        }}
      >
        <FontAwesomeIcon icon={faNewspaper} flip className="mr-1" />

        {t("Tin tức")}
        <ul className=" bg-navy-600 w-[200px] drop-shadow-2xl absolute hidden text-white group-hover/item:block transition duration-350 ease-in-out">
          {/* <li className=" cursor-pointer truncate block py-[6px] pl-[8px] font-light hover:bg-yellow-300 hover:text-black  hover:font-bold transition duration-0 hover:duration-150 ease-in-out">
            Tin chứng khoán
          </li> */}
          {newsCategory &&
            newsCategory.map((item, idx) => {
              return (
                <li
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(item);
                  }}
                  className=" cursor-pointer truncate block py-[6px] pl-[8px] font-light hover:bg-yellow-300 hover:text-black  hover:font-bold transition duration-0 hover:duration-150 ease-in-out"
                >
                  {item.name}
                </li>
              );
            })}
        </ul>
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
