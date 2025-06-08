import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import convertDateTime from "../../utils/convertDateTime";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import { FaHeart } from "react-icons/fa";
import useLikeComment from "../../hooks/useLikeComment";
import useAuthStore from "../../store/authStore";
const Comment = ({ comment }) => {
  const { userProfile } = useGetProfileUserById(comment.createBy);
  const user = useAuthStore((state) => state.user);
  const [isLike, setIsLike] = useState(false);
  const handleClickLike = useLikeComment(comment.id, comment.postId);
  const handleLike = () => {
    setIsLike(!isLike)
    handleClickLike();
  };
  useEffect(() => {
     setIsLike(comment.likesOfComment.includes(user.uid));
  }, [comment.likesOfComment, user?.uid])
  return (
    userProfile && (
      <div className="flex gap-x-2 text-sm">
        <img
          src={`${userProfile.profilePicURL}`}
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
          alt="avatar"
        />
        <div className="flex-1">
          <span className="font-semibold cursor-pointer">
            {userProfile.userName}
          </span>
          <span className="ml-1 break-all break-words">{comment.comment}</span>
          <div className="flex items-center gap-x-3 text-color-text-gray text-xs mt-1">
            <span>{convertDateTime(comment.createdAt)}</span>
            {comment.likesOfComment.length > 0 && (
              <span>{comment.likesOfComment.length} lượt thích</span>
            )}
            <span className="cursor-pointer">Trả lời</span>
          </div>
        </div>
        {isLike ? (
          <FaHeart
            className="mt-2 cursor-pointer text-red-500"
            onClick={handleLike}
          />
        ) : (
          <FaRegHeart className="mt-2 cursor-pointer" onClick={handleLike} />
        )}
      </div>
    )
  );
};

export default Comment;
