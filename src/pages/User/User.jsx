import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserImage from "./components/UserImage";
import UserInfor from "./components/UserInfor";
import YourPost from "./components/YourPost";
import NewsSaved from "./components/NewsSaved";
const DOMAIN = process.env.REACT_APP_STOCK;

const User = () => {
  const userId = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    getDataUser();
  }, []);
  const getDataUser = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/users/getByID/${userId?.id}`);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="flex w-full flex-col gap-5">
        <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
          <div className="col-span-4 lg:!mb-0">
            <UserImage dataUser={data} refreshData={getDataUser} />
          </div>

          {/* <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div> */}
          <div className="col-span-6 lg:col-span-8 lg:mb-0">
            <UserInfor dataUser={data} />
          </div>
        </div>
        <YourPost />
        <NewsSaved />
      </div>
    </div>
  );
};

export default User;
