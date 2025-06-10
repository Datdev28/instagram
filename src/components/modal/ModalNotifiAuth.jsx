import Modal from "react-modal";
import { motion } from "framer-motion";
import userProfileStore from "../../store/userProfileStore";
import { Link } from "react-router-dom";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
const ModalNotifiAuth = ({
  modalIsOpenNotifiAuth,
  setModalIsOpenNotifiAuth,
  modalFromPost,
}) => {
  const { userProfile } = userProfileStore();
  useLockBodyScroll(modalIsOpenNotifiAuth);
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpenNotifiAuth}
        onRequestClose={() => setModalIsOpenNotifiAuth(false)}
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
          className="bg-color-dash text-white p-4 rounded-3xl w-full flex flex-col items-center gap-y-2 select-none"
        >
          <div className="w-full flex justify-end items-center">
            <span
              className="text-white text-2xl cursor-pointer"
              onClick={() => {
                setModalIsOpenNotifiAuth(false);
              }}
            >
              ✕
            </span>
          </div>
          <div className="flex flex-col w-full p-10 max-sm:p-0">
            <div className="w-full gap-y-2 flex flex-col">
              <img
                className=" mx-auto "
                src="introduceFollow.png"
                alt="avatar"
              />
              <p className="font-bold text-2xl text-center">
                {modalFromPost
                  ? "Đăng nhập để xem bài viết này"
                  : "Theo dõi trang cá nhân này"}
              </p>
              {!modalFromPost && (
                <p className="text-xs text-center">
                  {" "}
                  "Là người đầu tiên xem được thông tin mới khi bạn theo dõi{" "}
                  {userProfile.userName}."
                </p>
              )}

              <p className="text-xs text-color-text-gray text-center">
                Bằng cách tiếp tục, bạn đồng ý với{" "}
                <span className="font-semibold text-white">
                  Điều khoản sử dụng
                </span>{" "}
                và{" "}
                <span className="font-semibold text-white">
                  Chính sách quyền riêng tư
                </span>{" "}
                của Instagram
              </p>
              <Link to="/auth">
                <button className="w-full bg-blue-400 py-2 rounded-xl mt-4 cursor-pointer">
                  Đăng kí
                </button>
              </Link>
              <Link to="/auth">
                <div className="flex justify-center mt-2">
                  <p className="cursor-pointer text-blue-600">Đăng nhập</p>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalNotifiAuth;
