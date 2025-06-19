import { useNavigate, useParams } from "react-router-dom";
import userProfileStore from "../../store/userProfileStore";
import ImageSavePost from "./ImageSavePost";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import ModalCreateNameCollection from "../modal/ModalCreateNameCollection";
import ModalShowSavePostsToPick from "../modal/ModalShowSavePostsToPick";
import useGetCollectionsOfUser from "../../hooks/useGetCollectionsOfUser";
const ProfileSavePosts = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [nameCollectionInput, setNameCollectionInput] = useState("");
  const userProfile = userProfileStore((state) => state.userProfile);
  const user = useAuthStore((state) => state.user);
  const [isOpenModalCreateNameCollection, setIsOpenModalCreateNameCollection] =
    useState(false);
  const [isOpenModalShowSavePostsToPick, setIsOpenModalShowSavePostsToPick] =
    useState(false);
  const { collections } = useGetCollectionsOfUser();
  const handleClickGoToAllPosts = () => {
    navigate("all-posts");
  };
  const handleClickCreateCollection = () => {
    setIsOpenModalCreateNameCollection(true);
  };
  useEffect(() => {
    if (user && username !== user.userName) {
      navigate(`/${username}`);
    }
  }, [username, user, navigate]);
  return (
    <div className="w-full flex flex-col mt-4 gap-y-6">
      <div className="flex justify-between items-center max-sm:px-4 whitespace-nowrap max-sm:gap-x-4">
        <p className="text-color-text-gray text-xs">
          Chỉ mình bạn mới có thể xem mục đã lưu
        </p>
        <p
          className="cursor-pointer text-blue-500"
          onClick={handleClickCreateCollection}
        >
          + Thêm bộ sưu
        </p>
      </div>
      <div className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 place-items-center gap-y-6">
        <div
          className="w-[280px] h-[280px] relative border border-color-btn-gray cursor-pointer group"
          onClick={handleClickGoToAllPosts}
        >
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity z-20" />
          {userProfile &&
            userProfile.savePosts
              .slice(0, 4)
              .map((postId, index) => (
                <ImageSavePost postId={postId} index={index} />
              ))}
          <p className="absolute bottom-6 left-6 z-30 text-white font-semibold">
            Tất cả bài viết
          </p>
        </div>
        {collections &&
          collections.length > 0 &&
          collections.map((colection) => (
            <div className="w-[280px] h-[280px] relative border border-color-btn-gray cursor-pointer group"
             key={colection.id}
             onClick={() => navigate(`/${user.userName}/saved/${colection.id}`)}
            >
              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity z-20" />
              {colection &&
                colection.pickedPosts
                  .slice(0, 4)
                  .map((postId, index) => (
                    <ImageSavePost postId={postId} index={index} />
                  ))}
              <p className="absolute bottom-6 left-6 z-30 text-white font-semibold max-w-[233px] truncate">
                {colection.name}
              </p>
            </div>
          ))}
      </div>
      {isOpenModalCreateNameCollection && (
        <ModalCreateNameCollection
          isOpenModalCreateNameCollection={isOpenModalCreateNameCollection}
          setNameCollectionInput={setNameCollectionInput}
          nameCollectionInput={nameCollectionInput}
          setIsOpenModalCreateNameCollection={
            setIsOpenModalCreateNameCollection
          }
          setIsOpenModalShowSavePostsToPick={setIsOpenModalShowSavePostsToPick}
        />
      )}
      {isOpenModalShowSavePostsToPick && (
        <ModalShowSavePostsToPick
          isOpenModalShowSavePostsToPick={isOpenModalShowSavePostsToPick}
          setIsOpenModalShowSavePostsToPick={setIsOpenModalShowSavePostsToPick}
          setIsOpenModalCreateNameCollection={
            setIsOpenModalCreateNameCollection
          }
          nameCollectionInput={nameCollectionInput}
        />
      )}
    </div>
  );
};

export default ProfileSavePosts;
