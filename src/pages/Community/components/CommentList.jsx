import React from "react";
import { useTranslation } from "react-i18next";

import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoSend } from "react-icons/io5";
import useAuth from "../../../hooks/redux/auth/useAuth";
import axios from "axios";
import { useForm } from "react-hook-form";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const CommentList = ({ inputRef, data, postId, fetchData }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const values = {
        content: data.content,
        post: postId,
        user: auth.userID.id,
      };

      await axios.post(
        `${DOMAIN}/api/comment/createComment`,

        values,
        { withCredentials: true }
      );
      fetchData();
      reset({ content: "" });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-100 dark:bg-gray-800 p-3 dark:border relative text-end pb-0 rounded-md"
      >
        <input
          {...register("content")}
          type="text"
          placeholder="Viết bình luận..."
          className="w-full py-2 px-3 bg-slate-100 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:active:outline-none"
          ref={inputRef}
          autoFocus
        />
        <button className="text-2xl mr-2 mt-2 text-gray-900 dark:text-white hover:text-slate-500">
          <IoSend />
        </button>
      </form>
      <div className=" mt-3">
        <div>
          <div className="flex relative rules">
            <div className=" max-w-[35px] max-h-[35px] mr-2">
              <img
                src="/assets/images/img_user.png"
                alt=""
                className=" rounded-full border border-white"
              />
            </div>
            <div>
              <div className=" bg-slate-100 dark:bg-gray-800 p-2 rounded-md border">
                <h3 className=" font-semibold">Nguyễn Mạnh Dũng</h3>
                <p>Đây là đài phát thành truyền hình Việt Nam cha</p>
              </div>
              <div className=" flex items-center justify-between px-3 mt-1">
                <button className=" rounded-lg px-2 hover:bg-slate-200">
                  {t("Thích")}
                </button>
                <button className=" rounded-lg px-2 hover:bg-slate-200">
                  {t("Phản hồi")}
                </button>
                <span>2 {t("giờ")}</span>
                <span>
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />2
                </span>
              </div>
            </div>
          </div>
          {/* Khi phản hồi */}
          <div className="ml-5 mt-2 relative rules_two">
            <div className="flex relative rules">
              <div className=" max-w-[35px] max-h-[35px] mr-2">
                <img
                  src="/assets/images/img_user.png"
                  alt=""
                  className=" rounded-full border border-white"
                />
              </div>
              <div>
                <div className=" bg-slate-100 dark:bg-gray-800 p-2 rounded-md border">
                  <h3 className=" font-semibold">Nguyễn Mạnh Dũng</h3>
                  <p>Đây là đài phát thành truyền hình Việt Nam con 1</p>
                </div>
                <div className=" flex items-center justify-between px-3 mt-1">
                  <button className=" rounded-lg px-2 hover:bg-slate-200">
                    Thích
                  </button>
                  <button className=" rounded-lg px-2 hover:bg-slate-200">
                    Phản hồi
                  </button>
                  <span>2 giờ</span>
                  <span>
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />2
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-5 mt-2 relative line">
              <div className="flex relative">
                <div className=" max-w-[35px] max-h-[35px] mr-2">
                  <img
                    src="/assets/images/img_user.png"
                    alt=""
                    className=" rounded-full border border-white"
                  />
                </div>
                <div>
                  <div className=" bg-slate-100 dark:bg-gray-800 p-2 rounded-md border">
                    <h3 className=" font-semibold">Nguyễn Mạnh Dũng</h3>
                    <p>Đây là đài phát thành truyền hình Việt Nam con 2</p>
                  </div>
                  <div className=" flex items-center justify-between px-3 mt-1">
                    <button className=" rounded-lg px-2 hover:bg-slate-200">
                      Thích
                    </button>
                    <button className=" rounded-lg px-2 hover:bg-slate-200">
                      Phản hồi
                    </button>
                    <span>2 giờ</span>
                    <span>
                      <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 mt-2 relative  rules_two">
            <div className="flex ">
              <div className=" max-w-[35px] max-h-[35px] mr-2">
                <img
                  src="/assets/images/img_user.png"
                  alt=""
                  className=" rounded-full border border-white"
                />
              </div>
              <div>
                <div className=" bg-slate-100 dark:bg-gray-800 p-2 rounded-md border">
                  <h3 className=" font-semibold">Nguyễn Mạnh Dũng</h3>
                  <p>Đây là đài phát thành truyền hình Việt Nam</p>
                </div>
                <div className=" flex items-center justify-between px-3 mt-1">
                  <button className=" rounded-lg px-2 hover:bg-slate-200">
                    Thích
                  </button>
                  <button className=" rounded-lg px-2 hover:bg-slate-200">
                    Phản hồi
                  </button>
                  <span>2 giờ</span>
                  <span>
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />2
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-5 mt-2">
              <div className="flex relative">
                <div className=" max-w-[35px] max-h-[35px] mr-2">
                  <img
                    src="/assets/images/img_user.png"
                    alt=""
                    className=" rounded-full border border-white"
                  />
                </div>
                <div>
                  <div className=" bg-slate-100 dark:bg-gray-800 p-2 rounded-md border">
                    <h3 className=" font-semibold">Nguyễn Mạnh Dũng</h3>
                    <p>Đây là đài phát thành truyền hình Việt Nam</p>
                  </div>
                  <div className=" flex items-center justify-between px-3 mt-1">
                    <button className=" rounded-lg px-2 hover:bg-slate-200">
                      Thích
                    </button>
                    <button className=" rounded-lg px-2 hover:bg-slate-200">
                      Phản hồi
                    </button>
                    <span>2 giờ</span>
                    <span>
                      <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
