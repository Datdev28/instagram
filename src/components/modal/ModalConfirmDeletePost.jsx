import Modal from "react-modal";
import { motion } from "framer-motion";
import useDeletePost from "../../hooks/useDeletePost";
import { useNavigate } from "react-router-dom";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import useDeleteReport from "../../hooks/useDeleteReport";
const ModalConfirmDeletePost = ({
  isOpenModalConfirmDeletePost,
  setIsOpenModalConfirmDeletePost,
  post,
  reportId,
  isOpenFromReport = false,
}) => {
  useLockBodyScroll(isOpenModalConfirmDeletePost);
  const navigate = useNavigate();
  const {handleDeleteReport} = useDeleteReport();
  const { handleDeletePost, isDeleting } = useDeletePost();
  const handleClickDeletePost = () => {
    handleDeletePost(post.id);
    if (!isDeleting) {
      navigate(`/${post.byUserName}`);
    }
  };
  const handleClickDeleteReport = async() => {
     await handleDeleteReport(reportId);
     setIsOpenModalConfirmDeletePost(false);
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalConfirmDeletePost}
        onRequestClose={() => setIsOpenModalConfirmDeletePost(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
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
          className={`${
            isOpenFromReport
              ? "text-black bg-white"
              : "bg-color-dash text-white"
          } overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none`}
        >
          <div className="flex flex-col w-full">
            <div className="w-full border-b border-b-color-btn-gray py-6 gap-y-2 flex flex-col text-center">
              <p className="text-xl font-semibold">
                {isOpenFromReport ? "Xóa báo cáo" : "Xóa bài viết"}
              </p>
              <p className="text-color-text-gray">
                {isOpenFromReport
                  ? "Nếu bạn xóa, báo cáo này sẽ mất vĩnh viễn"
                  : "Nếu bạn Xóa, bài viết này sẽ mất vĩnh viễn"}
              </p>
            </div>
            {isOpenFromReport ? (
              <div
                className={`w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-gray-200 `}
                onClick={handleClickDeleteReport}
              >
                <p className="text-red-500 font-bold">Xóa</p>
              </div>
            ) : (
              <div
                className={`w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note `}
                onClick={handleClickDeletePost}
              >
                <p className="text-red-500 font-bold">Xóa</p>
              </div>
            )}
            <div
              className={`w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer ${
                isOpenFromReport ? "hover:bg-gray-200" : "hover:bg-color-note"
              } `}
              onClick={() => setIsOpenModalConfirmDeletePost(false)}
            >
              Hủy
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalConfirmDeletePost;
