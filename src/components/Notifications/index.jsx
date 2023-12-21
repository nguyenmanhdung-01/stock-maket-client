import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import useAuth from "../../hooks/redux/auth/useAuth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "../../socketService";

dayjs.extend(relativeTime);
const DOMAIN = process.env.REACT_APP_STOCK;

const Notification = ({ closeDropDown, refreshData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const getDataNotifications = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/notification/`);
      const notifications = response.data.filter(
        (notification) => notification.recipientId === auth.userID.id.toString()
      );
      console.log("Notifications", notifications);
      setNotifications(notifications);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataNotifications();
  }, []);

  const showMoreNotifications = () => {
    setShowAll(true); // Set showAll state to true to display all notifications
  };
  useEffect(() => {
    socket.on("likePost", (data) => {
      const { user, post, message, recipientId, time, link } = data;
      if (recipientId === auth.userID.id) {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [
            ...prevNotifications,
            { user, post, message, recipientId, time, link },
          ];
          return updatedNotifications;
        });
      }
    });

    socket.on("replyPost", (data) => {
      const { user, post, message, recipientId, time, link } = data;
      if (recipientId === auth.userID.id) {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [
            ...prevNotifications,
            { user, post, message, recipientId, time, link },
          ];

          return updatedNotifications;
        });
      }
    });

    socket.on("commentPost", (data) => {
      const { user, post, message, recipientId, time, link } = data;
      if (recipientId === auth.userID.id) {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [
            ...prevNotifications,
            { user, post, message, recipientId, time, link },
          ];

          return updatedNotifications;
        });
      }
    });

    socket.on("createPost", (data) => {
      console.log("data", data);
      const { user, post, message, recipientId, time, link } = data;
      if (recipientId === auth.userID.id.toString()) {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [
            ...prevNotifications,
            { user, post, message, recipientId, time, link },
          ];

          return updatedNotifications;
        });
      }
    });

    return () => {
      socket.off("likePost");
      socket.off("replyPost");
      socket.off("commentPost");
      socket.off("createPosts");
      // Tắt lắng nghe khi component unmount
    };
  }, [auth]);

  const watchNotifications = async (id) => {
    try {
      const response = await axios.put(`${DOMAIN}/notification/watch/${id}`);
      // console.log("response", response);
      getDataNotifications();
      refreshData();
    } catch (error) {
      console.log(error.message);
    }
  };

  //   console.log("data", notifications);
  return (
    <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-navy-800 dark:shadow-none sm:w-[460px]">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-navy-700 dark:text-white">
          Thông báo
        </p>
        {!showAll ? (
          <p
            onClick={showMoreNotifications}
            className="text-sm font-bold text-navy-700 dark:text-white cursor-pointer"
          >
            Hiển thị tất cả
          </p>
        ) : (
          <p
            onClick={() => setShowAll(false)}
            className="text-sm font-bold text-navy-700 dark:text-white cursor-pointer"
          >
            Ẩn bớt thông báo
          </p>
        )}
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {showAll ? (
          notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <button
                onClick={(e) => {
                  if (notification?.link !== null) {
                    e.stopPropagation();
                    navigate(`${notification?.link}`, { replace: true });
                    watchNotifications(notification.id);
                    closeDropDown();
                  } else {
                    e.stopPropagation();
                    watchNotifications(notification.id);
                    closeDropDown();
                  }
                }}
                className={`flex w-full items-center my-2 hover:bg-slate-100 dark:hover:bg-navy-600 rounded-xl px-2 ${
                  notification.watched === true ? "" : "bg-slate-600"
                }`}
                key={index}
              >
                <div className="flex  items-center justify-center rounded-full bg-gradient-to-b p-1 from-brandLinear to-brand-500 text-2xl text-white">
                  <img
                    src={
                      notification.user?.Avatar !== null
                        ? `${notification.user.Avatar}`
                        : "/assets/images/img_user.png"
                    }
                    alt=""
                    className=" w-[65px] h-[65px] rounded-full object-cover"
                  />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-sm text-gray-900">
                    <span className="font-bold text-base">
                      {notification.user?.HoVaTen}
                    </span>{" "}
                    {notification?.message.toLowerCase()}
                  </p>
                  <p
                    className="font-base text-left text-xs text-gray-900 line-clamp-1"
                    dangerouslySetInnerHTML={{
                      __html:
                        notification.post?.title || notification.post?.content,
                    }}
                  ></p>
                  <span className="text-gray-900">
                    {t(dayjs(notification.time).fromNow())}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <span className=" text-gray-900">Không có thông báo</span>
          )
        ) : (
          notifications.slice(0, 5).map((notification, index) => (
            <button
              onClick={(e) => {
                if (notification?.link !== null) {
                  e.stopPropagation();
                  navigate(`${notification?.link}`, { replace: true });
                  watchNotifications(notification.id);
                  closeDropDown();
                } else {
                  watchNotifications(notification.id);
                  closeDropDown();
                }
              }}
              className={`flex w-full items-center my-2 hover:bg-slate-100 dark:hover:bg-navy-600 rounded-xl px-2 ${
                notification.watched === true ? "" : "bg-slate-200"
              }`}
              key={index}
            >
              <div className="flex  items-center justify-center rounded-full bg-gradient-to-b p-1 from-brandLinear to-brand-500 text-2xl text-white">
                <img
                  src={
                    notification.user?.Avatar !== null
                      ? `${notification.user.Avatar}`
                      : "/assets/images/img_user.png"
                  }
                  alt=""
                  className=" w-[65px] max-h-[55px] rounded-full object-cover"
                />
              </div>
              <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                <p className="mb-1 text-left text-sm text-gray-900 dark:text-white">
                  <span className="font-bold text-base">
                    {notification.user?.HoVaTen}
                  </span>{" "}
                  {notification?.message.toLowerCase()}
                </p>
                <p
                  className="font-base text-left text-xs text-gray-900 dark:text-white line-clamp-1"
                  dangerouslySetInnerHTML={{
                    __html:
                      notification.post?.title || notification.post?.content,
                  }}
                ></p>
                <span className="text-gray-900 dark:text-white">
                  {t(dayjs(notification.time).fromNow())}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
