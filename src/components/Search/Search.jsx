// import { faSearch } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  const navigate = useNavigate();
  const [keysearch, setKeySearch] = useState("");
  const handleSearch = () => {
    if (keysearch) {
      navigate(`/search?keyword=${keysearch}`);
      setKeySearch("");
    } else {
      toast.warn("Vui lòng nhập từ khóa tìm kiếm", {
        autoClose: 3000,
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Nếu người dùng nhấn phím Enter
      handleSearch();
    }
  };
  return (
    <di className="mr-8">
      <form action="">
        <div className="flex items-center border-solid border-[2px] border-slate-200 rounded-md">
          <input
            onChange={(e) => {
              setKeySearch(e.target.value);
              //console.log(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            value={keysearch}
            type="text"
            placeholder="Tìm kiếm tin tức..."
            className="w-[240px] py-1 px-3 text-sm block focus:outline-none "
          />
          <FontAwesomeIcon
            onClick={handleSearch}
            icon="fa-solid fa-magnifying-glass"
            className=" min-w-[20px] min-h-[20px] px-2 py-1 text-white cursor-pointer bg-navy-700 "
          />
        </div>
      </form>
    </di>
  );
};

export default Search;
