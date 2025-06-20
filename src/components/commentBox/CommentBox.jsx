import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import convertDateTime from "../../utils/convertDateTime";
import ModalSettingPost from "../modal/ModalSettingPost";
import ModalConfirmDeletePost from "../modal/ModalConfirmDeletePost";
import Comment from "./Comment";
import InteractWithPost from "./InteractWithPost";
import useAuthStore from "../../store/authStore";
import ModalListOfReasonsReport from "../modal/ModalListOfReasonsReport";
import ModalEditPost from "../modal/ModalEditPost";
import ModalIntroduceAcc from "../modal/ModalIntroduceAcc";
import ModalConfirmCancleSavePost from "../modal/ModalConfirmCancleSavePost";
const CommentBox = ({
  post,
  setIsOpenModalLikePostWithoutLogin,
  setIsOpenModalShowLikes,
  setShowLikesWithoutLogin,
  setIsOpenModalSaveWithoutLogin,
  responsiveMobile = false,
}) => {
  const navigate = useNavigate();
  const [isOpenSettingPost, setIsOpenSettingPost] = useState(false);
  const [isOpenModalEditPost, setIsOpenModalEditPost] = useState(false);
  const [isOpenModalConfirmDeletePost, setIsOpenModalConfirmDeletePost] =
    useState(false);
  const [isOpenModalListOfReasons, setIsOpenModalListOfReasons] =
    useState(false);
  const [openSettingWithoutOwn, setOpenSettingWithoutOwn] = useState(false);
  const [isOpenModalIntroduceAcc, setIsOpenModalIntroduceAcc] = useState(false);
  const [isOpenModalConfirmCancleSavePost, setIsOpenModalConfirmCancleSavePost] = useState(false);
  const [reportPost, setReportPost] = useState(false);
  const user = useAuthStore((state) => state.user);
  const ownUser = user?.uid === post?.createBy;
  const handleClickOpenSettingPost = () => {
    if (ownUser) {
      setIsOpenSettingPost(true);
    } else {
      setOpenSettingWithoutOwn(true);
      setIsOpenSettingPost(true);
    }
  };
  return (
    post && (
      <div className="w-full flex flex-col relative bg-black text-white">
        <div className="flex px-4 sm:py-3 justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <img
              src={post.byAvaUser || "/defaultProfilePic.jpg"}
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
          {user && (
            <HiOutlineDotsHorizontal
              className="cursor-pointer text-2xl"
              onClick={handleClickOpenSettingPost}
            />
          )}
        </div>
        {!responsiveMobile && (
          <>
            <hr className="border-color-note" />
            {post.caption && (
              <div className="flex gap-x-2 px-4 py-4">
                <img
                  src={post.byAvaUser || "/defaultProfilePic.jpg"}
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
                    <span className="font-normal break-words whitespace-pre-wrap text-sm">
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
                  .map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      setIsOpenModalListOfReasons={setIsOpenModalListOfReasons}
                      setReportPost={setReportPost}
                    />
                  ))
              )}
            </div>
            <InteractWithPost
              post={post}
              setIsOpenModalLikePostWithoutLogin={
                setIsOpenModalLikePostWithoutLogin
              }
              setIsOpenModalShowLikes={setIsOpenModalShowLikes}
              setShowLikesWithoutLogin={setShowLikesWithoutLogin}
              setIsOpenModalSaveWithoutLogin={setIsOpenModalSaveWithoutLogin}
              setIsOpenModalConfirmCancleSavePost={setIsOpenModalConfirmCancleSavePost}
            />
          </>
        )}

        {isOpenSettingPost && (
          <ModalSettingPost
            post={post}
            isOpenSettingPost={isOpenSettingPost}
            setIsOpenSettingPost={setIsOpenSettingPost}
            setIsOpenModalConfirmDeletePost={setIsOpenModalConfirmDeletePost}
            openSettingWithoutOwn={openSettingWithoutOwn}
            setIsOpenModalListOfReasons={setIsOpenModalListOfReasons}
            setReportPost={setReportPost}
            setIsOpenModalEditPost={setIsOpenModalEditPost}
            setIsOpenModalIntroduceAcc={setIsOpenModalIntroduceAcc}
          />
        )}
        {isOpenModalConfirmDeletePost && (
          <ModalConfirmDeletePost
            setIsOpenModalConfirmDeletePost={setIsOpenModalConfirmDeletePost}
            isOpenModalConfirmDeletePost={isOpenModalConfirmDeletePost}
            post={post}
          />
        )}
        {isOpenModalListOfReasons && (
          <ModalListOfReasonsReport
            isOpenModalListOfReasons={isOpenModalListOfReasons}
            setIsOpenModalListOfReasons={setIsOpenModalListOfReasons}
            reportPost={reportPost}
          />
        )}
        {isOpenModalEditPost && (
          <ModalEditPost
            isOpenModalEditPost={isOpenModalEditPost}
            setIsOpenModalEditPost={setIsOpenModalEditPost}
            post={post}
          />
        )}
        {isOpenModalIntroduceAcc && (
          <ModalIntroduceAcc
            userId={post.createBy}
            isOpenModalIntroduceAcc={isOpenModalIntroduceAcc}
            setIsOpenModalIntroduceAcc={setIsOpenModalIntroduceAcc}
          />
        )}
        {isOpenModalConfirmCancleSavePost && (
          <ModalConfirmCancleSavePost
            isOpenModalConfirmCancleSavePost={isOpenModalConfirmCancleSavePost}
            setIsOpenModalConfirmCancleSavePost={
              setIsOpenModalConfirmCancleSavePost
            }
            postId={post.id}
          />
        )}
      </div>
    )
  );
};

export default CommentBox;
