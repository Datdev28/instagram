import React from "react";
import { RiSettings4Fill } from "react-icons/ri";
import { useState } from "react";
import ModalNote from "../modal/modalNoteProfile";

const ProfileUserHeader = () => {
  const [modalIsOpenNote, setModalIsOpenNote] = useState(false);
  return (
    <div className="flex flex-col w-full">
      <div className="flex px-10 w-full items-center justify-center gap-x-10 max-md:px-2 mb-10">
        <div className="relative flex flex-col justify-center">
          <img  
            className="w-[10rem] max-md:w-[77px] aspect-square object-cover rounded-full cursor-pointer"
            src="profile.jpg"
            alt="avatar"
          />
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
          <p className="font-semibold hidden max-md:block whitespace-nowrap text-center ">
            Quang Đạt
          </p>
        </div>
        <div className="flex flex-col gap-y-7 max-md:text-xs">
          <div className="flex items-center gap-x-5 max-sm:flex-col max-sm:gap-y-4 max-sm:items-start">
            <p>quangdat.ng</p>
            <div className="flex items-center break-words gap-x-2">
              <button className="px-4 py-1 bg-color-btn-gray rounded-sm cursor-pointer max-xl:px-1">
                Chỉnh sửa trang cá nhân
              </button>
              <button className="px-4 py-1 bg-color-btn-gray rounded-sm cursor-pointer max-xl:px-1">
                Xem kho lưu trữ
              </button>
              <RiSettings4Fill className="text-3xl cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center gap-x-10 font-semibold max-md:hidden">
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
          <p className="font-semibold max-md:hidden">Quang Đạt</p>
        </div>
        <ModalNote
          modalIsOpenNote={modalIsOpenNote}
          setModalIsOpenNote={setModalIsOpenNote}
        />
      </div>
      <div className="hidden max-md:flex flex-col w-full">
        <hr className="border-color-dash w-full" />
        <div className="flex items-center gap-x-12 justify-center">
          <p className="text-center">
            0 <br /> <span className="text-color-text-gray ">bài viết</span>
          </p>
          <p className="text-center">
            38 <br />{" "}
            <span className="text-color-text-gray ">người theo dõi</span>
          </p>
          <p classNametext-center className="text-color-text-gray text-center">
            Đang theo dõi <br /> <span className="text-white">34</span> <br />{" "}
            người dùng
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserHeader;
