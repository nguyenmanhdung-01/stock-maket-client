import React from "react";
import { FacebookShareButton } from "react-share";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ShareFaceBook({ url, title, icon }) {
  const handleShareSuccess = () => {
    toast.success("Chia sẻ thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="flex">
      <FacebookShareButton
        url={url}
        quote={title}
        hashtag="#stockmarket"
        onShareWindowClose={handleShareSuccess}
      >
        {icon ? icon : "Chia Sẻ"}
      </FacebookShareButton>
    </div>
  );
}

export default ShareFaceBook;
