import React from "react";
import ProfileUserHeader from "../../components/profileUser/ProfileUserHeader";
import ProfileTabs from "../../components/profileUser/ProfileTabs";
import ProfileUserPosts from "../../components/profileUser/ProfileUserPosts";
import { useParams } from "react-router-dom";
import useGetProfileUserByUsername from "../../hooks/useGetProfileUserByUsername";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetProfileUserByUsername(username);
  const findUserInfo = !userProfile && isLoading;
  console.log(userProfile);
  if (findUserInfo) return <UserNotFound />;
  return (
    userProfile && (
      <div className="text-white flex flex-col w-full items-center pt-16 overflow-y-auto">
        <div className="flex  w-full flex-col items-center">
          <ProfileUserHeader />
        </div>
        <div className="flex w-full max-w-4xl flex-col">
          <ProfileTabs />
        </div>
        <div className="w-full max-w-4xl flex justify-center">
          <ProfileUserPosts />
        </div>
      </div>
    )
  );
};

export default ProfilePage;

const UserNotFound = () => {
  return (
    <div className="w-full flex flex-col items-center text-white justify-center h-[80vh] px-4">
      <div className="max-w-md text-center">
        <p className="text-2xl font-bold mb-2 md:whitespace-nowrap">
          Rất tiếc, trang này hiện không khả dụng.
        </p>
      </div>
      <div>
        <p className="text-sm md:whitespace-nowrap max-md:text-center">
          Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ
          bỏ.
          <Link to="/">
            <span className="text-blue-500 hover:underline cursor-pointer ml-1">
              Quay lại instagram.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
