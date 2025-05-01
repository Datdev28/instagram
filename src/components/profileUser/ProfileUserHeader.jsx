import React, { useEffect } from "react";
import { RiSettings4Fill } from "react-icons/ri";
import { useState } from "react";
import ModalNote from "../modal/modalNoteProfile";
useEffect
const ProfileUserHeader = () => {
  const [modalIsOpenNote, setModalIsOpenNote] = useState(true);

  return (
    <div className="flex px-10 items-center gap-x-10">
      <div className="w-[10rem] h-[10rem] relative">
        <img
          className="w-full h-full object-cover rounded-full cursor-pointer"
          src="profile.jpg"
          alt="avatar"
        />
        <div
          className="absolute top-[-1.2rem] left-10 flex justify-center items-center w-[4rem] h-[2rem] rounded-xl bg-color-note py-5 cursor-pointer"
          onClick={() => setModalIsOpenNote(!modalIsOpenNote)}
        >
          <p className="break-words text-color-text-gray text-[12px]">
            Ghi chú...
          </p>
          <div className="absolute bottom-[-0.5rem] left-[1rem] rounded-full  bg-color-note  w-[1rem] h-[1rem]">
            <div className="absolute top-[1rem] left-[0.5rem] rounded-full  bg-color-note  w-[0.5rem] h-[0.5rem]"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-7">
        <div className="flex items-center gap-x-5">
          <p>quangdat.ng</p>
          <div className="flex items-center gap-x-2">
            <button className="px-4 py-1 bg-color-btn-gray rounded-sm cursor-pointer">
              Chỉnh sửa trang cá nhân
            </button>
            <button className="px-4 py-1 bg-color-btn-gray rounded-sm cursor-pointer">
              Xem kho lưu trữ
            </button>
            <RiSettings4Fill className="text-3xl cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-x-10 font-semibold">
          <p>
            0 <span className="text-color-text-gray">bài viết</span>
          </p>
          <p>
            38 <span className="text-color-text-gray">người theo dõi</span>
          </p>
          <p className="text-color-text-gray">
            Đang theo dõi <span className="text-white">34</span> người dùng
          </p>
        </div>
        <p className="font-semibold">Quang Đạt</p>
      </div>
      <ModalNote
        modalIsOpenNote={modalIsOpenNote}
        setModalIsOpenNote={setModalIsOpenNote}
      />
    </div>
  );
};

export default ProfileUserHeader;
