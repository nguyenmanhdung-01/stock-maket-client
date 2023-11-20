import React from "react";

const ShowMore = ({ onClick }) => {
  return (
    <button onClick={onClick} className="my-4 py-2 px-4 bg-gray-200 rounded">
      Xem thêm bài viết
    </button>
  );
};

export default ShowMore;
