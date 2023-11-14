import { useTranslation } from "react-i18next";
import Card from "../../../components/Card/index";
import React from "react";
import { formatDay } from "../../../utils/constants/formatDay";

const UserInfor = ({ dataUser }) => {
  const { t } = useTranslation();
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          {t("Thông tin cá nhân")}
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          Anh/Cô ấy là một người rất có nhiều bí mật 🧐🫣
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">{t("Ngôn ngữ")}</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Tiếng Việt
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">{t("Giới tính")}</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {dataUser && dataUser?.GioiTinh == 1
              ? "Nam"
              : dataUser?.GioiTinh == 2
              ? "Nữ"
              : "Khác"}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">{t("Email")}</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {dataUser && dataUser.Email !== null ? dataUser.Email : "Trống"}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">{t("Số điện thoại")}</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {dataUser && dataUser.SĐT !== null ? dataUser.SĐT : "Trống"}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">{t("Sinh nhật")}</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {formatDay(dataUser ? dataUser.NgaySinh : "Không có")}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserInfor;
