import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import Checkbox from "../../../../components/checkbox";
import { FiSearch } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const options = [
  {
    label: "Đã xem",
    value: 1,
  },
  {
    label: "Chưa phản hồi",
    value: 2,
  },
  {
    label: "Đã phản hồi",
    value: 3,
  },
];
const ContactManager = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState([]);
  return (
    <div>
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
        <div className="relative mt-[3px] flex h-[61px] w-[495px] z-40 flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[495px] md:flex-grow-0 md:gap-1 xl:w-[495px] xl:gap-2">
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
            classNamePrefix={" outline-none focus:outline-none"}
            placeholder="Lọc trạng thái"
            maxMenuHeight={90}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "" : "",
                borderRadius: "20px",
                outline: state.isFocused ? "" : "",
              }),
            }}
          />
        </div>
      </div>
      <div className=" mt-4 p-4 rounded-2xl bg-white shadow-xl dark:!bg-navy-800 dark:text-white">
        <table className="border border-blue-400 w-full mt-10 relative">
          <thead>
            <tr>
              <th scope="col" className="p-4 border border-blue-400">
                <div className="flex items-center">
                  <Checkbox />
                </div>
              </th>
              <th className="border border-blue-400">Tên người gửi</th>
              <th className="border border-blue-400">Chủ đề</th>
              <th className="border border-blue-400">Tiêu đề</th>
              <th className="border border-blue-400">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {contact.length ? (
              contact.map((item) => {
                //console.log(item);
                return (
                  <tr key={item.contact_id}>
                    <td className="w-4 p-4 text-center">
                      <div className="flex items-center">
                        <input
                          //checked={isCheckedItems.includes(item.contact_id)}
                          // onChange={(event) =>
                          //   handleCheckItem(event, item.contact_id)
                          // }
                          // value={isCheckedItems}
                          id={`checkbox-table-search-${item.contact_id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${item.contact_id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td
                      className="line-clamp-1 m-auto cursor-pointer hover:opacity-90 hover:bg-gray-200"
                      onClick={() =>
                        navigate(`/admin/contact/${item.contact_id}`)
                      }
                    >
                      <div className="flex items-center flex-col">
                        <span>
                          {item.status === 1 ? (
                            <HiOutlineMailOpen className="w-[25px] h-[25px]" />
                          ) : (
                            <HiOutlineMail className="w-[25px] h-[25px]" />
                          )}
                        </span>
                        <span>{item.username}</span>
                      </div>
                    </td>

                    <td className="text-center">{item.topic}</td>

                    <td className="text-center line-clamp-1 w-[200px]">
                      {item.title}
                    </td>
                    <td className="text-center">
                      {dayjs(item.created_at).format("DD/MM/YYYY")}
                    </td>
                  </tr>
                );
              })
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

export default ContactManager;
