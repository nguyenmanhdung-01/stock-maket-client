import React, { useCallback, useState } from "react";

import Card from "../../../components/Card/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ModalV1 from "../../../components/Modal/ModalV1";
import Modal from "../../../components/Modal/Modal";
import EditUser from "./EditUser";
import { useForm } from "react-hook-form";
import ImageCrop from "./cropImage";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "./ChangePassword";
import { useTranslation } from "react-i18next";
const defaltImg =
  "/assets/images/default-avatar-profile-icon-of-social-media-user-vector";
const UserImage = ({ dataUser, refreshData, posts }) => {
  // console.log("dataUser", dataUser);
  const { t } = useTranslation();
  const {
    setValue,
    formState: { errors },
  } = useForm();
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(defaltImg);
  const onDrop = useCallback((acceptedFiles) => {
    setValue("Avatar", acceptedFiles[0]);
    setAvatarPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const [open, setOpen] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openEditImage, setOpenEditImage] = useState(false);
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(/assets/images/banner.png)` }}
      >
        <div className="absolute -bottom-12 flex h-[127px] w-[120px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <div className=" relative group/item flex h-[127px] w-[120px] items-center justify-center rounded-full border-[4px] border-white">
            <img
              className="h-full w-full rounded-full object-cover"
              src={
                dataUser?.Avatar !== null
                  ? dataUser?.Avatar
                  : "/assets/images/img_user.png"
              }
              alt="Ảnh đại diện"
            />
            <FontAwesomeIcon
              onClick={() => setOpenEditImage(true)}
              icon="fa-solid fa-pen"
              className="p-2 absolute right-0 top-12 hidden bg-white dark:bg-navy-700 rounded-full cursor-pointer hover:bg-slate-100 group-hover/item:block"
            />
          </div>
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {dataUser ? dataUser.HoVaTen : ""}
        </h4>
        <p className="text-base font-normal text-gray-600">
          {dataUser && dataUser.RoleGroupID !== null
            ? dataUser.RoleGroupID.TenNhomQuyen
            : "Vị trí"}
        </p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-5">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {posts}
          </p>
          <p className="text-sm font-normal text-gray-600">{t("Bài viết")}</p>
        </div>

        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            setOpenChangePassword(true);
          }}
        >
          <FontAwesomeIcon icon={faKey} className=" h-6 w-6" />
          <p className="text-sm mt-1 font-bold text-navy-700 dark:text-white">
            {t("Thay đổi mật khẩu")}
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} className=" h-6 w-6" />
          <p className="text-sm mt-1 font-bold text-navy-700 dark:text-white">
            {t("Thay đổi thông tin")}
          </p>
        </div>
      </div>
      <ModalV1
        open={open}
        setOpen={setOpen}
        title={"Chỉnh sửa thông tin cá nhân"}
      >
        <EditUser
          dataUser={dataUser}
          setOpen={setOpen}
          refreshData={refreshData}
        />
      </ModalV1>
      <ModalV1
        open={openChangePassword}
        setOpen={setOpenChangePassword}
        title={"Thay đổi mật khẩu"}
      >
        <ChangePassword
          dataUser={dataUser}
          setOpen={setOpenChangePassword}
          refreshData={refreshData}
        />
      </ModalV1>
      <Modal open={openEditImage} setOpen={setOpenEditImage}>
        <ImageCrop
          avatarPreviewUrl={avatarPreviewUrl}
          setAvatarPreviewUrl={setAvatarPreviewUrl}
          setOpen={setOpenEditImage}
          refreshData={refreshData}
        />
      </Modal>
    </Card>
  );
};

export default UserImage;
