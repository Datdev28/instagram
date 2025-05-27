import React from "react";
import { CiCamera } from "react-icons/ci";
import userProfileStore from "../../store/userProfileStore";
import ProfileUserPost from "./ProfileUserPost"
import useGetUserPost from "../../hooks/useGetUserPost";
const ProfileUserPosts = () => {
  // const userProfile = userProfileStore((state) => state.userProfile);
  const {posts} = useGetUserPost();
  return (
      <>
        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 w-full">
            {posts.map((post) => (
               <ProfileUserPost post={post}/>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-16 gap-y-2">
            <div className="w-[4.5rem] h-[4.5rem] border-2 rounded-full flex justify-center items-center">
              <CiCamera className="text-5xl" />
            </div>
            <p className="font-bold text-3xl">Chia sẻ ảnh</p>
            <p className="text-center text-md">
              Khi bạn chia sẻ ảnh, ảnh sẽ xuất hiện trên trang cá nhân của bạn
            </p>
            <p className="text-center text-xs text-blue-500">
              Chia sẻ ảnh đầu tiên của bạn
            </p>
          </div>
        )}
      </>
  );
};

export default ProfileUserPosts;
