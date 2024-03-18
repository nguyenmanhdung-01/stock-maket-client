import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cleanUpWhiteSpace } from "../../../../utils/constants/formatStringName";

const DOMAIN = process.env.REACT_APP_STOCK;
const FormDetailNhomQuyen = ({
  setOpen,
  danhSachRoleUser,
  idNhomQuyen,
  fetchData,
}) => {
  // console.log('fetchData: ', fetchData);
  const [dataDetail, setDataDetail] = useState();
  const [defaultTenNhomQuyen, setDefaultTenNhomQuyen] = useState();
  const fetchDataDetail = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/nhomquyen/${idNhomQuyen}`, {
        withCredentials: true,
      });
      //   console.log('res: ', res.data);
      setDataDetail(res.data);
      setDefaultTenNhomQuyen(res.data.TenNhomQuyen);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataDetail();
  }, [idNhomQuyen]);
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
      if (!defaultTenNhomQuyen?.trim().length) {
        return toast.warning("Vui lòng nhập tên nhóm quyền");
      }
      const dataNhomQuyen = {
        RoleGroupID: idNhomQuyen,
        TenNhomQuyen: cleanUpWhiteSpace(defaultTenNhomQuyen),
        NhomQuyen: checkedValues,
      };
      await axios
        .put(`${DOMAIN}/nhomquyen`, dataNhomQuyen, {
          withCredentials: true,
        })
        .then(() => {
          fetchData();
          toast.success("Cập nhật thành công");
          setOpen(false);
        });
      //   console.log('value duoc check: ', checkedValues);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-3 pt-4 text-center">
      {dataDetail && (
        <>
          <div className=" col-span-2 mb-4 bg-inherit h-[40px] w-[50%] flex items-center px-2 rounded-md border-[2px] border-solid border-[#0D7105]">
            <input
              className=" p-2 text-[16px] bg-inherit w-[100%]"
              type="text"
              placeholder=""
              defaultValue={defaultTenNhomQuyen}
              onChange={(e) => setDefaultTenNhomQuyen(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4  max-h-[60vh] text-lg overflow-y-auto">
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
                    <li
                      className="flex items-center gap-1"
                      key={roleItem.QuyenID}
                    >
                      <input
                        type="checkbox"
                        name={roleItem.QuyenID}
                        id={roleItem.QuyenID}
                        value={parseInt(roleItem.QuyenID)}
                        defaultChecked={dataDetail.NhomQuyen.includes(
                          roleItem.QuyenID
                        )}
                      />
                      <label htmlFor={roleItem.QuyenID}>
                        {roleItem.TenQuyen}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            onClick={onSubmit}
            className=" px-6 py-2 bg-blue-500 text-lg rounded-xl mt-4 hover:bg-blue-600"
          >
            Lưu
          </button>
        </>
      )}
    </div>
  );
};

export default FormDetailNhomQuyen;
