import Modal from "react-modal";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import useAuthStore from "../../store/authStore";
import ModalConfirmBlock from "./ModalConfirmBlock";
import { useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import useIsBlockedUser from "../../hooks/useIsBlockedUser";
import useUnblockUser from "../../hooks/useUnblockUser";
import useBlockListStore from "../../store/blockListStore";
const ModalSetting = ({
  modalIsOpenSetting,
  setModalIsSetting,
  setIsOpenModalIntroduceAcc,
  setIsOpenModalReportAccount,
}) => {
  useLockBodyScroll(modalIsOpenSetting);
  const { username } = useParams();
  const userProfile = userProfileStore(state => state.userProfile)
  const { blockedByMe } = useIsBlockedUser(userProfile?.uid);
  const removeBlockedId = useBlockListStore(state => state.removeBlockedId);
  const [isOpenModalConfirmBlock, setIsOpenModalConfirmBlock] = useState(false);
  const { handleLogOut } = useLogOut();
  const {handleUnblockUser} = useUnblockUser();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const handleClickLogOut = async () => {
    await handleLogOut();
    navigate("/auth");
  };
  const handleClickBlock = async() => {
    if(blockedByMe){
      setModalIsSetting(false);
      await handleUnblockUser(user?.uid, userProfile?.uid);
      removeBlockedId(userProfile?.uid);
    }else {
     setIsOpenModalConfirmBlock(true);
    }
  };
  const handleClickIntroduceAcc = () => {
    setIsOpenModalIntroduceAcc(true);
    setModalIsSetting(false);
  };
  const handleClickReportAcc = () => {
    setIsOpenModalReportAccount(true);
    setModalIsSetting(false);
  };
  const isOwnerProfile = username === user.userName;
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpenSetting}
        onRequestClose={() => setModalIsSetting(false)}
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="bg-color-dash text-white overflow-hidden rounded-md w-full flex flex-col items-center gap-y-2 select-none"
        >
          <div className="flex flex-col w-full">
            {isOwnerProfile ? (
              <>
                <div
                  className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
                  onClick={handleClickLogOut}
                >
                  Đăng xuất
                </div>
                <Link to={`/qr`}>
                  <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note">
                    Mã QR
                  </div>
                </Link>
                <Link to={`/accounts/password`}>
                  <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note">
                    Cài đặt và quyền riêng tư
                  </div>
                </Link>
              </>
            ) : (
              <>
                <div
                  className="w-full text-red-500 font-bold border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
                  onClick={handleClickBlock}
                >
                  {blockedByMe ? "Bỏ chặn" : "Chặn"}
                </div>
                <div
                  className="w-full text-red-500 font-bold border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
                  onClick={handleClickReportAcc}
                >
                  Báo cáo
                </div>
              </>
            )}
            <div
              className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={handleClickIntroduceAcc}
            >
              Giới thiệu về tài khoản này
            </div>
            <div
              className="w-full  py-2 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={() => setModalIsSetting(false)}
            >
              Hủy
            </div>
          </div>
          {isOpenModalConfirmBlock && (
            <ModalConfirmBlock
              isOpenModalConfirmBlock={isOpenModalConfirmBlock}
              setIsOpenModalConfirmBlock={setIsOpenModalConfirmBlock}
              setModalIsSetting={setModalIsSetting}
            />
          )}
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalSetting;
