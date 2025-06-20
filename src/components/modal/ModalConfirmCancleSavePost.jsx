import Modal from "react-modal";
import { motion } from "framer-motion";
import { memo } from "react";
import useIsToggleGoToPostFromCollectionStore from "../../store/isToggleGoToPostFromCollectionStore";
import useUnsaveFromAllCollections from "../../hooks/useUnsaveFromAllCollections"
import useSavePost from "../../hooks/useSavePost";
const ModalConfirmCancleSavePost = ({
  isOpenModalConfirmCancleSavePost,
  setIsOpenModalConfirmCancleSavePost,
  postId,
  collectionId
}) => {
  const isFromCollectionSmall = useIsToggleGoToPostFromCollectionStore(
    (state) => state.isFromCollectionSmall
  );
  const {handleUnsaveFromAllCollections} =  useUnsaveFromAllCollections(postId, collectionId);
  const {handleSavePost} = useSavePost(postId);
  const handleClickUnsavePostFromAllCollections = async () => {
    setIsOpenModalConfirmCancleSavePost(false);
    await handleUnsaveFromAllCollections();
    await handleSavePost();
  }
  const handleClickUnSavePostFromCollection = async() => {
    setIsOpenModalConfirmCancleSavePost(false);
    handleUnsaveFromAllCollections();
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalConfirmCancleSavePost}
        onRequestClose={() => setIsOpenModalConfirmCancleSavePost(false)}
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
          className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none"
        >
          <div className="flex flex-col w-full">
            <div className="w-full border-b border-b-color-btn-gray py-6 gap-y-2 flex flex-col text-center">
              <p>Gỡ khỏi mục đã lưu và bộ sưu tập?</p>
              <p className="text-color-text-gray text-sm px-4">
                {isFromCollectionSmall
                  ? "Bạn có thể gỡ bài viết khỏi bộ sưu tập này hoặc gỡ khỏi mọi nơi bạn đã lưu"
                  : "Gỡ mục này khỏi mục đã lưu cũng sẽ gỡ mục khỏi bộ sưu tập."}
              </p>
            </div>
            {isFromCollectionSmall && (
              <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note">
                <p className="text-red-500 font-bold">Gỡ khỏi bộ sưu tập</p>
              </div>
            )}

            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note"
             onClick={handleClickUnsavePostFromAllCollections}
            >
              <p className="text-red-500 font-bold">Gỡ</p>
            </div>
            <div
              className="w-full  py-2 flex justify-center cursor-pointer hover:bg-color-note"
              onClick={() => setIsOpenModalConfirmCancleSavePost(false)}
            >
              Hủy
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default memo(ModalConfirmCancleSavePost);
