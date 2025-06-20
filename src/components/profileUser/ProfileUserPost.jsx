import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import useAuthStore from "../../store/authStore";
import ModalNotifiAuth from "../modal/ModalNotifiAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useGetPostByPostId from "../../hooks/useGetPostByPostId";
import useFromCollection from "../../store/fromCollection";
const ProfileUserPost = ({
  post,
  postId,
  showPostSave = false,
  fromCollectionSmall = false,
  collectionId = null
}) => {
  const userAuth = useAuthStore((state) => state.user);
  const postSave = useGetPostByPostId(postId);
  const [isOpenModalNote, setIsOpenModalNote] = useState(false);
  const [modalFromPost, setModalFromPost] = useState(false);
  const setFromCollection = useFromCollection(
    (state) => state.setFromCollection
  );
  const location = useLocation();
  const navigate = useNavigate();
  const handleShowPost = () => {
    if (userAuth) {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        if (fromCollectionSmall) {
          setFromCollection(true, collectionId);
        } else {
          setFromCollection(false, collectionId);
        }
        navigate(!showPostSave ? `/p/${post.id}` : `/p/${postSave.post.id}`);
      } else {
        if (fromCollectionSmall) {
          setFromCollection(true, collectionId);
        } else {
          setFromCollection(false, collectionId);
        }
        navigate(!showPostSave ? `/p/${post.id}` : `/p/${postSave.post.id}`, {
          state: {
            background: location,
          },
        });
      }
    } else {
      setIsOpenModalNote(true);
      setModalFromPost(true);
    }
  };
  if (showPostSave && !postSave.post) return;
  return (
    <div className="flex relative group">
      <img
        src={!showPostSave ? post.imageOfPost[0] : postSave.post.imageOfPost[0]}
        className="object-cover w-full max-h-[450px] hover:opacity-40 cursor-pointer"
        alt="bài đăng"
        onClick={handleShowPost}
      />
      <div className="flex absolute top-1/2 left-1/2 items-center gap-x-6 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white">
        <div className="flex items-center gap-x-2">
          <FaHeart />
          <span className="font-semibold text-xl mt-[-3px]">
            {!showPostSave ? post.likes.length : postSave.post.likes.length}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <FaComment />
          <span className="font-semibold text-xl mt-[-3px]">
            {!showPostSave
              ? post.comments.length
              : postSave.post.comments.length}
          </span>
        </div>
      </div>
      {(!showPostSave
        ? post.imageOfPost.length
        : postSave.post.imageOfPost.length) > 1 && (
        <div className="absolute top-2 right-2">
          <IoMdImages className="text-xl" />
        </div>
      )}
      {isOpenModalNote && (
        <ModalNotifiAuth
          setModalIsOpenNotifiAuth={setIsOpenModalNote}
          modalIsOpenNotifiAuth={isOpenModalNote}
          modalFromPost={modalFromPost}
        />
      )}
    </div>
  );
};

export default ProfileUserPost;
