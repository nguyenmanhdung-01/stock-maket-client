import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserImage from "./components/UserImage";
import UserInfor from "./components/UserInfor";
import YourPost from "./components/YourPost";
import NewsSaved from "./components/NewsSaved";

const DOMAIN = process.env.REACT_APP_STOCK;

const User = () => {
  const userId = useParams();
  const [data, setData] = useState();
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    console.log("tại sao k chạy");
    getDataUser();
    getPostByUser();
  }, [userId]);

  const getDataUser = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/users/getByID/${userId?.id}`);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPostByUser = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/post/${userId?.id}/posts`);
      // console.log("response", response);
      setDataPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex w-full flex-col gap-5">
        <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
          <div className="col-span-4 lg:!mb-0">
            <UserImage
              dataUser={data}
              refreshData={getDataUser}
              posts={dataPost.length}
            />
          </div>

          {/* <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div> */}
          <div className="col-span-6 lg:col-span-8 lg:mb-0">
            <UserInfor dataUser={data} />
          </div>
        </div>
        <YourPost dataPost={dataPost} refreshData={getPostByUser} />
        <NewsSaved />
      </div>
    </div>
  );
};

export default User;
