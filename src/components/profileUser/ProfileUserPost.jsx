import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import useAuthStore from "../../store/authStore";
import ModalNotifiAuth from "../modal/ModalNotifiAuth";
import { useLocation, useNavigate } from "react-router-dom";
const ProfileUserPost = ({ post }) => {
  const userAuth = useAuthStore(state => state.user);
  const [isOpenModalNote, setIsOpenModalNote] = useState(false);
  const [modalFromPost, setModalFromPost] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleShowPost = () => {
    if(userAuth){
      navigate(`/p/${post.id}`, {state: {
       background: location,
      }})
      console.log(1);
    }else {
     setIsOpenModalNote(true);
     setModalFromPost(true)
    }
  }
  return (
    <div className="flex relative group">
      <img
        src={post.imageOfPost[0]}
        className="object-cover w-full max-h-[440px] hover:opacity-40 cursor-pointer"
        alt="bài đăng"
         onClick={handleShowPost}
      />
      <div className="flex absolute top-1/2 left-1/2 items-center gap-x-6 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white">
        <div className="flex items-center gap-x-2">
          <FaHeart />
          <span className="font-semibold text-xl mt-[-3px]">
            {post.likes.length}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <FaComment />
          <span className="font-semibold text-xl mt-[-3px]">
            {post.comments.length}
          </span>
        </div>
      </div>
      {post.imageOfPost.length > 1 && (
        <div className="absolute top-2 right-2">
          <IoMdImages className="text-xl" />
        </div>
      )}
      {/* {isOpenModalNote && <ModalNotifiAuth setModalIsOpenNotifiAuth={setIsOpenModalNote} modalIsOpenNotifiAuth={isOpenModalNote} modalFromPost={modalFromPost}/>} */}
    </div>
  );
};

export default ProfileUserPost;
