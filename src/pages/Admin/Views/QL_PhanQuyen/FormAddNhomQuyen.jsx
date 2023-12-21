import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { cleanUpWhiteSpace } from "../../../../utils/constants/formatStringName";
// import QuyenItem from "./QuyenItem";

const DOMAIN = process.env.REACT_APP_STOCK;
const FormAddNhomQuyen = ({ danhSachRoleUser, setOpen, fetchData }) => {
  const [tenGroupRole, setTenGroupRole] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkedValues = [];
      danhSachRoleUser.forEach((roleUserItem) => {
        roleUserItem.children.forEach((roleItem) => {
          const input = document.getElementById(roleItem.QuyenID);

          if (input && input.checked) {
            checkedValues.push(roleItem.QuyenID);
          }
        });
      });

      if (!checkedValues.length) {
        return toast.warning("Vui lòng chọn ít nhất một quyền");
      }
      if (!tenGroupRole?.trim().length) {
        return toast.warning("Vui lòng nhập tên nhóm quyền");
      }
      const dataNhomQuyen = {
        TenNhomQuyen: cleanUpWhiteSpace(tenGroupRole),
        NhomQuyen: checkedValues,
      };
      await axios
        .post(`${DOMAIN}/nhomquyen`, dataNhomQuyen, { withCredentials: true })
        .then(() => {
          fetchData();
          setOpen(false);
          toast.success("Thêm nhóm quyền thành công");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const [checkedQuyens, setCheckedQuyens] = useState({});
  const handleCheck = (quyenID, isChecked) => {
    setCheckedQuyens((prevCheckedQuyens) => ({
      ...prevCheckedQuyens,
      [quyenID]: isChecked,
    }));
  };
  return (
    <div className="px-3 pt-4 text-center">
      <div className=" col-span-2 mb-4 bg-inherit h-[40px] w-[50%] flex items-center px-2 rounded-md border-[2px] border-solid border-[#0D7105]">
        <input
          className=" p-2 text-[16px] bg-inherit w-[100%]"
          type="text"
          placeholder="Nhập tên nhóm quyền"
          defaultValue={tenGroupRole}
          onChange={(e) => setTenGroupRole(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto text-lg">
        {danhSachRoleUser.map((roleUserItem, idx) => (
          <div key={idx} className="border p-1 rounded-lg">
            <h3
              className="font-bold pb-1"
              style={{ borderBottom: "2px solid #ccc" }}
            >
              {roleUserItem.TenQuyen}
            </h3>
            <ul className="mt-2 max-h-[20vh] overflow-y-auto">
              {roleUserItem.children.map((roleItem) => (
                <li className="flex items-center gap-1" key={roleItem.QuyenID}>
                  <input
                    type="checkbox"
                    name={roleItem.QuyenID}
                    id={roleItem.QuyenID}
                    value={parseInt(roleItem.QuyenID)}
                  />
                  <label htmlFor={roleItem.QuyenID}>{roleItem.TenQuyen}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto">
        {danhSachRoleUser.map((roleUserItem, idx) => (
          <div key={idx} className="border p-1 rounded-lg">
            <h3 className="font-bold pb-1" style={{ borderBottom: '2px solid #ccc' }}>
              {roleUserItem.TenQuyen}
            </h3>
            <ul className="mt-2 max-h-[20vh] overflow-y-auto">
              {roleUserItem.children.map((roleItem) => (
                <QuyenItem key={roleItem.QuyenID} quyen={roleItem} onCheck={handleCheck} />
              ))}
            </ul>
          </div>
        ))}
      </div> */}
      <button
        onClick={onSubmit}
        className=" px-6 py-2 bg-blue-500 text-lg rounded-xl mt-4 hover:bg-blue-600"
      >
        Tạo
      </button>
    </div>
  );
};

export default FormAddNhomQuyen;
