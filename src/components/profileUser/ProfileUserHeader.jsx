import { RiSettings4Fill } from "react-icons/ri";
import { useState } from "react";
import ModalNote from "../modal/modalNoteProfile";
import userProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import { HiDotsHorizontal } from "react-icons/hi";
import ModalIsOpenEditProfile from "../../components/modal/ModalEditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import ModalNotifiAuth from "../modal/ModalNotifiAuth";
import ModalSetting from "../modal/ModalSettingAcc";
import ModalIntroduceAcc from "../modal/ModalIntroduceAcc";
import ModalReportAccount from "../modal/ModalReportAccount";
import ModalReasonReportAccount from "../modal/ModalReasonReportAccount";
import ModalReponseForReport from "../modal/ModalReponseForReport";
const ProfileUserHeader = () => {
  const [modalIsOpenNote, setModalIsOpenNote] = useState(false);
  const [modalIsOpenEditProfile, setModalIsOpenEditProfile] = useState(false);
  const [modalIsOpenNotifiAuth, setModalIsOpenNotifiAuth] = useState(false);
  const [modalIsOpenSetting, setModalIsSetting] = useState(false);
  const [isOpenModalIntroduceAcc, setIsOpenModalIntroduceAcc] = useState(false);
  const [isOpenModalReportAccount, setIsOpenModalReportAccount] =
    useState(false);
  const [isOpenModalReponseForReport, setIsOpenModalReponseForReport] =
    useState(false);
  const [isOpenModalReasonReportAccount, setIsOpenModalReasonReportAccount] =
    useState(false);
  const { userProfile } = userProfileStore();
  const userAuth = useAuthStore((state) => state.user);
  const { isLoading, isFollowing, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );
  const isOwnProfile = userAuth && userAuth.userName === userProfile.userName;
  return (
    userProfile && (
      <div className="flex flex-col w-full max-sm:mt-18 mt-10">
        <div className="flex px-10 w-full items-center justify-center gap-x-10 max-md:px-2 mb-10">
          <div className="relative flex flex-col justify-center">
            <img
              className="w-[10rem] max-md:w-[77px] aspect-square object-cover rounded-full cursor-pointer"
              src={userProfile.profilePicURL || "/defaultProfilePic.jpg"}
              alt="avatar"
            />
            {isOwnProfile ? (
              <div
                className="absolute top-[-1.2rem] max-md:top-[-2rem] max-md:left-0 left-10 flex justify-center items-center w-[4rem] h-[2rem] rounded-xl bg-color-note py-5 cursor-pointer"
                onClick={() => setModalIsOpenNote(!modalIsOpenNote)}
              >
                <p className="break-words text-color-text-gray text-[12px]">
                  Ghi chú...
                </p>
                <div className="absolute bottom-[-0.5rem] left-[1rem] rounded-full  bg-color-note  w-[1rem] h-[1rem]">
                  <div className="absolute top-[1rem] left-[0.5rem] rounded-full  bg-color-note  w-[0.5rem] h-[0.5rem]"></div>
                </div>
              </div>
            ) : (
              ""
            )}

            <p className="font-semibold hidden max-md:block whitespace-nowrap text-center ">
              {userProfile.fullName}
            </p>
          </div>
          <div className="flex flex-col gap-y-7 max-md:text-xs ">
            <div className="flex items-center gap-x-5 max-sm:flex-col max-sm:gap-y-4 max-sm:items-start max-sm:justify-start">
              <p>{userProfile.userName}</p>
              {isOwnProfile ? (
                <div className="flex items-center break-words gap-x-2">
                  <button
                    className="px-4 py-1 bg-color-btn-gray rounded-sm cursor-pointer hover:bg-color-dash max-xl:px-1"
                    onClick={() =>
                      setModalIsOpenEditProfile(!modalIsOpenEditProfile)
                    }
                  >
                    Chỉnh sửa trang cá nhân
                  </button>
                  <button className="px-4 py-1 bg-color-btn-gray rounded-sm hover:bg-color-dash cursor-pointer max-xl:px-1">
                    Xem kho lưu trữ
                  </button>
                  <RiSettings4Fill
                    className="text-3xl text-white cursor-pointer"
                    onClick={() => setModalIsSetting(true)}
                  />
                </div>
              ) : (
                <div className="flex items-center break-words gap-x-2">
                  <button
                    className="px-2 h-9 items-center flex justify-center bg-blue-500 rounded-sm cursor-pointer hover:bg-blue-600 max-xl:px-2"
                    onClick={() =>
                      userAuth
                        ? handleFollowUser()
                        : setModalIsOpenNotifiAuth(true)
                    }
                  >
                    {isLoading ? (
                      <img
                        className="object-cover w-7 h-7 rounded-full"
                        src="/loading.gif"
                        alt="loading"
                      />
                    ) : isFollowing ? (
                      "Đang theo dõi"
                    ) : (
                      "Theo dõi"
                    )}
                  </button>
                  <button className="px-4 py-1 bg-color-btn-gray rounded-sm hover:bg-color-dash cursor-pointer max-xl:px-2">
                    Nhắn tin
                  </button>
                  <HiDotsHorizontal
                    className="text-2xl text-white cursor-pointer"
                    onClick={() => setModalIsSetting(true)}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-10 font-semibold max-md:hidden">
              <p>
                <span className="w-3 inline-block">
                  {userProfile.posts.length}
                </span>
                <span className="text-color-text-gray">bài viết</span>
              </p>
              <p>
                <span className="w-3 inline-block mx-[6px]">
                  {userProfile.followers.length}
                </span>
                <span className="text-color-text-gray">người theo dõi</span>
              </p>
              <p className="text-color-text-gray">
                Đang theo dõi
                <span className="mx-[6px] inline-block text-white">
                  {userProfile.following.length}
                </span>
                người dùng
              </p>
            </div>
            <p className="font-semibold max-md:hidden">
              {userProfile.fullName}
            </p>
            <p className="whitespace-nowrap mt-[-1rem] text-xs">
              {userProfile.bio}
            </p>
          </div>
        </div>
        <div className="hidden max-md:flex flex-col w-full">
          <hr className="border-color-dash w-full" />
          <div className="flex items-center gap-x-12 justify-center text-[14px] max-md:mt-4">
            <p className="text-center">
              <span className="w-5 inline-block">
                {userProfile.posts.length}
              </span>
              <span className="text-color-text-gray ">bài viết</span>
            </p>
            <p className="text-center">
              <span className="w-5 inline-block">
                {userProfile.followers.length}
              </span>
              <span className="text-color-text-gray ">người theo dõi</span>
            </p>
            <p className="text-color-text-gray text-center">
              Đang theo dõi <br />{" "}
              <span className="text-white w-6 inline-block">
                {userProfile.following.length}
              </span>
              <br /> người dùng
            </p>
          </div>
        </div>
        {modalIsOpenNote && (
          <ModalNote
            modalIsOpenNote={modalIsOpenNote}
            setModalIsOpenNote={setModalIsOpenNote}
          />
        )}
        {modalIsOpenEditProfile && (
          <ModalIsOpenEditProfile
            modalIsOpenEditProfile={modalIsOpenEditProfile}
            setModalIsOpenEditProfile={setModalIsOpenEditProfile}
          />
        )}
        {modalIsOpenNotifiAuth && (
          <ModalNotifiAuth
            modalIsOpenNotifiAuth={modalIsOpenNotifiAuth}
            setModalIsOpenNotifiAuth={setModalIsOpenNotifiAuth}
          />
        )}
        {modalIsOpenSetting && (
          <ModalSetting
            modalIsOpenSetting={modalIsOpenSetting}
            setModalIsSetting={setModalIsSetting}
            setIsOpenModalIntroduceAcc={setIsOpenModalIntroduceAcc}
            setIsOpenModalReportAccount={setIsOpenModalReportAccount}
          />
        )}
        {isOpenModalIntroduceAcc && (
          <ModalIntroduceAcc
            userId={userProfile.uid}
            isOpenModalIntroduceAcc={isOpenModalIntroduceAcc}
            setIsOpenModalIntroduceAcc={setIsOpenModalIntroduceAcc}
          />
        )}
        {isOpenModalReportAccount && (
          <ModalReportAccount
            isOpenModalReportAccount={isOpenModalReportAccount}
            setIsOpenModalReportAccount={setIsOpenModalReportAccount}
            setIsOpenModalReasonReportAccount={
              setIsOpenModalReasonReportAccount
            }
          />
        )}
        {isOpenModalReasonReportAccount && (
          <ModalReasonReportAccount
            isOpenModalReasonReportAccount={isOpenModalReasonReportAccount}
            setIsOpenModalReasonReportAccount={
              setIsOpenModalReasonReportAccount
            }
            setIsOpenModalReportAccount={setIsOpenModalReportAccount}
            setIsOpenModalReponseForReport={setIsOpenModalReponseForReport}
          />
        )}
        {isOpenModalReponseForReport && (
          <ModalReponseForReport
            isOpenModalReponseForReport={isOpenModalReponseForReport}
            setIsOpenModalReponseForReport={setIsOpenModalReponseForReport}
          />
        )}
      </div>
    )
  );
};

export default ProfileUserHeader;
