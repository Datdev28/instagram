import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import ModalConfirmDelete from "./ModalConfirmDelete";
const ModalNote = ({ isOpenSettingPost, setIsOpenSettingPost }) => {
  const [isOpenModalConfirmDel, setIsOpenModalConfirmDel] = useState(false)
  const handleClickDelete = () => {
    setIsOpenModalConfirmDel(true);
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenSettingPost}
        onRequestClose={() => setIsOpenSettingPost(false)}
        preventScroll={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },
          content: {
            top: "10rem",
            left: "auto",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: "none",
            background: "transparent",
            borderRadius: "0.5rem",
            overflow: "visible",
            width: "100%",
            maxWidth: "400px",
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="bg-color-dash text-white overflow-hidden rounded-3xl w-full flex flex-col items-center gap-y-2 select-none"
        >
          <div className={`${isOpenModalConfirmDel ? "hidden" : ""} flex flex-col w-full`}>
            <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer text-red-500 font-bold"
             onClick={handleClickDelete}
            >
              Xóa
            </div>
            <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer ">
              Chỉnh sửa
            </div>
            <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer">
              Ẩn số lượt thích với người khác
            </div>
            <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer">
              Tắt tính năng bình luận
            </div>
            <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer">
              Đi đến bài viết
            </div>
            <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer">
              Giới thiệu về tài khoản này
            </div>
            <div
              className="w-full  py-2 flex justify-center cursor-pointer"
              onClick={() => setIsOpenSettingPost(false)}
            >
              Hủy
            </div>
          </div>
          {isOpenModalConfirmDel && <ModalConfirmDelete setIsOpenSettingPost={setIsOpenSettingPost} isOpenSettingPost={isOpenSettingPost}/>}
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalNote;
