import Modal from "react-modal";
import { motion } from "framer-motion";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
const ModalSettingCollection = ({
  isOpenModalSettingCollection,
  setIsOpenModalSettingCollection,
  setIsOpenModalConfirmDelCollection,
  setIsOpenModalShowSavePostsToPick,
  setIsOpenModalCreateNameCollection,
}) => {
  useLockBodyScroll(isOpenModalSettingCollection);
  const handleClickDelCollection = () => {
    setIsOpenModalConfirmDelCollection(true);
    setIsOpenModalSettingCollection(false);
  };
  const handleClickAddPostInCollection = () => {
    setIsOpenModalShowSavePostsToPick(true);
    setIsOpenModalSettingCollection(false);
  };
  const handleClickEditPostInCollection = () => {
    setIsOpenModalCreateNameCollection(true);
    setIsOpenModalSettingCollection(false);
  };
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalSettingCollection}
        onRequestClose={() => setIsOpenModalSettingCollection(false)}
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
            maxWidth: "350px",
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
          className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none"
        >
          <div className="flex flex-col w-full">
            <div
              className="w-full border-b border-b-color-btn-gray text-red-500 font-bold py-3 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={handleClickDelCollection}
            >
              Xóa bộ sưu tập
            </div>
            <div
              className="w-full border-b border-b-color-btn-gray py-3 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={handleClickAddPostInCollection}
            >
              Thêm từ mục đã lưu
            </div>
            <div
              className="w-full border-b border-b-color-btn-gray py-3 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={handleClickEditPostInCollection}
            >
              Chỉnh sửa bộ sưu tập
            </div>
            <div
              className="w-full  py-2 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={() => setIsOpenModalSettingCollection(false)}
            >
              Hủy
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalSettingCollection;
