import Modal from "react-modal";
import { motion } from "framer-motion";
import { useState } from "react";
const ModalCreateNameCollection = ({
  isOpenModalCreateNameCollection,
  setIsOpenModalCreateNameCollection,
}) => {
  const [nameCollectionInput, setNameCollectionIput] = useState("");
  const handleOnChangeCreateName = (e) => {
    setNameCollectionIput(e.target.value);
  }
  return (
    <Modal
      appElement={document.getElementById("root")}
      isOpen={isOpenModalCreateNameCollection}
      onRequestClose={() => setIsOpenModalCreateNameCollection(false)}
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
      <motion.div className="bg-color-dash text-white overflow-hidden rounded-md w-full flex flex-col gap-y-2 select-none">
        <div className="w-full bg-color-dash py-2 flex justify-center relative">
          <p className="font-bold">Bộ sưu tập mới</p>
        </div>
        <div className="py-6 border border-t-color-input-gray border-b-color-input-gray px-4 border-l-0 border-r-0 flex items-center justify-center">
           <input type="text" value={nameCollectionInput} onChange={handleOnChangeCreateName} className="rounded-md w-full px-2 py-5 h-3 border border-black  focus:border-color-input-gray focus:outline-none bg-black" placeholder="Tên bộ sưu tập"/>
        </div>
        <div
          className="w-full bg-color-dash py-2 flex justify-center cursor-pointer relative"
          onClick={() => setIsOpenModalCreateNameCollection(false)}
        >
          <p className="font-bold">Tiếp</p>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ModalCreateNameCollection;
