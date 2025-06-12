import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import useAuthStore from "../../store/authStore";
const ModalShowLikes = ({
  isOpenModalShowLikes,
  setIsOpenModalShowLikes,
  post,
}) => {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
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
        <motion.div className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none">
          <div className="flex flex-col w-full">
            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note relative">
              <p className="font-bold">Lượt thích</p>
              <IoMdClose
                className="absolute top-2 right-4 text-2xl cursor-pointer"
                onClick={() => setIsOpenModalShowLikes(false)}
              />
            </div>
            <div className="flex flex-col py-2 max-h-[500px] overflow-y-auto text-white gap-y-6 px-4">
              {post.likes.map((userLike) => (
                <div
                  key={userLike.userId}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-x-2">
                    <img
                      src={userLike.profilePicURL}
                      className="w-11 h-11 rounded-full object-cover cursor-pointer"
                      alt="avatar người dùng thích bài viết"
                      onClick={() => navigate(`/${userLike.userName}`)}
                    />
                    <div className="flex flex-col">
                      <p
                        className="cursor-pointer"
                        onClick={() => navigate(`/${userLike.userName}`)}
                      >
                        {userLike.userName}
                      </p>
                      <p className="text-color-text-gray">
                        {userLike.fullName}
                      </p>
                    </div>
                  </div>
                   <button className="px-4 py-1 bg-blue-500 font-semibold hover:bg-blue-700 rounded-md cursor-pointer">Theo dõi</button>                    
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalShowLikes;
