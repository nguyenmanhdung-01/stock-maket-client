import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";
import axios from "axios";
import { useForm } from "react-hook-form";

import { IoSend } from "react-icons/io5";
import useAuth from "../../../hooks/redux/auth/useAuth";
import CommentItem from "./CommentItem";
import LoadingPage from "../../../components/LoadingPage";
import socket from "../../../socketService";

const DOMAIN = process.env.REACT_APP_STOCK;

const CommentList = ({ inputRef, data, post, fetchData }) => {
  // console.log("post", post);
  const { t } = useTranslation();
  const { auth } = useAuth();
  const { register, handleSubmit, reset } = useForm({ criteriaMode: "all" });
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      const values = {
        content: data.content,
        post: post.post_id,
        user: auth.userID.id,
      };
      // console.log("onSubmit", values);

      const response = await axios.post(
        `${DOMAIN}/comment/createComment`,

        values,
        { withCredentials: true }
      );
      console.log("response", response);

      socket.emit("replyPost", {
        user: auth.userID,
        post: post,
        message: "Đã bình luận về bài viết của bạn",
        recipientId: post.user?.id,
        time: new Date(),
        link: `/chi-tiet-bai-viet/${post?.post_id}`,
      });
      fetchCommentList();

      reset({ content: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  const fetchCommentList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${DOMAIN}/comment/getCommentByPost/${post.post_id}`
      );
      // console.log("response", response);
      const groupedComments = groupCommentsByFatherId(response.data);
      setCommentList(groupedComments);
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const groupCommentsByFatherId = (comments) => {
    const commentMap = {};
    const topLevelComments = [];

    // Tạo một map để ánh xạ các comment theo id
    for (const comment of comments) {
      const commentId = comment.id;

      if (!commentMap[commentId]) {
        commentMap[commentId] = {
          ...comment,
          children: [],
        };
      }

      const mappedComment = commentMap[commentId];

      // Kiểm tra nếu có father_id, thêm comment hiện tại vào danh sách con của cha tương ứng
      if (comment.father_id) {
        if (!commentMap[comment.father_id]) {
          commentMap[comment.father_id] = {
            children: [],
          };
        }

        commentMap[comment.father_id].children.push(mappedComment);
      } else {
        topLevelComments.push(mappedComment);
      }

      // Kiểm tra nếu comment hiện tại đã có con trong map, thì gán danh sách con của nó vào comment hiện tại
      if (commentMap[commentId].children.length > 0) {
        mappedComment.children = commentMap[commentId].children;
      }
    }

    return topLevelComments;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-100 dark:bg-gray-800 p-3 dark:border relative text-end pb-0 rounded-md"
      >
        <input
          ref={inputRef}
          {...register("content")}
          type="text"
          placeholder="Viết bình luận..."
          className="w-full py-2 px-3 bg-slate-100 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:active:outline-none"
          autoFocus
        />
        <button className="text-2xl mr-2 mt-2 text-gray-900 dark:text-white hover:text-slate-500">
          <IoSend />
        </button>
      </form>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className=" my-3">
          {commentList.map((comment) => (
            <div className=" border-b border-b-gray-700 mb-5">
              <CommentItem
                key={comment.id}
                comment={comment}
                fetchData={fetchCommentList}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
