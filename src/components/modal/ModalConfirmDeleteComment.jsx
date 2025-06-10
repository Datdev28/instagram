import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import useDeleteComment from "../../hooks/useDeleteComment";
const ModalConfirmDeleteComment = ({ isOpenModalConfirmDeleteComment , setIsOpenModalConfirmDeleteComment, postId, comment}) => {
  const handleDeleteComment = useDeleteComment(postId, comment);
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalConfirmDeleteComment}
        onRequestClose={() => setIsOpenModalConfirmDeleteComment(false)}
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
          className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none"
        >
          <div className="flex flex-col w-full">
              <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
                onClick={handleDeleteComment}
              >
               <p className="text-red-500 font-bold"
               >Xóa</p>
              </div>    
              <div className="w-full  py-2 flex justify-center cursor-pointer hover:bg-color-note"
               onClick={() => setIsOpenModalConfirmDeleteComment(false)}
              >Hủy</div>    
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalConfirmDeleteComment;
