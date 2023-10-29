import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-regular-svg-icons";
import React from "react";

const Search = () => {
  return (
    <di className="ml-8">
      <form
        action="
        "
      >
        <label htmlFor="" className=" relative">
          <input
            type="text"
            placeholder="Search ..."
            className="w-[240px] py-1 pl-3 pr-8 text-sm block focus:outline-none border-solid border-[2px] border-slate-200 rounded-3xl"
          />
          <FontAwesomeIcon
            icon="fa-solid fa-magnifying-glass"
            flip
            className=" min-w-[16px] min-h-[16px] absolute top-1 right-1 p-1 "
          />
        </label>
      </form>
    </di>
  );
};

export default Search;
