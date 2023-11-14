import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-regular-svg-icons";
import React from "react";

const Search = () => {
  return (
    <di className="mr-8">
      <form action="">
        <div className="flex items-center border-solid border-[2px] border-slate-200 rounded-md">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết"
            className="w-[240px] py-1 px-3 text-sm block focus:outline-none "
          />
          <FontAwesomeIcon
            icon="fa-solid fa-magnifying-glass"
            className=" min-w-[20px] min-h-[20px] px-2 py-1 text-white cursor-pointer bg-navy-700 "
          />
        </div>
      </form>
    </di>
  );
};

export default Search;
