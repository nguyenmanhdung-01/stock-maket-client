import React from "react";

const HeaderTitle = ({ title }) => {
  return (
    <div className="flex items-center">
      <h2 className="font-bold uppercase text-2xl">{title}</h2>
    </div>
  );
};

export default HeaderTitle;
