import React, { useRef, useState, useEffect } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import usePreviewImage from "../../hooks/usePreviewImage";
import useUpAndGetImage from "../../hooks/useUpAndGetImage";
import SlideImage from "../slideImage/SlideImage";
import Status from "../status/Status";
import useCreatePost from "../../hooks/useCreatePost";
import ModalConfirm from "./ModalConfirmCancle";
import useAuthStore from "../../store/authStore";
import { GoArrowLeft } from "react-icons/go";
import { BsImages } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const ModalCreatePost = ({ modalIsOpenCreate, setModalIsOpenCreate }) => {
  const inputRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } =
    usePreviewImage();
  const navigate = useNavigate();
  const { handleImageUpload } = useUpAndGetImage();
  const [modalConfirm, setModalConfirm] = useState(false);
  const [showIsLoading, setShowIsLoading] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [checkedHideLike, setChekedHideLike] = useState(false);
  const [turnOfComment, setTurnOffComment] = useState(false);
  const user = useAuthStore(state => state.user);
  const [valueText, setValueText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenContainerImage, setIsOpenContainerImage] = useState(false);
  const { handleCreatePost } = useCreatePost();
  const [picked, setPicked] = useState(0);
  const refContainerFull = useRef();
  const refContainerImg = useRef();
  const refIconImage = useRef();
  const handleRemovePicked = (index) => {
    const selectedImg = selectedFile.filter((_, i) => i !== index);
    setSelectedFile(selectedImg);
    if (index > 0) {
      setPicked(index - 1);
    }
  };
  const handleBack = () => {
    if (isOpenStatus) {
      setIsOpenStatus(false);
    } else {
      setModalConfirm(true);
    }
  };
  const handleOnClickPost = async () => {
    if (isOpenStatus) {
      try {
        setShowIsLoading(true);
        setIsOpenStatus(false);
        setIsLoading(true);
        const imageUrls = await handleImageUpload(selectedFile);
        await handleCreatePost(
          imageUrls,
          valueText,
          checkedHideLike,
          turnOfComment
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsOpenStatus(true);
    }
  };
  const handleClickOutSide = (e) => {
    if(isLoading) return 
    if (
      refContainerFull.current &&
      !refContainerFull.current.contains(e.target)
    ) {
      if(showIsLoading){
       setModalIsOpenCreate(false);
       navigate(`/${user.userName}`)
      }else {
        if(selectedFile.length > 0){
          setModalConfirm(true);
        }else {
          setModalIsOpenCreate(false);
        }
      }
    }
    if (
      refContainerImg.current &&
      !refContainerImg.current.contains(e.target) &&
      refIconImage.current &&
      !refIconImage.current.contains(e.target)
    ) {
      setIsOpenContainerImage(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [showIsLoading, isLoading, selectedFile]);
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
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: "none",
            background: "transparent",
            overflow: "visible",
            width: "100%",
            transition: "max-width 0.6s ease",
            maxWidth: `${isOpenStatus ? "740px" : "420px"}`,
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
          ref={refContainerFull}
          className="bg-color-dash text-white flex flex-col items-center select-none max-md:text-xs"
        >
          {showIsLoading ? (
            <div className="h-[500px] w-full flex flex-col ">
              <p className="w-full font-semibold flex justify-center items-center py-2 px-2 bg-black">
                {isLoading ? "Đang chia sẻ " : "Đã chia sẻ bài viết"}
              </p>
              <div className="h-full flex justify-center items-center flex-col gap-y-2">
                {isLoading ? (
                  <img src="post.gif" alt="đang đăng bài" />
                ) : (
                  <img src="completePost.png" alt="bài đăng thành công" />
                )}
                {!isLoading && <p className="text-xl">Đã chia sẽ bài viết của bạn</p>}
              </div>
            </div>
          ) : (
            <>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              {selectedFile.length > 0 && (
                <div className="w-full flex justify-between items-center py-2 px-2 bg-black">
                  <GoArrowLeft
                    className="text-2xl cursor-pointer"
                    onClick={handleBack}
                  />
                  {isOpenStatus && (
                    <p className="font-semibold">Tạo bài viết mới</p>
                  )}
                  <span
                    className="text-blue-500 font-semibold cursor-pointer"
                    onClick={handleOnClickPost}
                  >
                    {isOpenStatus ? "Chia sẻ" : "Tiếp"}
                    {isLoading && (
                      <p className="text-red-600">ádsadasdsadsad</p>
                    )}
                  </span>
                </div>
              )}

              {selectedFile.length ? (
                <div className="flex w-full relative">
                  <div className="w-[420px] relative">
                    <SlideImage
                      selectedFile={selectedFile}
                      picked={picked}
                      setPicked={setPicked}
                    />
                    {!isOpenStatus && (
                      <div
                        className="absolute bottom-5 right-5 cursor-pointer flex p-2 justify-center items-center rounded-full bg-black opacity-70"
                        onClick={() =>
                          setIsOpenContainerImage(!isOpenContainerImage)
                        }
                        ref={refIconImage}
                      >
                        <BsImages className="text-md" />
                      </div>
                    )}
                  </div>
                  {isOpenContainerImage && (
                    <div
                      className="absolute bottom-14 right-5 p-2 rounded-md flex items-center"
                      ref={refContainerImg}
                    >
                      <div className="absolute inset-0 bg-black opacity-60 z-0  rounded-md" />
                      <div className="flex gap-x-2">
                        <div className="max-w-sm overflow-hidden flex gap-x-3">
                          {selectedFile.map((item, index) => (
                            <div
                              className="w-full h-full relative cursor-pointer"
                              onClick={() => setPicked(index)}
                              key={index}
                            >
                              <img
                                src={item}
                                className={`object-cover w-[5.5rem] shrink-0 h-[5.5rem] ${
                                  picked === index
                                    ? "opacity-100"
                                    : "opacity-60"
                                }`}
                                alt="ảnh đăng tải"
                              />
                              {picked === index && (
                                <button
                                  className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white rounded-full cursor-pointer p-1 transition"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemovePicked(index);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <CiCirclePlus
                          className="text-4xl cursor-pointer z-10 text-color-text-gray shrink-0"
                          onClick={() => inputRef.current.click()}
                        />
                      </div>
                    </div>
                  )}
                  {isOpenStatus && (
                    <Status
                      setChekedHideLike={setChekedHideLike}
                      setTurnOffComment={setTurnOffComment}
                      setValueText={setValueText}
                      valueText={valueText}
                    />
                  )}
                </div>
              ) : (
                <div className="w-full h-[28rem] flex flex-col items-center gap-y-20 mb-10">
                  <h3 className="w-full text-center py-2 bg-black">
                    Tạo bài viết mới
                  </h3>
                  <img src="upload.png" className="mt-8" alt="upload" />
                  <button
                    className="bg-blue-500 px-2 py-1 rounded-sm cursor-pointer"
                    onClick={() => inputRef.current.click()}
                  >
                    Chọn ảnh từ máy tính
                  </button>
                </div>
              )}
            </>
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

export default ModalCreatePost;
