import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Card from "../../../components/Card";
import { BsCloudCheck } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faNewspaper,
  faShareFromSquare,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_STOCK;
dayjs.extend(relativeTime);
const YourPost = ({ dataPost }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${DOMAIN}/post/delete/${id}`);
      console.log("response", response);
      toast.success("Xóa bài viết đã lưu thành công");
    } catch (error) {
      toast.error("Lỗi máy chủ");
    }
  };
  return (
    <Card extra={"w-full h-full p-4"}>
      <h1 className=" text-navy-700 dark:text-yellow-400 text-2xl mb-2">
        Bài viết đã đăng
        <FontAwesomeIcon icon={faNewspaper} className="ml-1" />
      </h1>
      <div className=" grid grid-cols-2 gap-5">
        {dataPost && dataPost.length > 0 ? (
          dataPost.map((item) => (
            <div
              key={item.post_id}
              className="grid grid-cols-4 relative p-2 w-full bg-navy-600 dark:bg-slate-50 dark:text-black text-white border dark:border-navy-900 border-navy-700 rounded-md group/item"
            >
              <img
                src={item.image}
                className=" w-[100px] h-[100px] object-cover"
                alt=""
              />
              <div className=" col-span-3">
                <h2 className="text-left text-xl truncate">{item.title}</h2>
                <p
                  className="truncate line-clamp-2 w-full"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></p>
                <div className=" flex items-center justify-around">
                  <span className=" flex flex-col">
                    <p className="text-yellow-500">{t("Lượt thích")}</p>
                    <span className=" flex items-center justify-center text-lg">
                      <b>{item.like}</b>
                      <FontAwesomeIcon className="ml-1" icon={faThumbsUp} />
                    </span>
                  </span>
                  <span className=" flex flex-col">
                    <p className="text-yellow-500">{t("Bình luận")}</p>
                    <span className=" flex items-center justify-center text-lg">
                      <b>{item.comments.length}</b>
                      <FontAwesomeIcon className="ml-1" icon={faComment} />
                    </span>
                  </span>
                  <span className=" flex flex-col">
                    <p className="text-yellow-500 text-center">
                      {t("Thời gian")}
                    </p>
                    <span className=" flex items-center justify-center text-lg">
                      {t(dayjs(item.created_at).fromNow())}
                    </span>
                  </span>
                </div>
              </div>
              <div className="h-full w-full hidden bg-slate-500 absolute top-0 group-hover/item:flex group-hover/item:bg-opacity-80 flex-col rounded-md items-center justify-center transition-all">
                <button
                  onClick={() => {
                    deletePost(item.post_id);
                  }}
                  className="px-3 py-2 bg-red-500 rounded-2xl mb-2 hover:bg-red-700"
                >
                  Xóa
                  <FontAwesomeIcon icon={faTrashAlt} className="ml-1" />
                </button>
                <button
                  onClick={() => {
                    navigate(`/chi-tiet-bai-viet/${item.post_id}`);
                  }}
                  className="px-3 py-2 bg-blue-500 rounded-2xl hover:bg-blue-700 dark:hover:bg-blue-700"
                >
                  Chi tiết
                </button>
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

export default YourPost;
