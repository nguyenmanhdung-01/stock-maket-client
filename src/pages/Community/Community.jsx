import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./Community.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  faNewspaper,
  faRss,
  faShare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import useAuth from "../../hooks/redux/auth/useAuth";
import InsertPost from "./components/InsertPost";
import Button from "../../components/Buttons/Button";
import ModalV1 from "../../components/Modal/ModalV1";
import axios from "axios";
import CommentList from "./components/CommentList";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
const DOMAIN = process.env.REACT_APP_STOCK;
dayjs.extend(relativeTime);
const Community = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [commentFormsVisibility, setCommentFormsVisibility] = useState({});
  const containerRef = useRef(null);
  // Giả sử bạn có một danh sách các người dùng đã like từ API
  const inputRef = useRef(null);
  const toggleFormVisibility = (postId) => {
    setCommentFormsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId],
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${DOMAIN}/post/all-new-posts`);
      // console.log("response", response);
      const posts = response.data;

      // Tính tổng số lượt thích cho từng bài viết
      const postsWithLikes = posts.map((post) => {
        const totalLikes = post.like || 0;
        const currentUserLiked = post.likedUsers.some(
          (userId) => userId === auth.userID.id
        ); // Lượt thích của bài viết, nếu không có sẽ là 0
        return { ...post, like: totalLikes, userLiked: currentUserLiked }; // Thêm trường totalLikes vào object post
      });

      // console.log("postsWithLikes", postsWithLikes);

      // Cập nhật dữ liệu đã được tính tổng số lượt thích
      setData(postsWithLikes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        // console.log("container", container);
        const bottom =
          container.scrollHeight - container.scrollTop <=
          container.clientHeight + 1;
        // console.log("cao", container.scrollHeight);
        // console.log("top", container.scrollTop);
        // console.log("cl cao", container.clientHeight);
        if (bottom && !loading && visiblePosts < data.length) {
          setLoading(true);
          setTimeout(() => {
            setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
            setLoading(false);
          }, 2000); // Thời gian giả định để tải thêm dữ liệu
        }
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, visiblePosts, data]);

  const handleLike = async (id) => {
    try {
      // Gửi request lên server để thực hiện like
      const response = await axios.put(`${DOMAIN}/post/${id}/like`, {
        userId: auth.userID.id,
      });
      const updatedPost = response.data;
      console.log("updated post", updatedPost);
      // Cập nhật lại tổng số lượt thích của bài viết từ response từ server
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" grid grid-cols-4 gap-3 relative bgr-white dark:text-white dark:bg-slate-800">
      <div className=" relative col-span-1">
        <div className=" sticky top-[245px] bg-white dark:bg-gray-800  text-lg shadow-lg p-3 border dark:border-gray-600 rounded-md">
          <div
            onClick={() => navigate("/community/bai-viet-cua-ban")}
            className="flex items-center my-1 p-2 hover:bg-slate-200 dark:hover:text-black rounded-sm"
          >
            <FontAwesomeIcon className="mr-1 " icon={faNewspaper} />
            <span>{t("Bài viết của bạn")}</span>
          </div>
        </div>
      </div>
      <div className=" col-span-2 p-2 shadow-xl rounded-md border dark:border-gray-600">
        {auth.userID !== undefined ? (
          <>
            <Button
              title={"Đăng bài viết"}
              onClick={() => {
                setOpen(true);
              }}
              className={"bg-blue-400 hover:bg-blue-600 text-center mb-3"}
            />
            <ModalV1
              open={open}
              setOpen={setOpen}
              title={"Thêm mới bài viết của bạn"}
            >
              <InsertPost />
            </ModalV1>
            <div
              className=" relative w-full max-h-[350px] overflow-y-auto"
              ref={containerRef}
            >
              {/* <div className=" flex items-center sticky z-[1000] top-[245px] bg-white dark:bg-gray-800 dark:border-white drop-shadow-lg py-2 rounded-b-md overflow-hidden">
                <span className=" mr-3 text-lg py-2 px-2 border-b-2 border-blue-300 hover:bg-slate-200 dark:hover:text-black">
                  {t("Mới nhất")}
                </span>
                <span className=" mr-3 text-lg py-2 px-2 border-b-2 border-blue-300 hover:bg-slate-200 dark:hover:text-black">
                  {t("Phổ biến")}
                </span>
              </div> */}
              <div className=" mt-5 pt-4 border-t-2 border-slate-500">
                {data &&
                  data.slice(0, visiblePosts).map((item) => (
                    <div key={item.post_id}>
                      <div className=" flex items-center">
                        <div className=" max-w-[40px] max-h-[40px] mr-2">
                          <img
                            src="/assets/images/img_user.png"
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
                              {item.comments !== null
                                ? item.comments?.length
                                : 0}{" "}
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
                              <FontAwesomeIcon
                                icon={faThumbsUp}
                                className="mr-1"
                              />
                              <span>
                                {item.userLiked ? t("Đã thích") : t("Thích")}
                              </span>
                            </button>
                            <button
                              onClick={() => toggleFormVisibility(item.post_id)}
                              className=" flex items-center text-lg px-4 hover:bg-slate-200 rounded-md py-1"
                            >
                              <FontAwesomeIcon
                                icon={faComment}
                                className="mr-1"
                              />
                              <span>{t("Bình luận")}</span>
                            </button>
                            <button className=" flex items-center text-lg px-4 hover:bg-slate-200 rounded-md py-1">
                              <FontAwesomeIcon
                                icon={faShare}
                                className="mr-1"
                              />
                              <span>{t("Chia sẻ")}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      {commentFormsVisibility[item.post_id] && (
                        <CommentList
                          inputRef={inputRef}
                          data={item.comments}
                          postId={item.post_id}
                          fetchData={fetchData}
                        />
                      )}
                    </div>
                  ))}
                {loading && <LoadingPage />}
              </div>
            </div>
          </>
        ) : (
          // <InsertPost />
          <div className=" text-center border border-slate-200 bg-slate-50 dark:bg-gray-800 rounded-lg p-3">
            <FontAwesomeIcon icon={faUser} className=" text-3xl" />
            <p>
              Hãy đăng nhập để tham gia thảo luận, chia sẻ ý kiến của bạn trên
              cộng đồng
            </p>
            <button className=" px-2 py-2 border rounded-md bg-slate-300 dark:text-black hover:opacity-70">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {t("Đăng nhập")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
