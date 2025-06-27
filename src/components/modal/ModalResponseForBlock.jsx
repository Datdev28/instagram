import Modal from "react-modal";
import { motion } from "framer-motion";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
const ModalResponseForBlock = ({
  isOpenModalResponseForBlock,
  setIsOpenModalResponseForBlock,
  setModalIsSetting,
  setIsOpenModalConfirmBlock,
  userProfileUserName
}) => {
  useLockBodyScroll(isOpenModalResponseForBlock); 
  const handleClickSkip = () => {
    setIsOpenModalResponseForBlock(false);
    setIsOpenModalConfirmBlock(false);
    setModalIsSetting(false);
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalResponseForBlock}
        onRequestClose={() => setIsOpenModalResponseForBlock(false)}
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
          className="bg-color-dash text-white overflow-hidden rounded-xl w-full flex flex-col items-center gap-y-1 select-none py-2"
        >
          <div className="flex flex-col w-full text-center items-center gap-y-6">
            <p className="text-xl">Đã chặn {userProfileUserName}</p>
            <p className="text-md text-color-text-gray">Bạn có thể vào trang cá nhân họ để bỏ chặn bất cứ lúc nào.</p>
            <button
              className="w-full flex justify-center py-1 border-t border-color-input-gray cursor-pointer"
              onClick={handleClickSkip}
            >
              Bỏ qua
            </button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalResponseForBlock;
