import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import Status from "../status/Status";
import useUpdatePost from "../../hooks/useUpdatePost";
const ModalEditPost = ({
  isOpenModalEditPost,
  setIsOpenModalEditPost,
  post,
}) => {
  const [valueText, setValueText] = useState(post?.caption || "");
  const { isUpdating, handleUpdatePost } = useUpdatePost(post, valueText);
  const handleClickUpdate = async () => {
    await handleUpdatePost();
    setIsOpenModalEditPost(false);
  };
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalEditPost}
        onRequestClose={() => setIsOpenModalEditPost(false)}
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
            maxWidth: "460px",
          },
        }}
      >
        <motion.div className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none">
          <div className="flex flex-col w-full">
            <div className="w-full bg-black py-2 flex justify-center cursor-pointer relative">
              <p className="font-bold">Chỉnh sửa thông tin</p>
              <span
                className="absolute top-2 left-4 cursor-pointer"
                onClick={() => setIsOpenModalEditPost(false)}
              >
                Hủy
              </span>
              <span
                className="absolute top-2 right-4 text-blue-500 cursor-pointer"
                onClick={handleClickUpdate}
              >
                {isUpdating ? (
                  <img
                    className="object-cover w-7 h-7 rounded-full"
                    src="/loading.gif"
                    alt="gif"
                  />
                ) : (
                  "xong"
                )}
              </span>
            </div>
            <Status
              valueText={valueText}
              setValueText={setValueText}
              isOpenModalToEdit={true}
            />
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalEditPost;
