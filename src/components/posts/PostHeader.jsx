import React from "react";
import { LuDot } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
const PostHeader = ({name}) => {
  return (
    <div className="flex justify-between text-white text-md items-center ">
      <div className="flex gap-x-4 items-center">
        <img
          src="profile.jpg"
          className="w-[2rem] h-[2rem] rounded-full"
          alt="avatar"
        />
        <div className="flex items-center">
          <p>{name}</p>
          <LuDot className="mt-1 text-color-text-gray"/>
          <span className="text-color-text-gray">5 giờ</span>
        </div>
      </div>
      <div className="cursor-pointer">
        <HiDotsHorizontal/>
      </div>
    </div>
  );
};

export default PostHeader;
