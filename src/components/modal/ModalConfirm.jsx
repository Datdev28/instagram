import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { memo } from "react";
const ModalConfirm = ({ modalConfirm, setModalConfirm, setModalIsOpenCreate, setSelectedFile}) => {
  const handleCancle = () => {
    console.log(1);
    setModalConfirm(false);
    setModalIsOpenCreate(false);
    setSelectedFile(null);
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalConfirm}
        onRequestClose={() => setModalConfirm(false)}
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
            top: "15rem",
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
          className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none"
        >
          <div className="flex flex-col w-full">
              <div className="w-full border-b border-b-color-btn-gray py-6 gap-y-2 flex flex-col text-center">
                <p>Bỏ bài viết</p>
                <p className="text-color-text-gray">Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa</p>
              </div>    
              <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
                onClick={handleCancle}
              >
               <p className="text-red-500"
               >Bỏ</p>
              </div>    
              <div className="w-full  py-2 flex justify-center cursor-pointer hover:bg-color-note"
               onClick={() => setModalConfirm(false)}
              >Hủy</div>    
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default memo(ModalConfirm);
