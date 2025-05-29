  import React from "react";
  import userProfileStore from "../../store/userProfileStore";
  import { HiOutlineDotsHorizontal } from "react-icons/hi";
  import convertDateTime from "../../utils/convertDateTime";

  const CommentBox = ({ post }) => {
    const { userProfile } = userProfileStore();
    return (
      userProfile && post && (
        <div className="w-full flex flex-col">
          <div className="flex px-2 py-3 justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <img
                src={userProfile.profilePicURL}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                alt="hình ảnh đại diện"
              />
              <p className="text-sm cursor-pointer font-bold hover:text-color-text-gray">
                {userProfile.userName}
              </p>
            </div>
            <HiOutlineDotsHorizontal className="cursor-pointer text-2xl" />
          </div>
          <hr className="border-color-note" />
          <div className="flex gap-x-2 items-center p-2">
            <img
              src={userProfile.profilePicURL}
              className="w-8 h-8 rounded-full object-cover cursor-pointer shrink-0"
              alt="hình ảnh đại diện"
            />
            <div className="flex flex-col gap-x-2 w-full">
              <div className="flex gap-x-2 break-words w-full">
              <p className="text-sm cursor-pointer font-bold hover:text-color-text-gray s">
                {userProfile.userName}
              </p>
              <p className="whitespace-pre-wrap">{post.caption}qqưeqqqqqqqqqqqqqq</p>
              </div>
              <p>{convertDateTime(post.createdAt)}</p>
            </div>
          </div>
        </div>
      )
    );
  };

  export default CommentBox;
