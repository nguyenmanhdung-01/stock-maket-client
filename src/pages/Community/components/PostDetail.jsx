import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../../components/Breadcrumb";
import { CgCalendarDates } from "react-icons/cg";
import dayjs from "dayjs";
import { BsFacebook } from "react-icons/bs";
import ShareFaceBook from "../../../components/ShareSocial/ShareFaceBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import useAuth from "../../../hooks/redux/auth/useAuth";
import { toast } from "react-toastify";
import RightBar from "../../../components/RightBar/RightBar";
const DOMAIN = process.env.REACT_APP_STOCK;
const PostDetail = () => {
  const { auth } = useAuth();
  const [postItem, setPostItem] = useState(null);
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/post/details/` + id);
      setPostItem(res.data);

      // setArr(groupedComments);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const currentURL = window.location.href;

  //   const saveNewsId = async (news) => {
  //     try {
  //       const newsData = { newsId: news.news_id };
  //       const response = await axios.post(
  //         `${DOMAIN}/users/saveNews/${auth.userID.id}`,
  //         newsData
  //       );
  //       console.log("success", response);
  //       toast.success("Lưu bài viết thành công");
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Lỗi máy chủ");
  //     }
  //   };
  return (
    <Card>
      <div className=" pt-6">
        <Breadcrumbs
          title={"Bài viết"}
          // sau khi fetch data thì sẽ lấy theo title ở đây
          subtitle={`${postItem && postItem.title}`}
          link={"/news"}
          // link sẽ theo thằng category
        />

        <div className="grid grid-cols-4 gap-3 p-7">
          {postItem && (
            <div className="px-3 py-4 col-span-3 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4 ">
              <h3 className="font-bold text-lg mb-4">{postItem.title}</h3>
              <p className="flex items-center justify-between gap-2 mb-5 border-t-[1px] border-b-[1px] border-[#ccc] py-2">
                <span className="text-[13px] italic flex items-center mr-2">
                  <CgCalendarDates />
                  {dayjs(postItem.created_at).format("DD/MM/YYYY")}
                </span>
                {/* <FontAwesomeIcon
                  icon={faBookmark}
                  title="Lưu tin tức"
                  className=" cursor-pointer"
                  onClick={() => {
                    saveNewsId(postItem);
                  }}
                /> */}
              </p>
              <div className="mb-5">
                {postItem.image ? (
                  <img src={`${postItem.image}`} alt="" />
                ) : null}
              </div>
              <div
                style={{
                  "max-height": "unset",
                  height: "auto",
                  padding: "0px",
                }}
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: postItem.content }}
              ></div>

              <div className="flex justify-end items-center gap-3 mt-5 border-t-[1px] border-b-[1px] border-[#ccc] py-4">
                Chia sẻ:
                {/* Lấy theo url hiện tại để share, Cổng localhost:3000 lỗi */}
                <ShareFaceBook
                  url={`${currentURL}`}
                  icon={<BsFacebook className="text-[20px] text-blue-500" />}
                  description={postItem.subcontent}
                  image={postItem.image}
                />
                {/* <ShareTwitter
                url={
                  "http://dntpthanhhoa.vn/trung-tam-nghien-cuu-khoa-hoc-va-xet-nghiem-cong-nghe-cao-hstc.html"
                }
                icon={
                  <AiFillTwitterCircle className="text-[23px] text-blue-500" />
                }
              /> */}
              </div>
            </div>
          )}
          <div className="phone:hidden laptop:block desktop:block tablet:hidden">
            <RightBar />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostDetail;
