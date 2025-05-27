import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
const ProfileUserPost = ({ post }) => {
  return (
    <div className="flex relative group">
      <img
        src={post.imageOfPost[0]}
        className="object-cover w-full max-h-[440px] hover:opacity-40 cursor-pointer"
        alt="bài đăng"
      />
      <div className="flex absolute top-1/2 left-1/2 items-center gap-x-6 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white">
        <div className="flex items-center gap-x-2">
          <FaHeart />
          <span className="font-semibold text-xl mt-[-3px]">
            {post.likes.length}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <FaComment />
          <span className="font-semibold text-xl mt-[-3px]">
            {post.comments.length}
          </span>
        </div>
      </div>
      {post.imageOfPost.length > 1 && (
        <div className="absolute top-2 right-2">
          <IoMdImages className="text-xl" />
        </div>
      )}
    </div>
  );
};

export default ProfileUserPost;
