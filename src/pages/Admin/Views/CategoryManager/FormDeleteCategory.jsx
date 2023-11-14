import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const FormDeleteCategory = ({ newsCategoryDelete }) => {
  return (
    <>
      <div className="text-[18px] ">
        <AiOutlineCloseCircle className="w-[60px] h-[60px] text-red-600 m-auto" />
        <p className="font-bold">Bạn có chắc muốn xóa:</p>{" "}
        {newsCategoryDelete.map((item) => {
          return <p key={item.id}>{item.name}</p>;
        })}
        Và các bài đăng liên quan?
      </div>
    </>
  );
};

export default FormDeleteCategory;
