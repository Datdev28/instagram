import Modal from "react-modal";
import { motion } from "framer-motion";
import userProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useCreateBlockUser from "../../hooks/useCreateBlockUser";
import { useState } from "react";
import ModalResponseForBlock from "./ModalResponseForBlock";
const ModalConfirmBlock = ({
  isOpenModalConfirmBlock,
  setIsOpenModalConfirmBlock,
  setModalIsSetting
}) => {
  const userProfile = userProfileStore((state) => state.userProfile);
  const user = useAuthStore((state) => state.user);
  const { handleBlockUser } = useCreateBlockUser();
  const [isOpenModalResponseForBlock, setIsOpenModalResponseForBlock] =
    useState(false);
  const handleClickBlock = async () => {
    setIsOpenModalResponseForBlock(true);
    await handleBlockUser(user.uid, userProfile.uid);
  };
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalConfirmBlock}
        onRequestClose={() => setIsOpenModalConfirmBlock(false)}
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
        <motion.div className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center select-none">
          <div className="flex flex-col items-center text-center p-8 gap-y-4">
            <img
              src={userProfile?.profilePicURL || "/defaultProfilePic.jpg"}
              className="w-18 h-18 rounded-full object-cover"
              alt="người dùng follow"
            />
            <div className="items-center space-y-2">
              <p className="text-xl font-bold">Chặn {userProfile?.userName}?</p>
              <p className="text-sm text-color-text-gray">
                Họ sẽ không thể tìm trang cá nhân, bài viết của bạn trên
                Instagram. Instagram sẽ không cho{" "}
                {userProfile?.userName || "người dùng này"} biết rằng bạn đã
                chặn họ
              </p>
            </div>
          </div>
          <div
            className="flex flex-col w-full justify-center items-center border-t border-t-color-btn-gray hover:bg-color-note cursor-pointer"
            onClick={handleClickBlock}
          >
            <p className="text-red-500 font-bold py-2">Chặn</p>
          </div>
          <div
            className="w-full py-2 border-t border-t-color-btn-gray flex justify-center cursor-pointer hover:bg-color-note"
            onClick={() => setIsOpenModalConfirmBlock(false)}
          >
            Hủy
          </div>
        </motion.div>
        {isOpenModalResponseForBlock && (
          <ModalResponseForBlock
            isOpenModalResponseForBlock={isOpenModalResponseForBlock}
            setIsOpenModalResponseForBlock={setIsOpenModalResponseForBlock}
            setModalIsSetting={setModalIsSetting}
            setIsOpenModalConfirmBlock={setIsOpenModalConfirmBlock}
            userProfileUserName={userProfile?.userName}
          />
        )}
      </Modal>
    </div>
  );
};

export default ModalConfirmBlock;
