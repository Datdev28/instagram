import Modal from "react-modal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
const ModalSetting = ({
  modalIsOpenSetting,
  setModalIsSetting,
  setIsOpenModalIntroduceAcc,
}) => {
  useLockBodyScroll(modalIsOpenSetting);
  const { handleLogOut } = useLogOut();
  const navigate = useNavigate();
  const handleClickLogOut = async () => {
    await handleLogOut();
    navigate("/auth");
  };
  const handleClickIntroduceAcc = () => {
    setIsOpenModalIntroduceAcc(true);
    setModalIsSetting(false);
  };
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
            <Link to="/qr">
              <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note">
                Mã QR
              </div>
            </Link>
            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note">
              Thông báo
            </div>
            <div
              className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={handleClickLogOut}
            >
              Đăng xuất
            </div>
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
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalSetting;
