import React, { useRef, useState, useEffect } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import useAuthStore from "../../store/authStore";
import usePreviewImage from "../../hooks/usePreviewImage";
import useUpAndGetImage from "../../hooks/useUpAndGetImage";
import useEditProfile from "../../hooks/useEditProfile";

const ModalEditProfile = ({
  modalIsOpenEditProfile,
  setModalIsOpenEditProfile,
}) => {
  const refInputs = useRef(null);
  const { user } = useAuthStore();
  const [inputs, setInputs] = useState({
    fullName: user?.fullName,
    userName: user?.userName,
    bio: user?.bio || "",
  });

  const [errorMessage, setErrorMessage] = useState({
    errorUserName: "",
    errorFullName: "",
    errorBio: "",
  });
  const { selectedFile, handleImageChange } = usePreviewImage();
  const { handleImageUpload } = useUpAndGetImage();
  const { editProfile } = useEditProfile();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorExitsUserName, setErrorExitsUserName] = useState(false);
  useEffect(() => {
    if (!modalIsOpenEditProfile) {
      setInputs({
        fullName: user?.fullName,
        userName: user?.userName,
        bio: user?.bio || "",
      });
      setErrorMessage({
        errorUserName: "",
        errorFullName: "",
        errorBio: "",
      });
    }
  }, [modalIsOpenEditProfile, user]);
  const validateInputs = () => {
    let hasError = false;
    let newErrorMessage = {
      errorUserName: "",
      errorFullName: "",
      errorBio: "",
    };
    const userNameRegex = /^[a-z0-9_.-]+$/;
    if (inputs.userName && !userNameRegex.test(inputs.userName)) {
      newErrorMessage.errorUserName =
        "Tên người dùng chỉ được chứa chữ thường, số, và các ký tự (_ . -), không dấu, không khoảng trắng";
      hasError = true;
    }
    if (inputs.userName && inputs.userName.length > 20) {
      newErrorMessage.errorUserName = "Tên người dùng không được quá 20 ký tự";
      hasError = true;
    }

    const fullNameRegex = /^(?!.* {2})[\p{L}]+(?: [\p{L}]+)*$/u;
    if (inputs.fullName && !fullNameRegex.test(inputs.fullName.trim())) {
      newErrorMessage.errorFullName =
        "Tên chỉ được chứa chữ cái, tối đa 1 khoảng trắng giữa các từ, không ký tự đặc biệt.";
      hasError = true;
    }
    if (inputs.fullName && inputs.fullName.trim().length > 20) {
      newErrorMessage.errorFullName = "Tên đầy đủ không được quá 20 ký tự";
      hasError = true;
    }

    if (inputs.bio && inputs.bio.length > 150) {
      newErrorMessage.errorBio = "Tiểu sử không được quá 150 ký tự";
      hasError = true;
    }

    setErrorMessage(newErrorMessage);
    return !hasError;
  };

  const handleSaveProfile = async () => {
    if (!validateInputs()) return;
    if (
      inputs.fullName === user.fullName &&
      inputs.userName === user.userName &&
      inputs.bio === user.bio &&
      !selectedFile
    ) {
        setModalIsOpenEditProfile(false);
        return;
    }
    try {
      setIsUpdating(true);
      const imageUrl = await handleImageUpload(selectedFile);
      const exitsUserName = await editProfile(inputs, imageUrl);
      setIsUpdating(false);
      if (exitsUserName) {
        setErrorExitsUserName(true);
        setModalIsOpenEditProfile(true);
      } else {
        setErrorExitsUserName(false);
        setModalIsOpenEditProfile(false);
      }
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }
  };
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpenEditProfile}
        onRequestClose={() => setModalIsOpenEditProfile(false)}
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
            top: "5rem",
            left: "auto",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: "none",
            background: "transparent",
            borderRadius: "0.5rem",
            overflow: "visible",
            width: "100%",
            maxWidth: "600px",
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
          className="bg-color-dash text-white p-4 rounded-3xl w-full flex flex-col items-center gap-y-6 select-none"
        >
          <h3 className="font-bold text-md">Chỉnh sửa trang cá nhân</h3>
          <div className="flex flex-col gap-y-4 items-center">
            <img
              className="w-[80px] h-[80px] rounded-full object-cover"
              src={
                selectedFile[0] || user?.profilePicURL || "defaultProfilePic.jpg"
              }
              alt="avatar"
            />
            <p
              className="text-blue-600 cursor-pointer"
              onClick={() => refInputs.current.click()}
            >
              Chỉnh sửa ảnh{" "}
            </p>
            <input
              type="file"
              className="hidden"
              ref={refInputs}
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <hr className="border-white w-full mb-2" />
            <div className="w-full flex items-center gap-x-6">
              <div className="w-[100px] py-1">Tên</div>
              <div className="w-full">
                <input
                  placeholder="Tên đầy đủ"
                  className={`outline-none w-full   text-white px-2 py-1 border ${
                    errorMessage.errorFullName
                      ? "border-red-500"
                      : "border-gray-700"
                  }`}
                  type="text"
                  value={inputs.fullName}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullName: e.target.value })
                  }
                />
                {errorMessage.errorFullName && (
                  <div className="text-xs text-red-500 mt-1">
                    {errorMessage.errorFullName}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center gap-x-6 mt-2">
              <div className="w-[100px]">Tên người dùng</div>
              <div className="w-full border-t border-white py-1">
                <input
                  placeholder="Tên người dùng"
                  className={`outline-none w-full   text-white px-2 py-1 border ${
                    errorMessage.errorUserName || errorExitsUserName
                      ? "border-red-500"
                      : "border-gray-700"
                  }`}
                  type="text"
                  value={inputs.userName}
                  onChange={(e) =>
                    setInputs({ ...inputs, userName: e.target.value })
                  }
                />
                {errorMessage.errorUserName && (
                  <div className="text-xs text-red-500 mt-1">
                    {errorMessage.errorUserName}
                  </div>
                )}
                {errorExitsUserName ? "Tên người dùng đã tồn tại" : ""}
              </div>
            </div>
            <div className="w-full flex items-center gap-x-6 mt-2">
              <div className="w-[100px]">Tiểu sử</div>
              <div className="w-full border-t border-white py-1">
                <input
                  placeholder="Tiểu sử"
                  className={`outline-none w-full  text-white px-2 py-1 border ${
                    errorMessage.errorBio ? "border-red-500" : "border-gray-700"
                  }`}
                  type="text"
                  value={inputs.bio}
                  onChange={(e) =>
                    setInputs({ ...inputs, bio: e.target.value })
                  }
                />
                {errorMessage.errorBio && (
                  <div className="text-xs text-red-500 mt-1">
                    {errorMessage.errorBio}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-x-4 w-full justify-end mt-4">
            <button
              onClick={() => setModalIsOpenEditProfile(false)}
              className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleSaveProfile}
              className={`px-4 py-2 text-white bg-blue-400 rounded hover:bg-blue-500 ${
                isUpdating ? "cursor-pointer" : ""
              }`}
            >
              {isUpdating ? (
                <img
                  className="object-cover w-7 h-7 rounded-full"
                  src="loading.gif"
                  alt="gif"
                />
              ) : (
                "Lưu"
              )}
            </button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalEditProfile;
