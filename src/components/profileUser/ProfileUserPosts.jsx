import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import ProfileUserPost from "./ProfileUserPost";
import useGetUserPost from "../../hooks/useGetUserPost";
import ModalCreatePost from "../modal/ModalCreatePost";
const ProfileUserPosts = () => {
  const { posts, isLoading } = useGetUserPost();
  const noPost = posts.length === 0 && !isLoading;
  const havePost = posts.length > 0 && !isLoading;
  if(noPost) return <NoPosts/>
  return (
    <>
      {havePost && (
        <div className="grid grid-cols-3 gap-1 w-full">
          {posts.map((post) => (
            <ProfileUserPost post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileUserPosts;

const NoPosts = () => {
  const [isOpenModalCreatePost, setIsOpenModalCreatePost] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 gap-y-2">
      <div className="w-[4.5rem] h-[4.5rem] border-2 rounded-full flex justify-center items-center">
        <CiCamera className="text-5xl" />
      </div>
      <p className="font-bold text-3xl">Chia sẻ ảnh</p>
      <p className="text-center text-md">
        Khi bạn chia sẻ ảnh, ảnh sẽ xuất hiện trên trang cá nhân của bạn
      </p>
      <p className="text-center text-xs text-blue-500 cursor-pointer select-none"
       onClick={() => setIsOpenModalCreatePost(true)}
      >
        Chia sẻ ảnh đầu tiên của bạn
      </p>
      {isOpenModalCreatePost && <ModalCreatePost modalIsOpenCreate={isOpenModalCreatePost} setModalIsOpenCreate={setIsOpenModalCreatePost}/>}
    </div>
  );
};