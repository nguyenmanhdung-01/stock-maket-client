import { useEffect, useState } from "react";

import useAuth from "../../../../hooks/redux/auth/useAuth";
import axios from "axios";
import UserImage from "../../../User/components/UserImage";
import UserInfor from "../../../User/components/UserInfor";
import YourPost from "../../../User/components/YourPost";
import NewsSaved from "../../../User/components/NewsSaved";

const DOMAIN = process.env.REACT_APP_STOCK;

const ProfileOverview = () => {
  const { auth } = useAuth();
  const [data, setData] = useState();
  const [dataPost, setDataPost] = useState([]);
  useEffect(() => {
    getDataUser();
    getPostByUser();
  }, []);
  const getDataUser = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/users/getByID/${auth.userID?.id}`
      );
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPostByUser = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/post/${auth.userID?.id}/posts`
      );
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
        <YourPost dataPost={dataPost} />
        <NewsSaved />
      </div>
    </div>
  );
};

export default ProfileOverview;
