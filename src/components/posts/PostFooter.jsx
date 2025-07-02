import { useEffect, useState } from "react";
import ModalShowLikes from "../modal/ModalShowLikes";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { FaHeart } from "react-icons/fa6";
const PostFooter = ({ post }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const ownerPost = post.createBy === user?.uid;
  const [isLiked, setIsLiked] = useState(false);
  const [isOpenModalShowLikes, setIsOpenModalShowLikes] = useState(false);
  const { userProfile, userTargetProfile } = useGetProfileUserById(
    post?.likes[0],
    post?.createBy
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const handleInteractWithPost = () => {
    navigate(`/p/${post.id}`, {
      state: {
        background: location,
      },
    });
  };
  const handleClickOpenModalUsersLike = () => {
    setIsOpenModalShowLikes(true);
  };
  useEffect(() => {
    setIsLiked(post.likes.includes(user.uid))
  }, [])
  const captionText = post?.caption || "";
  const shouldTruncate = captionText.length > 50 && !isExpanded;
  const displayText = shouldTruncate ? captionText.slice(0, 50) : captionText;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {isLiked ? (
            <FaHeart className="text-2xl cursor-pointer text-red-500" />
          ) : (
           <FaRegHeart className="text-2xl cursor-pointer" onClick={handleInteractWithPost}/>
          )}
          <FaRegComment className="text-2xl cursor-pointer" onClick={handleInteractWithPost}/>
        </div>
        <FaRegBookmark className="text-2xl cursor-pointer" onClick={handleInteractWithPost}/>
      </div>
      <div>
        {post.checkedHideLike && !ownerPost ? (
          <div className="space-x-1">
            <div className="inline space-x-2">
              <img
                src={userProfile?.profilePicURL}
                className="w-5 h-5 rounded-full object-cover inline cursor-pointer"
                alt="hình ảnh đại diện"
                onClick={() => navigate(`/${userProfile?.userName}`)}
              />
              <p
                className="inline cursor-pointer"
                onClick={() => navigate(`/${userProfile?.userName}`)}
              >
                {userProfile?.userName}
              </p>
            </div>
            <p
              className="inline cursor-pointer"
              onClick={handleClickOpenModalUsersLike}
            >
              và những người khác đã thích
            </p>
          </div>
        ) : (
          post.likes.length > 0 && (
            <p
              className="font-semibold cursor-pointer"
              onClick={handleClickOpenModalUsersLike}
            >
              {post.likes.length} lượt thích
            </p>
          )
        )}
      </div>

      <div className="text-white">
        <span className="font-bold">{userTargetProfile?.userName}</span>
        <span className="font-normal ml-1">
          {displayText}
          {shouldTruncate && (
            <>
              ...
              <button
                className="text-sm text-blue-400 ml-1"
                onClick={() => setIsExpanded(true)}
              >
                xem thêm
              </button>
            </>
          )}
        </span>
      </div>
      <div>
        {isOpenModalShowLikes && (
          <ModalShowLikes
            post={post}
            isOpenModalShowLikes={isOpenModalShowLikes}
            setIsOpenModalShowLikes={setIsOpenModalShowLikes}
          />
        )}
      </div>
    </div>
  );
};

export default PostFooter;
