import React from "react";
import { TwitterShareButton } from "react-share";

function ShareTwitter(props) {
  const { title, url, icon } = props;

  return (
    <div className="flex">
      <TwitterShareButton url={url} title={title}>
        {icon ? icon : "Twitter"}
      </TwitterShareButton>
    </div>
  );
}

export default ShareTwitter;
