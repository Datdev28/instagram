import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import useAuthStore from "../../store/authStore";
import ProfileUserPost from "./ProfileUserPost";
import Footer from "../footer/Footer";
import userProfileStore from "../../store/userProfileStore";
import useGetProfileUserByUsername from "../../hooks/useGetProfileUserByUsername";
import ModalSettingCollection from "../modal/ModalSettingCollection";
import ModalShowPostSavesToPick from "../modal/ModalShowSavePostsToPick";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ModalConfirmDeleteCollection from "../modal/ModalConfirmDeleteCollection";
import useGetCollectionFromCollections from "../../hooks/useGetCollectionFromCollections";
import ModalCreateNameCollection from "../modal/ModalCreateNameCollection";
const ProfileDetailCollection = ({ isCollection = false }) => {
  const navigate = useNavigate();
  const { collectionId, username } = useParams();
  const { collection } = useGetCollectionFromCollections(collectionId);
  const [isOpenModalShowSavePostsToPick, setIsOpenModalShowSavePostsToPick] =
    useState(false);
  const { userProfile } = useGetProfileUserByUsername(username);
  const setUserProfile = userProfileStore((state) => state.setUserProfile);
  const [isOpenModalSettingCollection, setIsOpenModalSettingCollection] =
    useState(false);
  const [isOpenModalCreateNameCollection, setIsOpenModalCreateNameCollection] =
    useState(false);
  const [nameCollectionInput, setNameCollectionInput] = useState("");
  const [isOpenModalConfirmDelCollection, setIsOpenModalConfirmDelCollection] =
    useState(false);
  const user = useAuthStore((state) => state.user);
  const handleClickBackSaved = () => {
    navigate(`/${user?.userName}/saved`);
    setUserProfile(null);
  };
  useEffect(() => {
    if (user && username !== user.userName) {
      navigate(`/${username}`);
    }
  }, [username, user, navigate]);
  const noPickedPost =
    collection?.pickedPosts?.length === 0 ||
    userProfile?.savePosts.length === 0;
  useEffect(() => {
    if (collection?.name) {
      setNameCollectionInput(collection.name);
    }
  }, [collection?.name]);
  return (
    userProfile && (
      <div className="w-full flex flex-col items-center px-2 max-sm:mt-10 mt-4 text-white">
        <div className="flex flex-col max-w-4xl w-full gap-y-4">
          <div
            className="flex items-center gap-x-1 text-color-text-gray cursor-pointer"
            onClick={handleClickBackSaved}
          >
            <FaChevronLeft />
            <p>Đã lưu</p>
          </div>
          <div className="flex items-center justify-between max-sm:gap-x-4">
            <p className="text-xl text-white break-all pr-4">
              {isCollection ? `${collection?.name}` : "Tất cả bài viết"}
            </p>
            {isCollection && (
              <HiOutlineDotsHorizontal
                className="text-2xl cursor-pointer"
                onClick={() => setIsOpenModalSettingCollection(true)}
              />
            )}
          </div>
          {(!isCollection
            ? userProfile?.savePosts.length > 0
            : collection?.pickedPosts?.length > 0) && (
            <div className="flex flex-col gap-y-2 min-h-[50vh] max-sm:min-h-[30vh]">
              <div className="grid grid-cols-3 gap-1 w-full">
                {isCollection
                  ? collection?.pickedPosts.map((postId) => (
                      <ProfileUserPost
                        key={postId}
                        postId={postId}
                        showPostSave={true}
                        fromCollectionSmall={true}
                        collectionId={collectionId}
                      />
                    ))
                  : userProfile?.savePosts.map((postId) => (
                      <ProfileUserPost
                        key={postId}
                        postId={postId}
                        showPostSave={true}
                      />
                    ))}
              </div>
            </div>
          )}

          {noPickedPost && (
            <div className="flex flex-col items-center justify-center w-full py-16 gap-y-2">
              <div className="w-[4.5rem] h-[4.5rem] border-2 rounded-full flex justify-center items-center">
                <FaRegBookmark className="text-5xl" />
              </div>
              <p className="text-center text-md font-bold text-3xl mt-4">
                Bắt đầu lưu
              </p>
              <p className="text-center">
                Lưu ảnh và video vào bộ sưu tập của bạn.
              </p>
            </div>
          )}
          <Footer />
          {isOpenModalSettingCollection && (
            <ModalSettingCollection
              isOpenModalSettingCollection={isOpenModalSettingCollection}
              setIsOpenModalSettingCollection={setIsOpenModalSettingCollection}
              setIsOpenModalConfirmDelCollection={
                setIsOpenModalConfirmDelCollection
              }
              setIsOpenModalShowSavePostsToPick={
                setIsOpenModalShowSavePostsToPick
              }
              setIsOpenModalCreateNameCollection={
                setIsOpenModalCreateNameCollection
              }
              collectionId={collectionId}
            />
          )}
          {isOpenModalConfirmDelCollection && (
            <ModalConfirmDeleteCollection
              isOpenModalConfirmDelCollection={isOpenModalConfirmDelCollection}
              setIsOpenModalConfirmDelCollection={
                setIsOpenModalConfirmDelCollection
              }
              collectionId={collectionId}
            />
          )}
          {isOpenModalShowSavePostsToPick && (
            <ModalShowPostSavesToPick
              isOpenModalShowSavePostsToPick={isOpenModalShowSavePostsToPick}
              setIsOpenModalShowSavePostsToPick={
                setIsOpenModalShowSavePostsToPick
              }
              addPostFromCollection={true}
              collectionId={collectionId}
            />
          )}
          {isOpenModalCreateNameCollection && (
            <ModalCreateNameCollection
              isOpenModalCreateNameCollection={isOpenModalCreateNameCollection}
              setIsOpenModalCreateNameCollection={
                setIsOpenModalCreateNameCollection
              }
              nameCollectionInput={nameCollectionInput}
              setNameCollectionInput={setNameCollectionInput}
              isEditName={true}
              collectionId={collectionId}
            />
          )}
        </div>
      </div>
    )
  );
};

export default ProfileDetailCollection;
