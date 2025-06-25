import Modal from "react-modal";
import { motion } from "framer-motion";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import userProfileStore from "../../store/userProfileStore";
import ProfileShowPostPick from "../profileUser/saveAndCollection/ProfileShowPostPick";
import { useState } from "react";
import useCreateCollection from "../../hooks/useCreateCollection";
import useAddPostInCollection from "../../hooks/useAddPostInCollection";
const ModalShowPostSavesToPick = ({
  isOpenModalShowSavePostsToPick,
  setIsOpenModalShowSavePostsToPick,
  addPostFromCollection = false,
  setIsOpenModalCreateNameCollection,
  nameCollectionInput,
  collectionId,
  setNameCollectionInput
}) => {
  useLockBodyScroll(ModalShowPostSavesToPick);
  const userProfile = userProfileStore((state) => state.userProfile);
  const [pickPosts, setPickPosts] = useState([]);
  const { handleCreateCollection, isLoading } = useCreateCollection(
    nameCollectionInput,
    pickPosts
  );
  const { handleAddPostInCollection, isAdding } = useAddPostInCollection(
    collectionId,
    pickPosts
  );
  const handleClickBackCreateName = () => {
    setIsOpenModalCreateNameCollection(true);
    setIsOpenModalShowSavePostsToPick(false);
  };

  const handleClickCreateCollection = async () => {
    if (addPostFromCollection) {
      await handleAddPostInCollection();
      setIsOpenModalShowSavePostsToPick(false);
    } else {
      await handleCreateCollection();
      setNameCollectionInput("")
      setIsOpenModalShowSavePostsToPick(false);
    }
  };
  return (
    <Modal
      appElement={document.getElementById("root")}
      isOpen={isOpenModalShowSavePostsToPick}
      onRequestClose={() => setIsOpenModalShowSavePostsToPick(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
        },
        content: {
          top: "3rem",
          left: "auto",
          right: "auto",
          bottom: "auto",
          padding: 0,
          border: "none",
          background: "transparent",
          borderRadius: "0.5rem",
          overflow: "visible",
          width: "100%",
          maxWidth: "500px",
        },
      }}
    >
      <motion.div className="bg-color-dash text-white overflow-hidden rounded-md w-full flex flex-col select-none  custom-scrollbar ">
        <div className="w-full bg-color-dash py-2 flex justify-center items-center px-4 relative">
          {!addPostFromCollection && (
            <MdKeyboardArrowLeft
              className="text-3xl cursor-pointer"
              onClick={handleClickBackCreateName}
            />
          )}
          <p className="font-bold">Thêm từ mục Đã lưu</p>

          <IoMdClose
            className="text-3xl cursor-pointer absolute right-2 top-1"
            onClick={() => setIsOpenModalShowSavePostsToPick(false)}
          />
        </div>
        <div className="max-h-[580px] h-full overflow-y-auto min-h-[500px] pb-3">
          <div className="grid grid-cols-3 w-full">
            {userProfile &&
              userProfile.savePosts.map((postId) => (
                <ProfileShowPostPick
                  postId={postId}
                  key={postId}
                  setPickPosts={setPickPosts}
                  pickPosts={pickPosts}
                />
              ))}
          </div>
        </div>
        <button
          className="w-full py-2 border-t border-t-color-note justify-center flex text-blue-600 font-semibold cursor-pointer"
          onClick={handleClickCreateCollection}
        >
          {isLoading || isAdding ? (
            <img
              className="object-cover w-7 h-7 rounded-full"
              src="/loading.gif"
              alt="gif"
            />
          ) : (
            "Xong"
          )}
        </button>
      </motion.div>
    </Modal>
  );
};

export default ModalShowPostSavesToPick;
