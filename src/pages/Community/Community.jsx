import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Community.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import {
  faNewspaper,
  faRss,
  faShare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { IoSend } from "react-icons/io5";

const Community = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const inputRef = useRef(null);
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className=" grid grid-cols-4 gap-3 relative bgr-white dark:text-white dark:bg-slate-800">
      <div className=" relative col-span-1">
        <div className=" sticky top-[70px] bg-white dark:bg-gray-800  text-lg shadow-lg p-3 border dark:border-gray-600 rounded-md">
          <div className="flex items-center my-1 p-2 hover:bg-slate-200 dark:hover:text-black rounded-sm">
            <FontAwesomeIcon className="mr-1 " icon={faRss} />
            <span>Thảo luận</span>
          </div>
          <div className="flex items-center my-1 p-2 hover:bg-slate-200 dark:hover:text-black rounded-sm">
            <FontAwesomeIcon className="mr-1 " icon={faNewspaper} />
            <span>{t("Bài viết")}</span>
          </div>
        </div>
      </div>
      <div className=" col-span-2 p-2 shadow-xl rounded-md border dark:border-gray-600">
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
        <div className=" relative">
          <div className=" flex items-center sticky z-[1000] top-[75px] bg-white dark:bg-gray-800 dark:border-white drop-shadow-lg py-2 rounded-b-md overflow-hidden">
            <span className=" mr-3 text-lg py-2 px-2 border-b-2 border-blue-300 hover:bg-slate-200 dark:hover:text-black">
              {t("Mới nhất")}
            </span>
            <span className=" mr-3 text-lg py-2 px-2 border-b-2 border-blue-300 hover:bg-slate-200 dark:hover:text-black">
              {t("Phổ biến")}
            </span>
          </div>
          <div className=" mt-5 pt-4 border-t-2 border-slate-500">
            <div>
              <div className=" flex items-center">
                <div className=" max-w-[40px] max-h-[40px] mr-2">
                  <img
                    src="/assets/images/img_user.png"
                    alt=""
                    className=" rounded-full"
                  />
                </div>
                <div>
                  <h3 className=" font-semibold text-lg">Nguyễn Mạnh Dũng</h3>
                  <span>22 phút trước</span>
                </div>
              </div>
              <div>
                <div
                  className={` mt-2 px-2 ${
                    visible === false ? "line-clamp-4" : ""
                  }`}
                >
                  Một phiên thể hiện sức mạnh cực kỳ thuyết phục, phe mua hoàn
                  toàn làm chủ cuộc chơi khi thị trường về lại fibo 0.5 trên đồ
                  thị Vnindex daily. ✔️ Với cú lội ngược dòng 35 điểm hôm nay,
                  thị trường sẽ bước vào sóng hồi kéo dài ít nhất 4-6 tuần. Dự
                  kiến sẽ là màn thể hiện của BĐS - Thép và một số cổ phiếu
                  riêng lẻ khác. ✔️ Làm sao để vượt qua nỗi sợ hãi mang tên bất
                  động sản Chúc mừng tất cả anh chị đã đồng hành cùng chúng tôi
                  trên thuyền bắt sóng hồi BĐS Không một chuyên gia, đội nhóm
                  nào khuyến nghị mua đối với dòng bds và chỉ có em đồng hành
                  cùng anh chị lên thuyền mang tên BDS! ✔️ Thành quả đó không
                  phải may mắn đó là cả một tuần làm việc của đội nhóm
                </div>
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
                  <img
                    src="https://fireant.vn/_next/image?url=https%3A%2F%2Fstatic.fireant.vn%2Fposts%2Fimage%2F1800152%3Fwidth%3D600%26height%3D600&w=1920&q=75"
                    alt=""
                  />
                </div>
                <div className="my-2">
                  <div className=" flex items-center justify-between">
                    <span>2 {t("thích")}</span>
                    <span>6 {t("bình luận")}</span>
                  </div>
                  <div className="py-1 flex items-center justify-between px-2 border-y border-y-gray-600">
                    <button className=" flex items-center text-lg px-4 hover:bg-slate-200 rounded-md py-1">
                      <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                      <span>{t("Thích")}</span>
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
            </div>
            {isFormVisible && (
              <div>
                <form className="bg-slate-100 dark:bg-gray-800 p-3 dark:border relative text-end pb-0 rounded-md">
                  <input
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
                            <FontAwesomeIcon
                              icon={faThumbsUp}
                              className="mr-1"
                            />
                            2
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
                            <p>
                              Đây là đài phát thành truyền hình Việt Nam con 1
                            </p>
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
                              <FontAwesomeIcon
                                icon={faThumbsUp}
                                className="mr-1"
                              />
                              2
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
                              <h3 className=" font-semibold">
                                Nguyễn Mạnh Dũng
                              </h3>
                              <p>
                                Đây là đài phát thành truyền hình Việt Nam con 2
                              </p>
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
                                <FontAwesomeIcon
                                  icon={faThumbsUp}
                                  className="mr-1"
                                />
                                2
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
                              <FontAwesomeIcon
                                icon={faThumbsUp}
                                className="mr-1"
                              />
                              2
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
                              <h3 className=" font-semibold">
                                Nguyễn Mạnh Dũng
                              </h3>
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
                                <FontAwesomeIcon
                                  icon={faThumbsUp}
                                  className="mr-1"
                                />
                                2
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
