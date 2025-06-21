import Modal from "react-modal";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
const ModalReasonReportAccount = ({
  isOpenModalReasonReportAccount,
  setIsOpenModalReasonReportAccount,
  setIsOpenModalReportAccount,
  setIsOpenModalReponseForReport
}) => {
  useLockBodyScroll(isOpenModalReasonReportAccount);
  const handleClickBackReportAccount = () => {
    setIsOpenModalReportAccount(true);
    setIsOpenModalReasonReportAccount(false);
    setIsOpenModalReasonReportAccount(false);
  };
  const handleClickGiveReport = () => {
    setIsOpenModalReponseForReport(true);
    setIsOpenModalReasonReportAccount(false);
  }
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalReasonReportAccount}
        onRequestClose={() => setIsOpenModalReasonReportAccount(false)}
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
            <div className="w-full border-b border-b-color-btn-gray py-2 flex justify-between items-center cursor-pointer px-2">
              <MdKeyboardArrowLeft
                className="text-3xl cursor-pointer"
                onClick={handleClickBackReportAccount}
              />
              <p className="font-bold">Báo cáo</p>
              <IoMdClose
                className="text-2xl cursor-pointer"
                onClick={() => setIsOpenModalReasonReportAccount(false)}
              />
            </div>
            <div className="flex flex-col py-2">
              <div className="flex justify-between items-center cursor-pointer py-2 px-4"
               onClick={() => handleClickGiveReport()}
              >
                <p>Đây là spam</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4"
               onClick={() => handleClickGiveReport()}
              >
                <p>Thông tin sai lệch</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4"
               onClick={() => handleClickGiveReport()}
              >
                <p>Tự tử hoặc tự gây thương tích</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4"
               onClick={() => handleClickGiveReport()}
              >
                <p>Biểu tượng hoặc ngôn từ gây thù ghét</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
              <div className="flex justify-between items-center cursor-pointer py-2 px-4"
               onClick={() => handleClickGiveReport()}
              >
                <p>Lừa đảo hoặc gian lận</p>
                <RiArrowRightSLine className="text-3xl text-color-note" />
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalReasonReportAccount;
