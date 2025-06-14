import Modal from "react-modal";
import { motion } from "framer-motion";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import { FaCalendarDays } from "react-icons/fa6";
import formatMonthYear from "../../utils/convertFormatMonthYear";
const ModalIntroduceAcc = ({
  userId,
  isOpenModalIntroduceAcc,
  setIsOpenModalIntroduceAcc,
}) => {
  const { userProfile } = useGetProfileUserById(userId);
  return (
    <Modal
      appElement={document.getElementById("root")}
      isOpen={isOpenModalIntroduceAcc}
      onRequestClose={() => setIsOpenModalIntroduceAcc(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
        },
        content: {
          top: "8rem",
          left: "auto",
          right: "auto",
          bottom: "auto",
          padding: 0,
          border: "none",
          background: "transparent",
          borderRadius: "0.5rem",
          overflow: "visible",
          width: "100%",
          maxWidth: "460px",
        },
      }}
    >
      <motion.div className="bg-black text-white overflow-hidden rounded-xl w-full flex flex-col items-center gap-y-2 select-none">
        <div className="w-full bg-color-dash py-2 flex justify-center relative">
          <p className="font-bold">Chỉnh sửa thông tin</p>
        </div>
        <div className=" flex flex-col w-full px-6 py-2 gap-y-6">
          {userProfile ? (
            <>
              <div className="flex flex-col text-center items-center">
                <img
                  src={userProfile?.profilePicURL || "/defaultProfilePic.jpg"}
                  className="w-16 h-16 rounded-full object-cover"
                  alt="hình ảnh đại diện"
                />
                <p className="font-bold">{userProfile?.userName}</p>
                <p className="text-xs text-color-text-gray">
                  Để góp phần xây dựng một cộng đồng trung thực, chúng tôi hiển
                  thị thông tin về các tài khoản trên Instagram.{" "}
                </p>
              </div>
              <div className="flex gap-x-4 items-center">
                <FaCalendarDays className="text-3xl text-white" />
                <div className="gap-y-2">
                  <p>Ngày tham gia</p>
                  <p className="text-sm text-color-text-gray">
                    {formatMonthYear(userProfile?.createAt)}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center bg-black min-h-[350px]">
              <img
                className="object-cover w-12 h-12 rounded-full"
                src="/loading.gif"
                alt="gif"
              />
            </div>
          )}
        </div>
        <div
          className="w-full bg-color-dash py-2 flex justify-center cursor-pointer relative"
          onClick={() => setIsOpenModalIntroduceAcc(false)}
        >
          <p className="font-bold">Đóng</p>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ModalIntroduceAcc;
