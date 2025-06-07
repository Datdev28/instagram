import React from "react";
import { FaRegHeart } from "react-icons/fa";
import convertDateTime from "../../utils/convertDateTime";
const Comment = ({comment}) => {
  return (
    <div className="flex gap-x-2 text-sm">
      <img
        src="/defaultProfilePic.jpg"
        className="w-8 h-8 rounded-full object-cover cursor-pointer"
        alt="avatar"
      />
      <div className="flex-1">
        <span className="font-semibold cursor-pointer">
          quangdat.ng{" "}
        </span>
          <span className="ml-1 break-all break-words">{comment.comment}</span>
          <div className="flex items-center gap-x-3 text-color-text-gray text-xs mt-1">
            <span>{convertDateTime(comment.createdAt)}</span>
            <span>3 lượt thích</span>
            <span className="cursor-pointer">Trả lời</span>
          </div>
      </div>
      <FaRegHeart className="mt-2 cursor-pointer"/>
    </div>
  );
};

export default Comment;
