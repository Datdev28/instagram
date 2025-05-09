import React from "react";
import { RiSettings4Fill } from "react-icons/ri";
import { useState } from "react";
import ModalNote from "../modal/modalNoteProfile";
import userProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import { HiDotsHorizontal } from "react-icons/hi";
import ModalIsOpenEditProfile from '../../components/modal/ModalEditProfile'
const ProfileUserHeader = () => {
  const [modalIsOpenNote, setModalIsOpenNote] = useState(false);
  const [modalIsOpenEditProfile, setModalIsOpenEditProfile] = useState(false);
  const { userProfile } = userProfileStore();
  const userAuth = useAuthStore(state => state.user)
  const isOwnProfile = userAuth && userAuth.userName === userProfile.userName
  return (
    userProfile && (
      <div className="flex flex-col w-full">
        <div className="flex px-10 w-full items-center justify-center gap-x-10 max-md:px-2 mb-10">
          <div className="relative flex flex-col justify-center">
            <img
              className="w-[10rem] max-md:w-[77px] aspect-square object-cover rounded-full cursor-pointer"
              src={userProfile.profilePicURL || "defaultProfilePic.jpg"}
              alt="avatar"
            />
            {isOwnProfile ? (
            <div
            className="absolute top-[-1.2rem] max-md:top-[-2rem] max-md:left-0 left-10 flex justify-center items-center w-[4rem] h-[2rem] rounded-xl bg-color-note py-5 cursor-pointer"
            onClick={() => setModalIsOpenNote(!modalIsOpenNote)}
          >
            <p className="break-words text-color-text-gray text-[12px]">
              Ghi chú...
            </p>
            <div className="absolute bottom-[-0.5rem] left-[1rem] rounded-full  bg-color-note  w-[1rem] h-[1rem]">
              <div className="absolute top-[1rem] left-[0.5rem] rounded-full  bg-color-note  w-[0.5rem] h-[0.5rem]"></div>
            </div>
          </div>
            )
             : ""
            }

            <p className="font-semibold hidden max-md:block whitespace-nowrap text-center ">
              {userProfile.fullName}
            </p>
          </div>
          <div className="flex flex-col gap-y-7 max-md:text-xs ">
            <div className="flex items-center gap-x-5 max-sm:flex-col max-sm:gap-y-4 max-sm:items-start max-sm:justify-start">
              <p>{userProfile.userName}</p>
              {
                isOwnProfile ? ( 
                <div className="flex items-center break-words gap-x-2">
                  <button className="px-4 py-1 bg-color-btn-gray rounded-sm cursor-pointer hover:bg-color-dash max-xl:px-1"
                   onClick={() => setModalIsOpenEditProfile(!modalIsOpenEditProfile)}                  
                  >
                    Chỉnh sửa trang cá nhân
                  </button>
                  <button className="px-4 py-1 bg-color-btn-gray rounded-sm hover:bg-color-dash cursor-pointer max-xl:px-1">
                    Xem kho lưu trữ
                  </button>
                  <RiSettings4Fill className="text-3xl text-white cursor-pointer" />
                </div>) : 
                ( 
                  <div className="flex items-center break-words gap-x-2">
                    <button className="px-4 py-1 bg-blue-500 rounded-sm cursor-pointer hover:bg-blue-600 max-xl:px-2">
                      Theo dõi
                    </button>
                    <button className="px-4 py-1 bg-color-btn-gray rounded-sm hover:bg-color-dash cursor-pointer max-xl:px-2">
                      Nhắn tin
                    </button>
                  <HiDotsHorizontal className="text-2xl text-white cursor-pointer" />
                  </div>)
              }

            </div>
            <div className="flex items-center gap-x-10 font-semibold max-md:hidden">
              <p>
                {userProfile.posts.length} <span className="text-color-text-gray">bài viết</span>
              </p>
              <p>
              {userProfile.followers.length}  <span className="text-color-text-gray">người theo dõi</span>
              </p>
              <p className="text-color-text-gray">
                Đang theo dõi <span className="text-white">{userProfile.following.length}</span> người dùng
              </p>
            </div>
            <p className="font-semibold max-md:hidden">{userProfile.fullName}</p>
            <p className="whitespace-nowrap mt-[-1rem] text-xs">{userProfile.bio}</p>
          </div>
          <ModalNote
            modalIsOpenNote={modalIsOpenNote}
            setModalIsOpenNote={setModalIsOpenNote}
          />
          <ModalIsOpenEditProfile
           modalIsOpenEditProfile={modalIsOpenEditProfile}
           setModalIsOpenEditProfile={setModalIsOpenEditProfile}
          />
        </div>
        <div className="hidden max-md:flex flex-col w-full">
          <hr className="border-color-dash w-full" />
          <div className="flex items-center gap-x-12 justify-center">
            <p className="text-center">
            {userProfile.posts.length} <br /> <span className="text-color-text-gray ">bài viết</span>
            </p>
            <p className="text-center">
            {userProfile.followers.length} <br />{" "}
              <span className="text-color-text-gray ">người theo dõi</span>
            </p>
            <p className="text-color-text-gray text-center">
              Đang theo dõi <br /> <span className="text-white">{userProfile.following.length}</span><br />{" "}
              người dùng
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileUserHeader;
