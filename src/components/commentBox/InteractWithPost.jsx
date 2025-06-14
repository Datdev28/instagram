import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCreateComment from "../../hooks/useCreateComment";
import useAuthStore from "../../store/authStore";
import { motion } from "framer-motion";
import useLikePost from "../../hooks/useLikePost";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import AutoResizeTextarea from "../custom/textarea";
import { BsEmojiSmile } from "react-icons/bs";
import Emoj from "../emojPicker/Emoj";
import convertDateTime from "../../utils/convertDateTime";
import useSavePost from "../../hooks/useSavePost";
import { FaBookmark } from "react-icons/fa";
const InteractWithPost = ({
  post,
  setIsOpenModalLikePostWithoutLogin,
  setIsOpenModalShowLikes,
  setShowLikesWithoutLogin,
  setIsOpenModalSaveWithoutLogin
}) => {
  const emojiRef = useRef(null);
  const [showEmoj, setShowEmoj] = useState(false);
  const [commentPost, setCommentPost] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const user = useAuthStore((state) => state.user);
  const [isLike, setIsLike] = useState(false);
  const { handleLikePost, isLiking } = useLikePost(post);
  const navigate = useNavigate();
  const { handleCreateComment, isCommenting } = useCreateComment(
    post?.createBy,
    post?.id,
    commentInput
  );
  const ownerPost = post.createBy === user.uid
  const { isSave, handleSavePost } = useSavePost(post?.id);
  const handleComment = async () => {
    setCommentPost(false);
    await handleCreateComment();
    setCommentInput("");
  };
  const handleLike = () => {
    if (isLiking) return;
    if (!user) {
      setIsOpenModalLikePostWithoutLogin(true);
      setShowLikesWithoutLogin(false);
    } else {
      setIsLike(!isLike);
      handleLikePost();
    }
  };
  const handleOpenModalUsersLike = () => {
    if (user) {
      setIsOpenModalShowLikes(true);
    } else {
      setIsOpenModalLikePostWithoutLogin(true);
      setShowLikesWithoutLogin(true);
    }
  };
  const handleClickSavePost = () => {
    if(user){
     handleSavePost()
    }else {
      setIsOpenModalSaveWithoutLogin(true);
    }
  }
  const handleClickEmoj = useCallback(
    (emojiData) => {
      if (commentInput.length + emojiData.native.length <= 300) {
        setCommentInput((prev) => prev + emojiData.native);
        setShowEmoj(false);
        setCommentPost(true);
      }
    },
    [commentInput]
  );
  useEffect(() => {
    if (post && user) {
      setIsLike(post.likes.some((like) => like.userId === user.uid));
    }
  }, [post?.likes, user?.uid]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoj(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col border-t border-t-color-dash max-sm:border-0 px-4 py-4 gap-y-2">
      <div className="flex justify-between items-center text-2xl">
        <div className="flex items-center gap-x-4">
          {isLike ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.4 }}
              onClick={handleLike}
              className="mt-2 cursor-pointer text-red-500"
            >
              <FaHeart />
            </motion.div>
          ) : (
            <FaRegHeart className="mt-2 cursor-pointer" onClick={handleLike} />
          )}
          <FaRegComment className="cursor-pointer mt-[6px]" />
        </div>
        {isSave ? (
          <FaBookmark className="cursor-pointer" 
           onClick={handleClickSavePost}
          />
        ) : (
          <FaRegBookmark className="cursor-pointer" 
           onClick={handleClickSavePost}
          />
        )}
      </div>
      {post.likes.length > 0 ? (
        post.checkedHideLike && !ownerPost ? (
          <div className="space-x-1">
            <div className="inline space-x-2">
              <img
                src={post.likes[0].profilePicURL}
                className="w-5 h-5 rounded-full object-cover inline cursor-pointer"
                alt="hình ảnh đại diện"
                onClick={() => navigate(`/${post.likes[0].userName}`)}
              />
              <p
                className="inline cursor-pointer"
                onClick={() => navigate(`/${post.likes[0].userName}`)}
              >
                {post.likes[0].userName}
              </p>
            </div>
            <p
              className="inline cursor-pointer"
              onClick={handleOpenModalUsersLike}
            >
              và những người khác đã thích
            </p>
          </div>
        ) : (
          <p
            className="font-semibold cursor-pointer"
            onClick={handleOpenModalUsersLike}
          >
            {post.likes.length} lượt thích
          </p>
        )
      ) : (
        <p>Hãy là người đầu tiên thích bài viết này!</p>
      )}
      <p className="text-color-text-gray text-sm ">
        {convertDateTime(post.createdAt)} trước
      </p>
      {user ? (
        post.turnOfComment ? (
          <div className="text-center py-2 mt-4 border-t-1 border-t-color-dash text-color-text-gray">
            Bài viết này đã giới hạn tính năng bình luận
          </div>
        ) : (
          <div className="gap-x-3 items-center flex relative mt-4 ">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={user.profilePicURL || "/defaultProfilePic.jpg"}
              alt="hình ảnh đại diện"
            />
            <AutoResizeTextarea
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              setCommentPost={setCommentPost}
              handleComment={handleComment}
            />
            <p
              className={`${
                commentPost ? "visible" : "invisible"
              } cursor-pointer text-blue-500 font-semibold text-sm`}
              onClick={handleComment}
            >
              Đăng
            </p>
            {isCommenting && (
              <img
                className="object-cover w-7 h-7 rounded-full"
                src="/loading.gif"
                alt="gif"
              />
            )}
            <BsEmojiSmile
              className="cursor-pointer text-2xl max-sm:absolute max-sm:right-0 "
              onClick={() => setShowEmoj(!showEmoj)}
            />
            {showEmoj && (
              <div className="absolute top-[-140px] right-40 max-xl:right-60">
                <Emoj handleClickEmoj={handleClickEmoj} ref={emojiRef} />
              </div>
            )}
          </div>
        )
      ) : (
        <p className="text-color-text-gray">
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            Log in
          </span>{" "}
          to like or comment
        </p>
      )}
    </div>
  );
};

export default InteractWithPost;
