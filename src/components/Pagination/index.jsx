import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({ pageCount, handlePageClick }) => {
  //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="flex items-center justify-center"
        pageClassName="px-3 py-1 border border-[#10bcff] mx-1 rounded cursor-pointer text-blue-600"
        previousClassName="px-3 py-1 border border-[#10bcff] mx-1 rounded cursor-pointer text-blue-600 active:bg-[#10bcff]"
        nextClassName="px-3 py-1 border border-[#10bcff] mx-1 rounded cursor-pointer text-blue-600 active:bg-[#10bcff]"
        pageLinkClassName="font-semibold "
        activeClassName="bg-[#10bcff] text-white"
      />
    </>
  );
};

export default Paginate;
