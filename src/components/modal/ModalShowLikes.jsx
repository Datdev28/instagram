import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import UserLike from "../commentBox/userLike";
const ModalShowLikes = ({
  isOpenModalShowLikes,
  setIsOpenModalShowLikes,
  post,
}) => {
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalShowLikes}
        onRequestClose={() => setIsOpenModalShowLikes(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },
          content: {
            top: "8rem",
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
            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note relative">
              <p className="font-bold">Lượt thích</p>
              <IoMdClose
                className="absolute top-2 right-4 text-2xl cursor-pointer"
                onClick={() => setIsOpenModalShowLikes(false)}
              />
            </div>
            <div className="flex flex-col py-2 max-h-[426px] overflow-y-auto custom-scrollbar text-white gap-y-6 px-4">
              {post.likes.map((userLike) => (
                <UserLike userLike={userLike} key={userLike.userId}/>
              ))}
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalShowLikes;
