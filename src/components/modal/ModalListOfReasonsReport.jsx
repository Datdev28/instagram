import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
const ModalListOfReasonsReport = ({
  isOpenModalListOfReasons,
  setIsOpenModalListOfReasons,
}) => {
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalListOfReasons}
        onRequestClose={() => setIsOpenModalListOfReasons(false)}
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
        <motion.div className="bg-color-dash text-white overflow-hidden rounded-2xl w-full flex flex-col items-center gap-y-2 select-none">
          <div className="flex flex-col w-full">
            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-center cursor-pointer hover:bg-color-note relative">
              <p className="font-bold">Báo cáo</p>
              <IoMdClose
                className="absolute top-2 right-4 text-2xl cursor-pointer"
                onClick={() => setIsOpenModalListOfReasons(false)}
              />
            </div>
            <div className="flex flex-col py-2">
              <div className="flex justify-between items-center py-2 px-4 font-bold">
                <p>Tại sao bạn lại báo cáo bình luận này?</p>
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4">
                <p>Đây là spam</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4">
                <p>Thông tin sai lệch</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4">
                <p>Bạo lực hoặc tổ chức nguy hiểm</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4">
                <p>Bắt nạt hoặc quấy rối</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4">
                <p>Chỉ là tôi không thích nội dung này</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalListOfReasonsReport;
