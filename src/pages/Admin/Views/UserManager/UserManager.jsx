import React, { useState } from "react";
import Checkbox from "../../../../components/checkbox";
import dayjs from "dayjs";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";

const options = [
  {
    label: "Đã khóa",
    value: 1,
  },
  {
    label: "Chưa khóa",
    value: 1,
  },
];

const UserManager = () => {
  const [data, setData] = useState([]);
  return (
    <div className="">
      <div className="flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
        <div className=" p-4 rounded-2xl bg-white shadow-xl dark:!bg-navy-800 dark:text-white">
          <div>
            <button className=" bg-green-500 text-white px-3 py-2 rounded-lg">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Thêm mới</span>
            </button>
            <button className=" bg-red-500 text-white px-3 py-2 rounded-lg ml-3">
              <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
              <span>Xóa lựa chọn</span>
            </button>
          </div>
        </div>
        <div className="relative mt-[3px] flex h-[61px] w-[495px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[495px] md:flex-grow-0 md:gap-1 xl:w-[495px] xl:gap-2">
          <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <p className="pl-3 pr-2 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
              type="text"
              placeholder="Search..."
              class="block h-full w-full rounded-full bg-lightPrimary text-base font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
            />
          </div>
          <Select
            options={options}
            placeholder="Lọc trạng thái"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "grey" : "",
                borderRadius: "20px",
              }),
            }}
          />
        </div>
      </div>
      <div className=" mt-4 p-4 rounded-2xl bg-white shadow-xl dark:!bg-navy-800 dark:text-white">
        <table className="border border-blue-400 rounded-lg w-full mt-10 bg-white dark:!bg-navy-800 dark:text-white overflow-y-auto relative">
          <thead>
            <tr>
              <th
                scope="col"
                className="p-4 border border-blue-400 rounded-lg overflow-hidden"
              >
                <div className="flex items-center">
                  {/* <input
                      onChange={handleCheckAll}
                      value={isCheckedAll}
                      checked={isCheckedAll}
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    /> */}
                  <Checkbox />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="border border-blue-400">Username</th>
              <th className="border border-blue-400">Họ và tên</th>
              <th className="border border-blue-400">Email</th>
              <th className="border border-blue-400">Ngày tạo</th>
              <th className="border border-blue-400">Trạng thái </th>
              {/* <th className="border border-blue-400">Chức năng</th> */}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="w-4 p-4 text-center">
                    <div className="flex items-center">
                      {/* <input
                          checked={isCheckedItems.includes(item.id)}
                          onChange={(event) => handleCheckItem(event, item.id)}
                          value={isCheckedItems}
                          id={`checkbox-table-search-${item.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        /> */}
                      <Checkbox />
                      <label
                        htmlFor={`checkbox-table-search-${item.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="text-center ">
                    {item.username ? item.username : ""}
                  </td>

                  <td className="text-center">
                    {item && item.lastname && item.firstname
                      ? item.firstname + " " + item.lastname
                      : ""}
                  </td>

                  <td className="text-center">{item.email}</td>
                  <td className="text-center">
                    {item &&
                      item.created_at &&
                      dayjs(item.created_at).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-center text-[12px]">
                    {item.status === 1 ? "Đang hoạt động" : "Đã khóa"}
                  </td>
                </tr>
              ))
            ) : (
              <tr aria-rowspan={7} className="text-center">
                <td
                  colSpan={7}
                  className="text-center font-semibold py-3 text-xl"
                >
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
