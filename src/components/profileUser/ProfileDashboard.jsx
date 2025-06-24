import React from "react";
import useMostInteractedPost from "../../hooks/useMostInteractedPost";
import useAuthStore from "../../store/authStore";
import { NoPosts } from "./ProfileUserPosts";
const ProfileDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { post, isGetting } = useMostInteractedPost(user?.uid);
  const noPost = !post && isGetting;
  if (noPost) return <NoPosts />;
  return (
    <div className="flex justify-between min-h-[50vh] py-4">
      <div className="flex flex-col gap-y-4">
        <p className="text-xl font-bold">Bài viết có nhiều lượt thích nhất</p>
        <div className="h-[400px] w-[300px] flex justify-center items-center">
          {!isGetting ? (
            <img
              className="object-cover w-20 h-20 rounded-full"
              src="/loading.gif"
              alt="gif"
            />
          ) : (
            <img
              src={post?.imageOfPost[0]}
              className="w-full h-full object-cover rounded-md"
              alt="hình ảnh bài đăng"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
