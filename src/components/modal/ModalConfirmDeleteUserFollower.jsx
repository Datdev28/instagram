import Modal from "react-modal";
import { motion } from "framer-motion";
const ModalConfirmDeleteUserFollower = ({
  isOpenModalConfirmDeleteUserFollower,
  setIsOpenModalConfirmDeleteUserFollower,
  handleDeleteFollower,
  userFollow,
  userId,
  setIsDeleted,
}) => {
  console.log(userFollow);
  const handleClickDeleteUserFollower = async () => {
    setIsOpenModalConfirmDeleteUserFollower(false);
    setIsDeleted(true);
    await handleDeleteFollower(userFollow?.uid, userId);
  };
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalConfirmDeleteUserFollower}
        onRequestClose={() => setIsOpenModalConfirmDeleteUserFollower(false)}
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
        <motion.div className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center select-none">
          <div className="flex flex-col items-center text-center p-8 gap-y-4">
            <img
              src={userFollow?.profilePicURL || "/defaultProfilePic.jpg"}
              className="w-18 h-18 rounded-full object-cover"
              alt="người dùng follow"
            />
            <div className="items-center space-y-2">
              <p className="text-xl font-bold">Xóa người theo dõi?</p>
              <p className="text-sm text-color-text-gray">
                Instagram sẽ không cho{" "}
                {userFollow?.userName || "người dùng này"} biết rằng bạn đã xóa
                họ khỏi danh sách người theo dõi mình.
              </p>
            </div>
          </div>
          <div
            className="flex flex-col w-full justify-center items-center border-t border-t-color-btn-gray hover:bg-color-note cursor-pointer"
            onClick={handleClickDeleteUserFollower}
          >
            <p className="text-red-500 font-bold py-2">Xóa</p>
          </div>
          <div
            className="w-full py-2 border-t border-t-color-btn-gray flex justify-center cursor-pointer hover:bg-color-note"
            onClick={() => setIsOpenModalConfirmDeleteUserFollower(false)}
          >
            Hủy
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalConfirmDeleteUserFollower;
