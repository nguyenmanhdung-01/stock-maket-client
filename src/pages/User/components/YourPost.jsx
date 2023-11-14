import React from "react";
import Card from "../../../components/Card";

import { BsCloudCheck } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faNewspaper,
  faShareFromSquare,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
const YourPost = () => {
  const { t } = useTranslation();
  return (
    <Card extra={"w-full h-full p-4"}>
      <h1 className=" text-navy-700 dark:text-yellow-400 text-2xl mb-2">
        Bài viết đã đăng
        <FontAwesomeIcon icon={faNewspaper} className="ml-1" />
      </h1>
      <div className=" grid grid-cols-2 gap-5">
        <div className="flex p-2 bg-navy-600 dark:bg-slate-50 dark:text-black text-white border dark:border-navy-900 border-navy-700 rounded-md">
          <img
            src="/assets/images/avatar4.png"
            className=" w-[100px] h-[100px] object-cover"
            alt=""
          />
          <div className=" ml-3 w-full">
            <h2 className="text-left text-xl truncate">Tiêu đề</h2>
            <p className="truncate">
              Trời dù mưa, đường có đông, nhà có xa Anh nhớ qua…
            </p>
            <div className=" flex items-center justify-around">
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Lượt thích")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faThumbsUp} />
                </span>
              </span>
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Bình luận")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faComment} />
                </span>
              </span>
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Chia sẻ")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faShareFromSquare} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex p-2 bg-navy-600 dark:bg-slate-50 dark:text-black text-white border dark:border-navy-900 border-navy-700 rounded-md">
          <img
            src="/assets/images/avatar4.png"
            className=" w-[100px] h-[100px] object-cover "
            alt=""
          />
          <div className=" ml-3 w-full">
            <h2 className="text-left text-xl truncate">Tiêu đề</h2>
            <p className="truncate">
              Trời dù mưa, đường có đông, nhà có xa Anh nhớ qua…
            </p>
            <div className=" flex items-center justify-around">
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Lượt thích")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faThumbsUp} />
                </span>
              </span>
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Bình luận")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faComment} />
                </span>
              </span>
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Chia sẻ")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faShareFromSquare} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex p-2 bg-navy-600 dark:bg-slate-50 dark:text-black text-white border dark:border-navy-900 border-navy-700 rounded-md">
          <img
            src="/assets/images/avatar4.png"
            className=" w-[100px] h-[100px] object-cover "
            alt=""
          />
          <div className=" ml-3 w-full">
            <h2 className="text-left text-xl truncate">Tiêu đề</h2>
            <p className="truncate">
              Trời dù mưa, đường có đông, nhà có xa Anh nhớ qua…
            </p>
            <div className=" flex items-center justify-around">
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Lượt thích")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faThumbsUp} />
                </span>
              </span>
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Bình luận")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faComment} />
                </span>
              </span>
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Chia sẻ")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faShareFromSquare} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex p-2 bg-navy-600 dark:bg-slate-50 dark:text-black text-white border dark:border-navy-900 border-navy-700 rounded-md">
          <img
            src="/assets/images/avatar4.png"
            className=" w-[100px] h-[100px] object-cover "
            alt=""
          />
          <div className=" ml-3 w-full">
            <h2 className="text-left text-xl truncate">Tiêu đề</h2>
            <p className="truncate">
              Trời dù mưa, đường có đông, nhà có xa Anh nhớ qua…
            </p>
            <div className=" flex items-center justify-around">
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Lượt thích")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faThumbsUp} />
                </span>
              </span>
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Bình luận")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faComment} />
                </span>
              </span>
              <span className=" flex flex-col">
                <p className="text-yellow-500">{t("Chia sẻ")}</p>
                <span className=" flex items-center justify-center text-lg">
                  <b>2</b>
                  <FontAwesomeIcon className="ml-1" icon={faShareFromSquare} />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default YourPost;
