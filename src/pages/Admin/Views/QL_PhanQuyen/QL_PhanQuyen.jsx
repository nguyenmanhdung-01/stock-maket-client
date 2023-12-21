import React, { useEffect, useState } from "react";

import useAuth from "../../../../hooks/redux/auth/useAuth";
import { getNhomQuyen } from "../../../../utils/constants/formatStringName";
import { FetchRoleUser } from "../../../../utils/getAll/FetchRoleUser";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../../../../components/Card";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../../components/checkbox";
import FormDetailNhomQuyen from "./FormDetailNhomQuyen";
import ModalDelete from "../../../../components/Modal/ModalDelete";
import ModalV1 from "../../../../components/Modal/ModalV1";
import FormAddNhomQuyen from "./FormAddNhomQuyen";
import { FiSearch } from "react-icons/fi";
const DOMAIN = process.env.REACT_APP_STOCK;

const QL_PhanQuyen = () => {
  const { auth } = useAuth();
  const nhomQuyen = getNhomQuyen(auth);
  const tenDangNhapAdmin = auth.userID?.TenDangNhap.toLowerCase() === "admin";
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [openDetailNhomQuyen, setOpenDetailNhomQuyen] = useState(false);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [danhSachRoleUser, setDanhSachRoleUser] = useState([]);
  const [dataDanhSachRoleGroup, setDataDanhSachRoleGroup] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [idNhomQuyen, setIDNhomQuyen] = useState();
  const [openFormAddNhomQuyen, setOpenFormAddNhomQuyen] = useState(false);
  const [openFormDeleteChild, setOpenFormDeleteChild] = useState(false);

  // console.log('auth: ', auth.roleGroupID.NhomQuyen);
  const groupQuyenByQuyenIDCha = (danhSachQuyens) => {
    const quyenMap = {};
    const topLevelQuyens = [];

    // Tạo một map để ánh xạ các comment theo id
    for (const quyen of danhSachQuyens) {
      const quyenID = quyen.QuyenID;

      if (!quyenMap[quyenID]) {
        quyenMap[quyenID] = {
          ...quyen,
          children: [],
        };
      }

      const mappedQuyen = quyenMap[quyenID];

      // Kiểm tra nếu có father_id, thêm comment hiện tại vào danh sách con của cha tương ứng
      if (quyen.QuyenIDCha) {
        if (!quyenMap[quyen.QuyenIDCha]) {
          quyenMap[quyen.QuyenIDCha] = {
            children: [],
          };
        }

        quyenMap[quyen.QuyenIDCha].children.push(mappedQuyen);
      } else {
        topLevelQuyens.push(mappedQuyen);
      }

      // Kiểm tra nếu comment hiện tại đã có con trong map, thì gán danh sách con của nó vào comment hiện tại
      if (quyenMap[quyenID].children.length > 0) {
        mappedQuyen.children = quyenMap[quyenID].children;
      }
    }
    // console.log('topLevelQuyens: ', topLevelQuyens);
    return topLevelQuyens;
  };
  const fetchDanhSachRoleUser = async () => {
    try {
      const res = await FetchRoleUser();
      const newData = groupQuyenByQuyenIDCha(res);
      console.log("newData: ", newData);
      setDanhSachRoleUser(newData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDanhSachRoleUser();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/nhomquyen?search=${searchKey}`, {
        withCredentials: true,
      });
      setDataDanhSachRoleGroup(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenFormDelete = (id) => {
    setIDNhomQuyen(id);
    setOpenFormDelete(true);
  };
  const handleDeleteOneNhomQuyen = async () => {
    try {
      const data = {
        RoleGroupID: idNhomQuyen,
      };
      const res = await axios.delete(`${DOMAIN}/nhomQuyen`, {
        data: data,
        withCredentials: true,
      });
      fetchData();
      setOpenFormDelete(false);
      toast.success("Xóa thành công");
      // console.log('res delete: ', res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchKey]);

  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = dataDanhSachRoleGroup?.every((item) =>
      isCheckedItems.includes(item.RoleGroupID)
    );
    setIsCheckedAll(isAllChecked);
  }, [dataDanhSachRoleGroup, isCheckedItems]);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);

    if (isChecked) {
      // Chọn tất cả các checkbox phụ
      const allItemIds = dataDanhSachRoleGroup.map((item) => item.RoleGroupID);
      setIsCheckedItems(allItemIds);
    } else {
      // Bỏ chọn tất cả các checkbox phụ
      setIsCheckedItems([]);
    }
  };

  const handleCheckItem = (event, itemId) => {
    const isChecked = event.target.checked;
    let updatedCheckedItems = [...isCheckedItems];

    if (isChecked) {
      // Chọn checkbox phụ
      updatedCheckedItems.push(itemId);
    } else {
      // Bỏ chọn checkbox phụ
      updatedCheckedItems = updatedCheckedItems.filter((id) => id !== itemId);
    }

    setIsCheckedItems(updatedCheckedItems);
  };

  const handleDeleteManyNhomQuyen = async () => {
    try {
      // console.log("id nhom quyen: ", isCheckedItems);
      await axios
        .delete(`${DOMAIN}/nhomQuyen/many`, {
          data: isCheckedItems,
          withCredentials: true,
        })
        .then(() => {
          fetchData();
          setOpenFormDeleteChild(false);
          toast.success("Xóa thành công");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card>
      <div className="flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
        {tenDangNhapAdmin ? (
          <div className=" p-4 rounded-2xl bg-white shadow-xl dark:!bg-navy-800 dark:text-white">
            <div>
              <button
                onClick={() => setOpenFormAddNhomQuyen(true)}
                className=" bg-green-500 text-white px-3 py-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                <span>Thêm nhóm quyền</span>
              </button>
              <button
                onClick={() => {
                  if (!isCheckedItems.length) {
                    return;
                  }
                  setOpenFormDeleteChild(true);
                }}
                className=" bg-red-500 text-white px-3 py-2 rounded-lg ml-3"
              >
                <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
                <span>Xóa lựa chọn</span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="relative mt-[3px] flex flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
          <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <p className="pl-3 pr-2 text-xl">
              <FiSearch className="h-6 w-6 text-gray-400 dark:text-white" />
            </p>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              defaultValue={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="block w-full py-2 rounded-full bg-lightPrimary text-base font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
            />
          </div>
          <button
            // onClick={handleResetFillter}
            className="py-1 px-4 font-semibold text-base bg-gray-500 rounded-[20px] text-white hover:bg-primaryColor"
          >
            Xóa bộ lọc
          </button>
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
                  <Checkbox
                    checked={isCheckedAll}
                    value={isCheckedAll}
                    handleChange={handleCheckAll}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="border border-blue-400">ID</th>
              <th className="border border-blue-400">Tên nhóm quyền</th>
              {tenDangNhapAdmin ? (
                <th className="border border-blue-400">Chức năng</th>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {dataDanhSachRoleGroup.length > 0 ? (
              dataDanhSachRoleGroup.map((item) => (
                <tr key={item?.RoleGroupID}>
                  <td className="w-4 p-4 text-center">
                    <div className="flex items-center">
                      <Checkbox
                        checked={isCheckedItems.includes(item?.RoleGroupID)}
                        handleChange={(event) =>
                          handleCheckItem(event, item?.RoleGroupID)
                        }
                        value={isCheckedItems}
                      />
                      <label
                        htmlFor={`checkbox-table-search-${item.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="text-center ">
                    {item.RoleGroupID ? item.RoleGroupID : ""}
                  </td>

                  <td className="text-center">{item?.TenNhomQuyen}</td>
                  {tenDangNhapAdmin ? (
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setOpenDetailNhomQuyen(true);
                          setIDNhomQuyen(item.RoleGroupID);
                        }}
                        className="px-3 py-2 bg-blue-500 rounded-xl mr-2"
                      >
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          className=" text-xl cursor-pointer text-white"
                        />
                      </button>
                      <button
                        onClick={() => handleOpenFormDelete(item.RoleGroupID)}
                        className="px-3 py-2 bg-red-500 rounded-xl"
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className=" text-xl cursor-pointer text-white"
                        />
                      </button>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            ) : (
              <tr aria-rowspan={4} className="text-center">
                <td
                  colSpan={4}
                  className="text-center font-semibold py-3 text-xl"
                >
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalV1
        open={openFormAddNhomQuyen}
        setOpen={setOpenFormAddNhomQuyen}
        title="Thêm nhóm quyền"
        changeHeight={true}
        classNameChildren={"w-[900px]"}
      >
        <FormAddNhomQuyen
          setOpen={setOpenFormAddNhomQuyen}
          danhSachRoleUser={danhSachRoleUser}
          fetchData={fetchData}
        />
      </ModalV1>
      <ModalV1
        open={openDetailNhomQuyen}
        setOpen={setOpenDetailNhomQuyen}
        title="Chi tiết nhóm quyền"
        changeHeight={true}
        classNameChildren={"w-[900px]"}
      >
        <FormDetailNhomQuyen
          setOpen={setOpenDetailNhomQuyen}
          danhSachRoleUser={danhSachRoleUser}
          idNhomQuyen={idNhomQuyen}
          fetchData={fetchData}
        />
      </ModalV1>

      <ModalDelete
        open={openFormDelete}
        setOpen={setOpenFormDelete}
        onOK={handleDeleteOneNhomQuyen}
      ></ModalDelete>
      <ModalDelete
        open={openFormDeleteChild}
        setOpen={setOpenFormDeleteChild}
        onOK={handleDeleteManyNhomQuyen}
      />
    </Card>
  );
};

export default QL_PhanQuyen;
