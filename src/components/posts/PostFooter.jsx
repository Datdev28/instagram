import React from "react";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { LuMessageCircle } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
const PostFooter = ({ numberOfLikes }) => {
  const [isLike, setIsLike] = useState(false);
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-4">
        {isLike ? (
          <FaHeart
            className="text-3xl cursor-pointer text-red-500"
            onClick={() => {
              setIsLike(!isLike);
            }}
          />
        ) : (
          <FiHeart
            className="text-3xl cursor-pointer "
            onClick={() => {
              setIsLike(!isLike);
            }}
          />
        )}
        <LuMessageCircle className="text-3xl cursor-pointer" />
      </div>
      <p>{numberOfLikes} lượt thích</p>
      <p>Mừng ngày lễ 30/4</p>
      <p className="text-color-text-gray">Xem tất cả 1000 bình luận</p>
      <input
        type="text"
        placeholder="Bình luận..."
        className={`border-none focus:outline-none py-2 placeholder:text-color-text-gray`}
      />
      <hr className="text-color-dash" />
    </div>
  );
};

export default PostFooter;
