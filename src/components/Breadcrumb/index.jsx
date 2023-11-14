import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiFillCaretRight } from "react-icons/ai";
import "./breadcum.css";
const Breadcrumbs = ({ title, subtitle, link, sublink }) => {
  const navigate = useNavigate();
  return (
    <div className="border-b-2 border-[#b1b1b8]">
      <div className=" inline-flex items-center gap-3 bg-[#ededef] text-[#515050] pl-4 pr-6 py-2  cursor-pointer relative">
        <div onClick={() => navigate("/")}>
          <AiFillHome className="w-3 h-3 hover:text-[#000]" />
        </div>
        <div
          className=" text-sm  mt-0.5 hover:text-[#000] capitalize"
          onClick={() => navigate(link)}
        >
          {title}
        </div>
        {subtitle ? (
          <>
            {" "}
            <div>
              <AiFillCaretRight className="w-3 h-3 hover:text-[#000]" />
            </div>
            <div className=" line-clamp-1 text-sm max-w-[200px] w-auto mt-0.5 hover:text-[#000]">
              {subtitle}
            </div>{" "}
          </>
        ) : (
          ""
        )}

        <span className="bread-cum"></span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
