import React, { useRef, useState, memo, useEffect } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import usePreviewImage from "../../hooks/usePreviewImage";
import useUpAndGetImage from "../../hooks/useUpAndGetImage";
import { GoArrowLeft } from "react-icons/go";
import ModalConfirm from "./ModalConfirm";
const ModalCreatePost = ({ modalIsOpenCreate, setModalIsOpenCreate }) => {
  const inputRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } =
    usePreviewImage();
  const { handleImageUpload } = useUpAndGetImage();
  const [modalConfirm, setModalConfirm] = useState(false);
  const [isOpenPostStatus, setIsOpenStatus] = useState(false);
  const refContainer = useRef();
  const handleClickOutSide = (e) => {
    if (refContainer.current && !refContainer.current.contains(e.target)) {
      setModalConfirm(true);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpenCreate}
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
            top: "4rem",
            left: "auto",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: "none",
            background: "transparent",
            borderRadius: "0.5rem",
            overflow: "visible",
            width: "100%",
            maxWidth: "500px",
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
          ref={refContainer}
          className="bg-color-dash text-white overflow-hidden rounded-md w-full h-[35rem] flex flex-col select-none"
        >
          {selectedFile ? (
            <div className="w-full h-full">
              <div className="w-full flex justify-between items-center py-2 px-2 bg-black">
                <GoArrowLeft
                  className="text-2xl cursor-pointer"
                  onClick={() => setModalConfirm(true)}
                />
                {isOpenPostStatus && (
                  <p className="font-semibold">Tạo bài viết mới</p>
                )}

                <span
                  className="text-blue-500 font-semibold cursor-pointer"
                  onClick={() => setIsOpenStatus(true)}
                >
                  Tiếp
                </span>
              </div>
              <img
                src={selectedFile}
                className="w-full h-full object-cover"
                alt="hình ảnh đăng tải"
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center gap-y-20">
              <h3 className="w-full text-center py-2 bg-black">
                Tạo bài viết mới
              </h3>
              <img src="upload.png" className="mt-8" alt="upload" />
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                className="bg-blue-500 px-2 py-1 rounded-sm cursor-pointer mt-10"
                onClick={() => inputRef.current.click()}
              >
                Chọn ảnh từ máy tính
              </button>
            </div>
          )}
        </motion.div>
        <ModalConfirm
          setModalConfirm={setModalConfirm}
          modalConfirm={modalConfirm}
          setModalIsOpenCreate={setModalIsOpenCreate}
          setSelectedFile={setSelectedFile}
        />
      </Modal>
    </div>
  );
};

export default memo(ModalCreatePost);
