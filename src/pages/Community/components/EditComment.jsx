import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_STOCK;
const EditComment = ({ id, fetchData, setOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  //   const [comment, setComment] = useState();
  const [commentText, setCommentText] = useState("");
  const [innerLink, setInnerLink] = useState("");
  useEffect(() => {
    fetchDataComment();
  }, [id]);

  const fetchDataComment = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/comment/comment/${id}`);
      //   console.log("response", response.data);
      //   //   setComment(response.data[0]);
      const htmlString = response.data[0]?.content || "";
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(htmlString, "text/html");
      const aTag = parsedHtml.querySelector("a");
      if (aTag) {
        const aString = aTag.outerHTML;
        // Lấy text bên ngoài thẻ a
        const outsideText = aTag.nextSibling.textContent.trim();

        //   console.log("Outside text:", outsideText);
        // Tách text bên ngoài thẻ a và text bên trong thẻ a
        //   console.log("splitText", splitText);
        setCommentText(outsideText); // Phần text bên ngoài thẻ a
        setInnerLink(aString); // Phần text bên trong thẻ a
      } else {
        setCommentText(htmlString);
      }
      // Chuyển thẻ a thành chuỗi
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const value = {
        id: id,
        content: `${innerLink} ${data.content}`,
      };
      const response = await axios.post(`${DOMAIN}/comment/editComment`, value);
      console.log("response", response);
      toast.success("Chỉnh sửa bình luận thành công");
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="w-[400px]">
      <input
        type="text"
        {...register("content")}
        defaultValue={commentText}
        className="px-3 py-2 border border-black rounded-lg w-full"
      />
      <button className="px-3 py-2 bg-blue-500 rounded-lg mt-2 float-right hover:bg-blue-400">
        Lưu
      </button>
      {/* <a className="link_user" href="/user-info/1" target="_blank">
        {innerLink}
      </a> */}
    </form>
  );
};

export default EditComment;
