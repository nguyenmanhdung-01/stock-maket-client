import React from "react";
import NewsTopView from "./components/NewsTopView";
import NewsLatest from "./components/NewsLatest";

const RightBar = () => {
  return (
    <div className=" py-2 rounded-md shadow-xl px-1">
      <NewsTopView />
      <NewsLatest />
    </div>
  );
};

export default RightBar;
