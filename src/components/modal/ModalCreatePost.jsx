import React, { useRef } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
const ModalCreatePost = ({modalIsOpenCreate, setModalIsOpenCreate}) => {
  const inputRef = useRef(null);
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpenCreate}
        onRequestClose={() => setModalIsOpenCreate(false)}
        preventScroll={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },
          content: {
            top: "7rem",
            left: "auto",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: "none",
            background: "transparent",
            borderRadius: "0.5rem",
            overflow: "visible",
            width: "100%",
            maxWidth: "550px",
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
          className="bg-color-dash text-white overflow-hidden rounded-md w-full h-[70vh] flex flex-col items-center gap-y-6 select-none"
        >
           <h3 className="w-full text-center py-2 bg-black">Tạo bài viết mới</h3>
            <img src="upload.png" className="mt-8" alt="upload" />
           <input ref={inputRef} type="file" className="hidden" />
           <button className="bg-blue-500 px-2 py-1 rounded-sm">Chọn ảnh từ máy tính</button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalCreatePost;
