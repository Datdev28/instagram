import Modal from "react-modal";
import { motion } from "framer-motion";
import useDeleteCollection from "../../hooks/useDeleteCollection";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
const ModalConfirmDeleteCollection = ({
  isOpenModalConfirmDelCollection,
  setIsOpenModalConfirmDelCollection,
  collectionId,
}) => {
  const { handleDelCollection, isDeleting } = useDeleteCollection(collectionId);
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const handleClickConfirmdelCollection = async () => {
    await handleDelCollection();
    setIsOpenModalConfirmDelCollection(false);
    navigate(`/${user.userName}/saved`);
  };
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalConfirmDelCollection}
        onRequestClose={() => setIsOpenModalConfirmDelCollection(false)}
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
            maxWidth: "400px",
          },
        }}
      >
        <motion.div className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none">
          <div className="flex flex-col w-full">
            <div className="w-full border-b border-b-color-btn-gray py-6 gap-y-2 flex flex-col text-center">
              <p className="text-xl">Xóa bộ sưu tập</p>
              <p className="text-color-text-gray">
                Hệ thống vẫn sẽ lưu ảnh khi bạn xóa bộ sưu tập này.
              </p>
            </div>
            <div
              className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={handleClickConfirmdelCollection}
            >
              {isDeleting ? (
                <img
                  className="object-cover w-7 h-7 rounded-full"
                  src="/loading.gif"
                  alt="gif"
                />
              ) : (
                <p className="text-red-500 font-bold">Xóa</p>
              )}
            </div>
            <div
              className="w-full  py-2 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={() => setIsOpenModalConfirmDelCollection(false)}
            >
              Hủy
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalConfirmDeleteCollection;
