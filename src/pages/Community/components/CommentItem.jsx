import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import relativeTime from "dayjs/plugin/relativeTime";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/redux/auth/useAuth";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import socket from "../../../socketService";

const DOMAIN = process.env.REACT_APP_STOCK;
dayjs.extend(relativeTime);

const CommentItem = ({ comment, fetchData }) => {
  // console.log("comment", comment);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const { t } = useTranslation();
  const { auth } = useAuth();
  // Giả sử bạn có một danh sách các người dùng đã like từ API
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.liked || 0);
  const [usersWhoLiked, setUsersWhoLiked] = useState(comment.likedUsers);
  const [openFormReply, setOpenFormReply] = useState(false);
  const [replyingToComment, setReplyingToComment] = useState(null);
  useEffect(() => {
    // Kiểm tra xem người dùng hiện tại có trong danh sách đã like hay không
    // console.log("usersWhoLiked", usersWhoLiked);
    if (usersWhoLiked !== null) {
      const currentUserLiked = usersWhoLiked.some(
        (user) => user == auth.userID.id
      ); // Thay currentUserId bằng id của người dùng hiện tại
      // console.log("currentUserLiked", currentUserLiked);
      setLiked(currentUserLiked);
    }
  }, [usersWhoLiked]);

  const handleLike = async (comment) => {
    try {
      // console.log(id);
      const response = await axios.put(`${DOMAIN}/comment/${comment.id}/like`, {
        userId: auth.userID.id,
      });
      console.log("response", response);
      const hasLike = response.data.likedUsers.some(
        (userId) => userId === auth.userID.id
      );
      if (hasLike) {
        socket.emit("likePost", {
          user: auth.userID,
          post: response.data,
          message: "Đã thích bình luận của bạn:",
          recipientId: comment.user?.id,
          time: new Date(),
          link: `/chi-tiet-bai-viet/${comment.post?.post_id}`,
        });
      }
      setLiked(!liked);
      setLikesCount(response.data.liked);

      // Cập nhật danh sách người dùng đã like
      if (!liked) {
        setUsersWhoLiked([...usersWhoLiked, auth.userID.id]);
      } else {
        const updatedUsers = usersWhoLiked.filter(
          (user) => user !== auth.userID.id
        );
        setUsersWhoLiked(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReply = (cmt) => {
    setOpenFormReply(true);
    setReplyingToComment(cmt.id);
  };

  const handleCancelReply = () => {
    setOpenFormReply(false);
    setReplyingToComment(null);
  };

  const onSubmit = async (data) => {
    try {
      const textChildren = `@${comment.user?.HoVaTen}`;

      const text = data.content
        .split(`@${comment.user?.HoVaTen}`)
        .join("")
        .trim();
      const values = {
        ...data,
        content: `<a class="link_user" href="/user-info/${auth?.userID.id}" target="_blank">${textChildren}</a> ${text}`,
        father_id: comment.id,
        // TODO: cần lấy theo id của người đăng nhập
        user: auth.userID.id,
        post: comment.post?.post_id,
      };
      const response = await axios.post(
        `${DOMAIN}/comment/createComment`,

        values,
        { withCredentials: true }
      );
      // console.log("Response", response);

      socket.emit("replyPost", {
        user: auth.userID,
        post: comment.post,
        message: "Đã trả lời về bình luận của bạn",
        recipientId: comment.user?.id,
        time: new Date(),
        link: `/chi-tiet-bai-viet/${comment.post?.post_id}`,
      });

      reset({ content: "" });
      if (fetchData) {
        fetchData();
      }
      setOpenFormReply(false);
      setReplyingToComment(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-2" key={comment.id}>
      <div
        className={`flex relative ${comment.father_id ? "" : "rules"} ${
          comment.father_id ? "line" : ""
        }`}
      >
        <div className=" mr-2">
          <img
            src={
              comment.user?.Avatar !== null
                ? `${comment.user?.Avatar}`
                : "/assets/images/img_user.png"
            }
            alt=""
            className="rounded-full border w-[40px] max-h-[35px] border-white object-cover"
          />
        </div>
        <div className="w-full">
          <div className="bg-slate-100 dark:bg-gray-800 p-2 rounded-md border w-full">
            <h3 className="font-semibold">{comment.user.HoVaTen}</h3>
            <p
              className="w-full break-all"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            ></p>
          </div>
          <div className="flex items-center justify-between px-3 mt-1">
            <button
              className={`rounded-lg px-2 hover:bg-slate-200 ${
                liked ? "text-blue-500" : ""
              }`}
              onClick={() => handleLike(comment)}
            >
              {liked ? "Đã thích" : "Thích"}
            </button>
            <button
              className="rounded-lg px-2 hover:bg-slate-200"
              onClick={() => {
                if (openFormReply === true) {
                  handleCancelReply(); // Tắt form hiện tại nếu đang mở
                } else {
                  handleReply(comment); // Mở form mới nếu không có form nào đang mở
                }
              }}
            >
              Phản hồi
            </button>
            <span className="px-2">
              {t(dayjs(comment.created_at).fromNow())}
            </span>
            <span>
              <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
              {likesCount}
            </span>
          </div>
          {openFormReply && replyingToComment === comment.id && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="text-end bg-slate-100 dark:bg-gray-800 rounded-lg"
            >
              <input
                // ref={inputRef}
                {...register("content")}
                type="text"
                placeholder="Phản hồi..."
                defaultValue={`@${comment.user?.HoVaTen}`}
                className="w-full py-2 px-3 bg-slate-100 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:active:outline-none"
                autoFocus
              />
              <button className="text-2xl mr-2 mt-2 text-gray-900 dark:text-white hover:text-slate-500">
                <IoSend />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Khi có phản hồi con */}
      {comment.children && comment.children.length > 0 && (
        <div
          className={`ml-5 mt-2 relative  ${
            comment.children.length > 1 ? "rules_two" : ""
          }`}
        >
          {comment.children.map((childComment) => (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              fetchData={fetchData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
