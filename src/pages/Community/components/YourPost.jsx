import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import useAuth from "../../../hooks/redux/auth/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import CommentList from "./CommentList";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../components/Card";
import RightBar from "../../../components/RightBar/RightBar";
import EmptyState from "../../../components/EmptyState/EmptyState";

const DOMAIN = process.env.REACT_APP_STOCK;
dayjs.extend(relativeTime);

const YourPost = () => {
  const { t } = useTranslation();

  const { auth } = useAuth();
  const [dataPost, setDataPost] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  const inputRef = useRef(null);
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getPostByUser = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/post/${auth.userID.id}/posts`
      );
      // console.log("response", response);
      const posts = response.data;

      // Tính tổng số lượt thích cho từng bài viết
      const postsWithLikes = posts.map((post) => {
        const totalLikes = post.like || 0;
        const currentUserLiked = post.likedUsers?.some(
          (userId) => userId === auth.userID.id
        ); // Lượt thích của bài viết, nếu không có sẽ là 0
        return { ...post, like: totalLikes, userLiked: currentUserLiked }; // Thêm trường totalLikes vào object post
      });
      console.log("postsWithLikes0", postsWithLikes);
      setDataPost(postsWithLikes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostByUser();
  }, []);

  const handleLike = async (id) => {
    try {
      // Gửi request lên server để thực hiện like
      const response = await axios.put(`${DOMAIN}/post/${id}/like`, {
        userId: auth.userID.id,
      });
      const updatedPost = response.data;
      console.log("updated post", updatedPost);
      // Cập nhật lại tổng số lượt thích của bài viết từ response từ server
      getPostByUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <h1 className=" text-3xl pl-2 pt-2">Bài viết của bạn</h1>
      <div className=" grid grid-cols-3 gap-5 px-2 my-3">
        <div className=" col-span-2 rounded-lg px-3">
          {dataPost && dataPost.length > 0 ? (
            dataPost.map((item) => (
              <div key={item.post_id}>
                <div className=" flex items-center">
                  <div className=" max-w-[40px] max-h-[40px] mr-2">
                    <img
                      src={
                        item.user
                          ? item.user.Avatar
                          : "/assets/images/img_user.png"
                      }
                      alt=""
                      className=" rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className=" font-semibold text-lg">
                      {item.user?.HoVaTen}
                    </h3>
                    <span>{t(dayjs(item.created_at).fromNow())}</span>
                  </div>
                </div>
                <div>
                  <div
                    className={` mt-2 px-2 ${
                      visible === false ? "line-clamp-4" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: item.content ? item.content : "",
                    }}
                  ></div>
                  {visible === false ? (
                    <span
                      className=" hover:text-slate-500 px-2 cursor-pointer"
                      onClick={() => setVisible(true)}
                    >
                      <b>Thêm</b>
                    </span>
                  ) : (
                    <span
                      className=" hover:text-slate-500 px-2 cursor-pointer"
                      onClick={() => setVisible(false)}
                    >
                      <b>Ẩn</b>
                    </span>
                  )}

                  <div className=" border">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="my-2">
                    <div className=" flex items-center justify-between">
                      <span>
                        {item.like || 0} {t("thích")}
                      </span>
                      <span>
                        {item.comments !== null ? item.comments?.length : 0}{" "}
                        {t("bình luận")}
                      </span>
                    </div>
                    <div className="py-1 flex items-center justify-between px-2 border-y border-y-gray-600">
                      <button
                        onClick={() => handleLike(item.post_id)}
                        className={`flex items-center text-lg px-4 hover:bg-slate-200 rounded-md py-1 ${
                          item.userLiked ? "text-blue-500" : ""
                        }`}
                      >
                        <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                        <span>
                          {item.userLiked ? t("Đã thích") : t("Thích")}
                        </span>
                      </button>
                      <button
                        onClick={toggleFormVisibility}
                        className=" flex items-center text-lg px-4 hover:bg-slate-200 rounded-md py-1"
                      >
                        <FontAwesomeIcon icon={faComment} className="mr-1" />
                        <span>{t("Bình luận")}</span>
                      </button>
                      <button className=" flex items-center text-lg px-4 hover:bg-slate-200 rounded-md py-1">
                        <FontAwesomeIcon icon={faShare} className="mr-1" />
                        <span>{t("Chia sẻ")}</span>
                      </button>
                    </div>
                  </div>
                </div>
                {isFormVisible && (
                  <CommentList
                    inputRef={inputRef}
                    data={item.comments}
                    post={item}
                    fetchData={getPostByUser}
                  />
                )}
              </div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
        <RightBar />
      </div>
    </Card>
  );
};

export default YourPost;
