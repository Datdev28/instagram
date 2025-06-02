import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import useDeletePost from "../../hooks/useDeletePost";
import { useNavigate } from "react-router-dom";
import userProfileStore from "../../store/userProfileStore";
const ModalConfirmDeletePost = ({ isOpenModalConfirmDeletePost , setIsOpenModalConfirmDeletePost, postId}) => {
  const userProfile = userProfileStore(state => state.userProfile);
  const navigate = useNavigate()
  const {handleDeletePost, isDeleting} = useDeletePost();
  const handleClickDeletePost = () => {
    handleDeletePost(postId);
    if(!isDeleting){
      navigate(`/${userProfile.userName}`)
    }
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalConfirmDeletePost}
        onRequestClose={() => setIsOpenModalConfirmDeletePost(false)}
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
          className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none"
        >
          <div className="flex flex-col w-full">
              <div className="w-full border-b border-b-color-btn-gray py-6 gap-y-2 flex flex-col text-center">
                <p className="text-xl">Xóa bài viết</p>
                <p className="text-color-text-gray">Bạn có chắc chắn muốn xóa bài viết này không?</p>
              </div>    
              <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
               onClick={handleClickDeletePost}
              >
               <p className="text-red-500 font-bold"
               >Xóa</p>
              </div>    
              <div className="w-full  py-2 flex justify-center cursor-pointer hover:bg-color-note"
               onClick={() => setIsOpenModalConfirmDeletePost(false)}
              >Hủy</div>    
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalConfirmDeletePost;
