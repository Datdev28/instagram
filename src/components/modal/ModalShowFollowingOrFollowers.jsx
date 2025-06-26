import Modal from "react-modal";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { LuUserPlus } from "react-icons/lu";
import userProfileStore from "../../store/userProfileStore";
import UserFollower from "../profileUser/UserFollower";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import useAuthStore from "../../store/authStore";
import UserFollowing from "../profileUser/UserFollowing";
const ModalShowFollowingOrFollowers = ({
  isOpenModalShowFollow,
  setIsOpenModalShowFollow,
  showType,
}) => {
  const userProfile = userProfileStore((state) => state.userProfile);
  useLockBodyScroll(isOpenModalShowFollow);
  const user = useAuthStore((state) => state.user);
  const ownProfile = userProfile.userName === user.userName;
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalShowFollow}
        onRequestClose={() => setIsOpenModalShowFollow(false)}
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
            maxWidth: "400px",
          },
        }}
      >
        <motion.div className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none">
          <div className="flex flex-col w-full">
            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center relative">
              <p className="font-bold">
                {showType === "followers" ? "Người theo dõi" : "Đang theo dõi"}
              </p>
              <IoMdClose
                className="absolute top-2 right-4 text-2xl cursor-pointer"
                onClick={() => setIsOpenModalShowFollow(false)}
              />
            </div>
            <div className="flex flex-col py-4 max-h-[426px] overflow-y-scroll custom-scrollbar text-white gap-y-6 px-4">
              {showType === "followers"
                ? userProfile.followers.map((userFollowerId) => (
                    <UserFollower userFollowerId={userFollowerId} />
                  ))
                : userProfile.following.map((userFollwingId) => (
                    <UserFollowing userFollwingId={userFollwingId} />
                  ))}
            </div>
            {(showType === 'followers' ? userProfile.followers.length === 0 : userProfile.following.length === 0) && (
              <div className="flex flex-col items-center justify-center w-full py-16 gap-y-2">
                <div className="w-[4.5rem] h-[4.5rem] p-4 border-2 rounded-full flex justify-center items-center">
                  <LuUserPlus className="text-5xl" />
                </div>
                <p className="font-bold text-3xl">
                  {showType === "followers"
                    ? "Người theo dõi"
                    : "Đang theo dõi"}
                </p>
                {showType === "following" ? (
                  <p className="text-center text-md break-words">
                    Tất cả những người{" "}
                    {ownProfile ? "bạn" : userProfile.userName} theo dõi sẽ xuất
                    hiện ở đây.
                  </p>
                ) : (
                  <p className="text-center text-md break-words">
                    Tất cả những người theo dõi{" "}
                    {ownProfile ? "bạn" : userProfile.userName} sẽ xuất hiện ở
                    đây.
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalShowFollowingOrFollowers;
