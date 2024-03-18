import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../../components/Breadcrumb";
import { CgCalendarDates } from "react-icons/cg";
import dayjs from "dayjs";
import { BsFacebook } from "react-icons/bs";
import ShareFaceBook from "../../../components/ShareSocial/ShareFaceBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCirclePause,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
import useAuth from "../../../hooks/redux/auth/useAuth";
import { toast } from "react-toastify";
import RightBar from "../../../components/RightBar/RightBar";
import RelatedNews from "../components/RelatedNews";

const DOMAIN = process.env.REACT_APP_STOCK;

const NewContentDetail = () => {
  const { auth } = useAuth();
  const { state } = useLocation();
  console.log("state", state);
  const [postItem, setPostItem] = useState(null);
  const { slug } = useParams();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("Vietnamese Male");
  const fetchData = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/news/details-slug/` + slug);
      setPostItem(res.data);

      // setArr(groupedComments);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    window.responsiveVoice.pause();
    setIsSpeaking(false);
  }, [slug]);
  const currentURL = window.location.href;

  const saveNewsId = async (news) => {
    try {
      const newsData = { newsId: news.news_id };
      const response = await axios.post(
        `${DOMAIN}/users/saveNews/${auth.userID?.id}`,
        newsData
      );
      console.log("success", response);
      toast.success("Lưu bài viết thành công");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi máy chủ");
    }
  };

  function stripHtml(html) {
    let tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  const handleSpeak = (textToSpeak, voiceType) => {
    const splitText = stripHtml(textToSpeak);
    // console.log("split text", splitText);
    // console.log("textToSpeak", textToSpeak);
    if (!isSpeaking) {
      window.responsiveVoice.speak(splitText, voiceType, {
        onstart: () => {
          setIsSpeaking(true);
        },
        onend: () => setIsSpeaking(false),
      });
    } else {
      window.responsiveVoice.pause();
      setIsSpeaking(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSpeaking) {
        window.responsiveVoice.isPlaying((playing) => {
          if (playing) {
            window.responsiveVoice.mark();
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isSpeaking]);
  const handleChangeVoice = (event) => {
    setSelectedVoice(event.target.value); // Cập nhật giọng đọc được chọn
  };
  return (
    <Card>
      <div className=" pt-6">
        <Breadcrumbs
          title={"Điểm Tin"}
          // sau khi fetch data thì sẽ lấy theo title ở đây
          subtitle={`${postItem && postItem.title}`}
          link={"/news"}
          // link sẽ theo thằng category
        />

        <div className="grid grid-cols-4 gap-3 p-7">
          {postItem && (
            <div className="px-3 py-4 col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-4 sm:col-span-4 ">
              <h3 className="font-bold text-lg mb-4">{postItem.title}</h3>
              <div className="flex items-center justify-between gap-2 mb-5 border-t-[1px] border-b-[1px] border-[#ccc] py-2">
                <span className="text-[13px] italic flex items-center mr-2">
                  <CgCalendarDates />
                  {dayjs(postItem.created_at).format("DD/MM/YYYY")}
                </span>
                <div className="">
                  <button
                    onClick={() => handleSpeak(postItem.content, selectedVoice)}
                  >
                    {isSpeaking ? (
                      <>
                        <FontAwesomeIcon icon={faCirclePause} />{" "}
                        <p className=" inline">tắt</p>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCirclePlay} />{" "}
                        <p className=" inline">Nghe đọc tin tức</p>
                      </>
                    )}
                  </button>
                  <select
                    className="ml-2 border border-black"
                    value={selectedVoice}
                    onChange={handleChangeVoice}
                  >
                    <option value="">--Chọn giọng nói---</option>
                    <option value="Vietnamese Male">Nam</option>
                    <option value="Vietnamese Female">Nữ</option>
                    {/* Thêm các option khác nếu có */}
                  </select>
                </div>
                {auth.userID !== undefined && (
                  <FontAwesomeIcon
                    icon={faBookmark}
                    title="Lưu tin tức"
                    className=" cursor-pointer"
                    onClick={() => {
                      saveNewsId(postItem);
                    }}
                  />
                )}
              </div>
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

              <RelatedNews id={state?.news_category_id} />
            </div>
          )}
          <div className="sm:hidden lg:block xl:block md:hidden">
            <RightBar />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewContentDetail;
