import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import useTurnOffComment from "../../hooks/useTurnOffComment";
import useTurnOffLikes from "../../hooks/useTurnOffLikes";
const ModalSettingPost = ({
  isOpenSettingPost,
  setIsOpenSettingPost,
  setIsOpenModalConfirmDeletePost,
  post,
  openSettingWithoutOwn,
  setIsOpenModalListOfReasons,
  setReportPost,
  setIsOpenModalEditPost
}) => {
  const handleTurnOffComment = useTurnOffComment(post);
  const navigate = useNavigate();
  const handleTurnOffLikes = useTurnOffLikes(post);
  const handleClickDelete = () => {
    setIsOpenSettingPost(false);
    setIsOpenModalConfirmDeletePost(true);
  };
  const goToArticle = () => {
    navigate(`/p/${post.id}`);
    setIsOpenSettingPost(false);
  };

  const handleClickTurnOffComment = () => {
    handleTurnOffComment();
    setIsOpenSettingPost(false);
  };
  const handleClickTurnOffLikes = () => {
    handleTurnOffLikes();
    setIsOpenSettingPost(false);
  };
  const handleOnClickReportPost = () => {
    setIsOpenModalListOfReasons(true);
    setIsOpenSettingPost(false);
    setReportPost(true)
  };
  const handleClickEditPost = () => {
    setIsOpenModalEditPost(true);
    setIsOpenSettingPost(false);
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenSettingPost}
        onRequestClose={() => setIsOpenSettingPost(false)}
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
        <div className="bg-color-dash text-white overflow-hidden rounded-3xl w-full flex flex-col items-center gap-y-2 select-none">
          <div className="flex flex-col w-full">
            {openSettingWithoutOwn ? (
              <>
                <div
                  className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer text-red-500 font-bold"
                  onClick={handleOnClickReportPost}
                >
                  Báo cáo
                </div>
                <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer text-red-500 font-bold">
                  Bỏ theo dõi
                </div>
                <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer ">
                  Thêm vào mục yêu thích
                </div>
              </>
            ) : (
              <>
                <div
                  className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer text-red-500 font-bold"
                  onClick={handleClickDelete}
                >
                  Xóa
                </div>
                <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer"
                 onClick={handleClickEditPost}
                >
                  Chỉnh sửa
                </div>
                <div
                  className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer"
                  onClick={handleClickTurnOffLikes}
                >
                  {post.checkedHideLike
                    ? "Hiển thị số lượt thích với người khác"
                    : "Ẩn số lượt thích với người khác"}
                </div>
                <div
                  className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer"
                  onClick={handleClickTurnOffComment}
                >
                  {post.turnOfComment
                    ? "Bật tính năng bình luận"
                    : "Tắt tính năng bình luận"}
                </div>
              </>
            )}
            <div
              className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer"
              onClick={goToArticle}
            >
              Đi đến bài viết
            </div>
            <div className="w-full border-b border-b-color-btn-gray py-4 flex justify-center cursor-pointer">
              Giới thiệu về tài khoản này
            </div>
            <div
              className="w-full  py-2 flex justify-center cursor-pointer"
              onClick={() => setIsOpenSettingPost(false)}
            >
              Hủy
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalSettingPost;
