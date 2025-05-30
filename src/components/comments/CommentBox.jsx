import React, { useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import convertDateTime from "../../utils/convertDateTime";
import { useNavigate } from "react-router-dom";
import ModalSettingPost from "../modal/ModalSettingPost"
const CommentBox = ({ post }) => {
  const { userProfile } = userProfileStore();
  const navigate = useNavigate();
  const [isOpenSettingPost, setIsOpenSettingPost] = useState(false);
  return (
    userProfile &&
    post && (
      <div className="w-full flex flex-col relative bg-black">
        <div className="flex px-2 py-3 justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <img
              src={userProfile.profilePicURL}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              alt="hình ảnh đại diện"
              onClick={() => navigate(`/${userProfile.userName}`)}
            />
            <p className="text-sm cursor-pointer font-bold hover:text-color-text-gray"
              onClick={() => navigate(`/${userProfile.userName}`)}
            >
              {userProfile.userName}
            </p>
          </div>
          <HiOutlineDotsHorizontal className="cursor-pointer text-2xl" onClick={() => setIsOpenSettingPost(true)}/>
        </div>
        <hr className="border-color-note" />
        <div className="flex gap-x-2 px-2 py-4">
          <img
            src={userProfile.profilePicURL}
            className="w-8 h-8 rounded-full object-cover cursor-pointer shrink-0"
            alt="hình ảnh đại diện"
            onClick={() => navigate(`/${userProfile.userName}`)}
          />
          <div className="flex flex-col gap-x-2 w-full">
            <div className="w-full">
              <span className="text-sm mr-2 cursor-pointer font-bold hover:text-color-text-gray"
              onClick={() => navigate(`/${userProfile.userName}`)}
              >
                {userProfile.userName} 
              </span>
              <span className="font-normal break-words break-all whitespace-pre-wrap">{post.caption}</span>
            </div>
            <p className="text-sm text-color-text-gray">{convertDateTime(post.createdAt)}</p>
          </div>
        </div>
        {isOpenSettingPost && <ModalSettingPost isOpenSettingPost={isOpenSettingPost} setIsOpenSettingPost={setIsOpenSettingPost}/>}
      </div>
    )
  );
};

export default CommentBox;
