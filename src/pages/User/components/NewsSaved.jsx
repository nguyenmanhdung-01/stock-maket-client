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
const DOMAIN = process.env.REACT_APP_STOCK;
const NewsSaved = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
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
        {data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className="flex p-2 bg-navy-600 dark:bg-slate-50 dark:text-black text-white border dark:border-navy-900 border-navy-700 rounded-md relative"
            >
              <div className=" absolute right-0 mr-3 text-lg">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => {
                    deleteNew(item);
                  }}
                />
              </div>
              <img
                src={item.image}
                className=" w-[100px] h-[100px] object-cover"
                alt=""
              />
              <div className=" ml-3 w-full">
                <h2 className="text-left text-xl truncate">{item?.title}</h2>
                <p className="truncate">{item?.subcontent}</p>
                <div className=" flex items-center justify-around">
                  <span className=" flex flex-col">
                    <p className="text-yellow-500">{t("Lượt xem")}</p>
                    <span className=" flex items-center justify-center ">
                      <b>2</b>
                      <FontAwesomeIcon className="ml-1" icon={faEye} />
                    </span>
                  </span>
                  <span className=" flex flex-col">
                    <p className="text-yellow-500">{t("Nguồn")}</p>
                    <span className=" flex items-center justify-center">
                      <b>abc.com</b>
                    </span>
                  </span>
                  <span className=" flex flex-col">
                    <p className="text-yellow-500">{t("Thời gian")}</p>
                    <span className=" flex items-center justify-center">
                      <b>ai đó đã tải lên</b>
                      <FontAwesomeIcon className="ml-1" icon={faCalendarDays} />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </Card>
  );
};

export default NewsSaved;
