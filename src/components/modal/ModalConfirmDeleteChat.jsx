import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import useDeleteChat from "../../hooks/useDeleteChat";
import { useNavigate } from "react-router-dom";
const ModalConfirmDeleteChat = ({
  isOpenModalConfirmDeleteChat,
  setIsOpenModalConfirmDeleteChat,
  chatId,
}) => {
  const { deleteChat, isDeleting } = useDeleteChat();
  const navigate = useNavigate();
  const handleClickDeleteChat = async () => {
    await deleteChat(chatId);
    navigate("/direct/inbox");
  };
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalConfirmDeleteChat}
        onRequestClose={() => setIsOpenModalConfirmDeleteChat(false)}
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
        <motion.div className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none">
          <div className="flex flex-col w-full">
            {" "}
            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note p-4 text-center">
              <p className="font-bold">
                Bạn có chắc chắn muốn xóa đoạn chat này không?
              </p>
            </div>
            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note">
              {isDeleting ? (
                <img
                  className="object-cover w-7 h-7 rounded-full"
                  src="/loading.gif"
                  alt="gif"
                />
              ) : (
                <p
                  className="text-red-500 font-bold"
                  onClick={handleClickDeleteChat}
                >
                  Xóa
                </p>
              )}
            </div>
            <div
              className="w-full  py-2 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={() => setIsOpenModalConfirmDeleteChat(false)}
            >
              Hủy
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalConfirmDeleteChat;
