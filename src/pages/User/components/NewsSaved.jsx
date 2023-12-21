import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEye,
  faNewspaper,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useAuth from "../../../hooks/redux/auth/useAuth";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { toast } from "react-toastify";
import { formatDay } from "../../../utils/constants/formatDay";
import { useNavigate } from "react-router-dom";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
const DOMAIN = process.env.REACT_APP_STOCK;
const NewsSaved = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { auth } = useAuth();
  const getData = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/users/getNews/${auth.userID.id}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteNew = async (news) => {
    try {
      const newsData = { newsId: news.news_id };
      const response = await axios.post(
        `${DOMAIN}/users/removedNews/${auth.userID.id}`,
        newsData
      );
      console.log("response", response);
      toast.success("Xóa bài viết đã lưu thành công");
      getData();
    } catch (error) {
      toast.error("Lỗi máy chủ");
    }
  };
  return (
    <Card extra={"w-full h-full p-4"}>
      <h1 className=" text-navy-700 dark:text-yellow-400 text-2xl mb-2">
        Tin tức đã lưu
        <FontAwesomeIcon icon={faNewspaper} className="ml-1" />
      </h1>
      <div className=" grid grid-cols-2 gap-5">
        {showAll ? (
          data.length > 0 ? (
            data.map((item, idx) => (
              <div
                key={idx}
                className=" grid grid-cols-4 relative border rounded-md group/item"
              >
                <div key={idx} className="flex p-2  relative">
                  <img
                    src={
                      item.image
                        ? item.image
                        : "/assets/images/default-image.avif"
                    }
                    className=" w-[100px] h-[100px] object-cover"
                    alt=""
                  />
                </div>
                <div className="w-full col-span-3 px-2 relative ">
                  <h2 className="text-left text-xl line-clamp-1">
                    {item?.title}
                  </h2>
                  <p className="truncate line-clamp-2">{item?.subcontent}</p>
                  <div className=" flex items-center justify-around">
                    <span className=" flex flex-col">
                      <p className="text-yellow-500 text-center">
                        {t("Lượt xem")}
                      </p>
                      <span className=" flex items-center justify-center ">
                        <b>{item?.view}</b>
                        <FontAwesomeIcon className="ml-1" icon={faEye} />
                      </span>
                    </span>
                    <span className=" flex flex-col">
                      <p className="text-yellow-500 text-center">
                        {t("Nguồn")}
                      </p>
                      <span className=" flex items-center justify-center">
                        <b>{item?.source}</b>
                      </span>
                    </span>
                    <span className=" flex flex-col">
                      <p className="text-yellow-500 text-center">
                        {t("Thời gian")}
                      </p>
                      <span className=" flex items-center justify-center">
                        <b>{formatDay(item.created_at)}</b>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="h-full w-full hidden bg-slate-300 absolute top-0 group-hover/item:flex group-hover/item:bg-opacity-80 flex-col rounded-md items-center justify-center transition-all">
                  <button
                    onClick={() => {
                      deleteNew(item);
                    }}
                    className="px-3 py-2 bg-red-500 rounded-2xl mb-2 hover:bg-red-700"
                  >
                    Xóa
                    <FontAwesomeIcon icon={faTrashAlt} className="ml-1" />
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/${item.slug}`);
                    }}
                    className="px-3 py-2 bg-blue-500 rounded-2xl hover:bg-blue-700 dark:hover:bg-blue-700"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className=" col-span-2">
              <EmptyState />
            </div>
          )
        ) : data.length > 0 ? (
          data.slice(0, 6).map((item, idx) => (
            <div
              key={idx}
              className=" grid grid-cols-4 relative border rounded-md group/item"
            >
              <div key={idx} className="flex p-2  relative">
                <img
                  src={
                    item.image
                      ? item.image
                      : "/assets/images/default-image.avif"
                  }
                  className=" w-[100px] h-[100px] object-cover"
                  alt=""
                />
              </div>
              <div className="w-full col-span-3 px-2 relative ">
                <h2 className="text-left text-xl line-clamp-1">
                  {item?.title}
                </h2>
                <p className="truncate line-clamp-2">{item?.subcontent}</p>
                <div className=" flex items-center justify-around">
                  <span className=" flex flex-col">
                    <p className="text-yellow-500 text-center">
                      {t("Lượt xem")}
                    </p>
                    <span className=" flex items-center justify-center ">
                      <b>{item?.view}</b>
                      <FontAwesomeIcon className="ml-1" icon={faEye} />
                    </span>
                  </span>
                  <span className=" flex flex-col">
                    <p className="text-yellow-500 text-center">{t("Nguồn")}</p>
                    <span className=" flex items-center justify-center">
                      <b>{item?.source}</b>
                    </span>
                  </span>
                  <span className=" flex flex-col">
                    <p className="text-yellow-500 text-center">
                      {t("Thời gian")}
                    </p>
                    <span className=" flex items-center justify-center">
                      <b>{formatDay(item.created_at)}</b>
                    </span>
                  </span>
                </div>
              </div>
              <div className="h-full w-full hidden bg-slate-300 absolute top-0 group-hover/item:flex group-hover/item:bg-opacity-80 flex-col rounded-md items-center justify-center transition-all">
                <button
                  onClick={() => {
                    deleteNew(item);
                  }}
                  className="px-3 py-2 bg-red-500 rounded-2xl mb-2 hover:bg-red-700"
                >
                  Xóa
                  <FontAwesomeIcon icon={faTrashAlt} className="ml-1" />
                </button>
                <button
                  onClick={() => {
                    navigate(`/${item.slug}`);
                  }}
                  className="px-3 py-2 bg-blue-500 rounded-2xl hover:bg-blue-700 dark:hover:bg-blue-700"
                >
                  Chi tiết
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className=" col-span-2">
            <EmptyState />
          </div>
        )}

        {data.length > 6 && (
          <div className=" mt-2 text-center col-span-2">
            <button
              className=" px-3 py-2 hover:bg-gray-500 rounded-lg hover:bg-opacity-80"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NewsSaved;
