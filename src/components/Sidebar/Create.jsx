import React, { useState } from "react";
import { MdOutlineAddComment } from "react-icons/md";
import searchToggleStore from "../../store/searchToggleStore";
import ModalCreatePost from "../modal/ModalCreatePost";
const Create = () => {
  const { isOpenToggle } = searchToggleStore();
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);
  return (
    <>
      <div
        className="flex relative max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
        onClick={() => setModalIsOpenCreate(true)}
      >
        <MdOutlineAddComment className="text-3xl " />
        {!isOpenToggle && <p className={`max-lg:hidden`}>Tạo</p>}
      </div>
      {modalIsOpenCreate && (
        <ModalCreatePost
          modalIsOpenCreate={modalIsOpenCreate}
          setModalIsOpenCreate={setModalIsOpenCreate}
        />
      )}
    </>
  );
};

export default Create;
