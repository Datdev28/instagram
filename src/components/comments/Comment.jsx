import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import convertDateTime from "../../utils/convertDateTime";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import { FaHeart } from "react-icons/fa";
import useLikeComment from "../../hooks/useLikeComment";
import useAuthStore from "../../store/authStore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Comment = ({ comment }) => {
  const navigate = useNavigate();
  const { userProfile } = useGetProfileUserById(comment.createBy);
  const user = useAuthStore((state) => state.user);
  const [isLike, setIsLike] = useState(false);
  const { handleClickLike, liking } = useLikeComment(
    comment.id,
    comment.postId
  );
  const handleLike = () => {
    if (liking) return;
    setIsLike(!isLike);
    handleClickLike();
  };
  useEffect(() => {
    if (user) {
      setIsLike(comment.likesOfComment.includes(user.uid));
    }
  }, [comment.likesOfComment, user?.uid]);
  return (
    userProfile && (
      <div className="flex gap-x-2 text-sm">
        <img
          src={`${userProfile.profilePicURL}`}
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
          alt="avatar"
          onClick={() => navigate(`/${userProfile.userName}`)}
        />
        <div className="flex-1">
          <span
            className="font-semibold cursor-pointer"
            onClick={() => navigate(`/${userProfile.userName}`)}
          >
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
        {user &&
          (isLike ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.4 }}
              onClick={handleLike}
              className="mt-2 cursor-pointer text-red-500"
            >
              <FaHeart />
            </motion.div>
          ) : (
            <FaRegHeart className="mt-2 cursor-pointer" onClick={handleLike} />
          ))}
      </div>
    )
  );
};

export default Comment;
