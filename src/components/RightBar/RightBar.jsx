import React from "react";
import NewsTopView from "./components/NewsTopView";
import NewsLatest from "./components/NewsLatest";

const RightBar = () => {
  return (
    <div className=" bg-slate-50 py-2 rounded-md shadow-xl px-1 border border-slate-500">
      <NewsTopView />
      <NewsLatest />
    </div>
  );
};

export default RightBar;
