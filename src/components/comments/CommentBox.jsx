import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import convertDateTime from "../../utils/convertDateTime";
import { useNavigate } from "react-router-dom";
import ModalSettingPost from "../modal/ModalSettingPost";
import ModalConfirmDeletePost from "../modal/ModalConfirmDeletePost";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import AutoResizeTextarea from "../custom/textarea";
import { BsEmojiSmile } from "react-icons/bs";
import Emoj from "../emojPicker/Emoj";
import Comment from "./Comment";
import useCreateComment from "../../hooks/useCreateComment";
import useAuthStore from "../../store/authStore";
const CommentBox = ({ post }) => {
  const navigate = useNavigate();
  const emojiRef = useRef(null);
  const [showEmoj, setShowEmoj] = useState(false);
  const [isOpenSettingPost, setIsOpenSettingPost] = useState(false);
  const [isOpenModalConfirmDeletePost, setIsOpenModalConfirmDeletePost] =
    useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentPost, setCommentPost] = useState(false);
  const { handleCreateComment, isCommenting } = useCreateComment(
    post?.id,
    commentInput
  );
  const user = useAuthStore((state) => state.user);
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
  const handleComment = async () => {
    setCommentPost(false);
    await handleCreateComment();
    setCommentInput("");
  };
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
    post && (
      <div className="w-full flex flex-col relative bg-black text-white">
        <div className="flex px-4 py-3 justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <img
              src={post.byAvaUser}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              alt="hình ảnh đại diện"
              onClick={() => navigate(`/${post.byUserName}`)}
            />
            <p
              className="text-sm cursor-pointer font-bold hover:text-color-text-gray"
              onClick={() => navigate(`/${post.byUserName}`)}
            >
              {post.byUserName}
            </p>
          </div>
          <HiOutlineDotsHorizontal
            className="cursor-pointer text-2xl"
            onClick={() => setIsOpenSettingPost(true)}
          />
        </div>
        <hr className="border-color-note" />
        {post.caption && (
          <div className="flex gap-x-2 px-4 py-4">
            <img
              src={post.byAvaUser}
              className="w-8 h-8 rounded-full object-cover cursor-pointer shrink-0"
              alt="hình ảnh đại diện"
              onClick={() => navigate(`/${post.byUserName}`)}
            />
            <div className="flex flex-col gap-x-2 w-full">
              <div className="w-full">
                <span
                  className="text-sm mr-2 cursor-pointer font-bold hover:text-color-text-gray"
                  onClick={() => navigate(`/${post.byUserName}`)}
                >
                  {post.byUserName}
                </span>
                <span className="font-normal break-words break-all whitespace-pre-wrap text-sm">
                  {post.caption}
                </span>
              </div>
              <p className="text-sm text-color-text-gray">
                {convertDateTime(post.createdAt)}
              </p>
            </div>
          </div>
        )}

        <div
          className={`flex w-full h-full ${
            post.caption ? "max-h-[337px]" : "max-h-[440px]"
          }  flex-1 flex-col overflow-y-auto custom-scrollbar p-4 gap-y-6`}
        >
          {post.comments.length === 0 ? (
            <div className="h-full w-full flex flex-col justify-center items-center">
              <p className="font-bold text-3xl">Chưa có bình luận nào.</p>
              <p>Bắt đầu trò chuyện</p>
            </div>
          ) : (
            post.comments
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((comment) => <Comment key={comment.id} comment={comment} />)
          )}
        </div>
        <div className="flex flex-col border-t border-t-color-dash px-4 py-4 gap-y-6">
          <div className="flex justify-between items-center text-2xl">
            <div className="flex items-center gap-x-4 ">
              <FaRegHeart className="cursor-pointer" />
              <FaRegComment className="cursor-pointer" />
            </div>
            <FaRegBookmark className="cursor-pointer" />
          </div>
          <p className="text-color-text-gray text-sm mt-[-1.2rem]">
            {convertDateTime(post.createdAt)} trước
          </p>
          {user ? (
            <div className="gap-x-3 items-center flex relative">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={user.profilePicURL}
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
                className="cursor-pointer text-2xl"
                onClick={() => setShowEmoj(!showEmoj)}
              />
              {showEmoj && (
                <div className="absolute top-[-140px] right-40">
                  <Emoj
                    className="absolute right-20 top-10"
                    handleClickEmoj={handleClickEmoj}
                    ref={emojiRef}
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="text-color-text-gray">
              <span className="text-blue-400 cursor-pointer" 
               onClick={() => navigate('/auth')}
              >Log in</span> to
              like or comment
            </p>
          )}
        </div>
        {isOpenSettingPost && (
          <ModalSettingPost
            isOpenSettingPost={isOpenSettingPost}
            setIsOpenSettingPost={setIsOpenSettingPost}
            setIsOpenModalConfirmDeletePost={setIsOpenModalConfirmDeletePost}
          />
        )}
        {isOpenModalConfirmDeletePost && (
          <ModalConfirmDeletePost
            setIsOpenModalConfirmDeletePost={setIsOpenModalConfirmDeletePost}
            isOpenModalConfirmDeletePost={isOpenModalConfirmDeletePost}
            post={post}
          />
        )}
      </div>
    )
  );
};

export default CommentBox;
