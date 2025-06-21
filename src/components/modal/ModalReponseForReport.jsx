import Modal from "react-modal";
import { motion } from "framer-motion";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
const ModalReponseForReport = ({
  isOpenModalReponseForReport,
  setIsOpenModalReponseForReport,
}) => {
  useLockBodyScroll(isOpenModalReponseForReport); 

  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalReponseForReport}
        onRequestClose={() => setIsOpenModalReponseForReport(false)}
        preventScroll={false}
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
            maxWidth: "450px",
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="bg-color-dash text-white overflow-hidden rounded-xl w-full flex flex-col items-center gap-y-2 select-none py-6"
        >
          <div className="flex flex-col w-full px-4 text-center items-center gap-y-6">
            <img src="/check_mark.png" className="w-16 h-16 object-cover rounded-full" alt="đã gửi báo cáo"/>
            <p>Cảm ơn bạn đã cho chúng tôi biết</p>
            <p className="text-sm text-color-text-gray">Ý kiến đóng góp của bạn sẽ góp phần quan trọng để bảo vệ cộng đồng Instagram.</p>
            <button
              className="w-full  py-2 flex justify-center cursor-pointer bg-blue-500 hover:bg-blue-700 rounded-md"
              onClick={() => setIsOpenModalReponseForReport(false)}
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalReponseForReport;
