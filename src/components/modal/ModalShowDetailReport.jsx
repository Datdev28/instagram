import Modal from "react-modal";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { formatTimestampToVietnamTime } from "../../utils/formatTimestampToVietnamTime";
const ModalShowDetailReport = ({
  isOpenModalShowDetailReport,
  setIsOpenModalShowDetailReport,
  userTargetProfile,
  report,
  index,
}) => {
  console.log(report);
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isOpenModalShowDetailReport}
        onRequestClose={() => setIsOpenModalShowDetailReport(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },
          content: {
            top: "15rem",
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
        <motion.div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Chi tiết báo cáo #{index + 1}
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <XCircle
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setIsOpenModalShowDetailReport(false)}
                  />
                </button>
              </div>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`
                        inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        ${
                          report.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${
                          report.status === "reviewed"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }
                        ${
                          report.status === "resolved"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          report.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                        `}
                    >
                      {report.status === "pending" && "Chờ xử lý"}
                      {report.status === "reviewed" && "Đã xem xét"}
                      {report.status === "resolved" && "Đã giải quyết"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Thời gian:</strong>{" "}
                    {formatTimestampToVietnamTime(report.createdAt)}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Người bị báo cáo
                  </h4>
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={userTargetProfile.profilePicURL || "/defaultProfilePic.jpg"}
                      alt="người bị báo cáo"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        @{userTargetProfile.userName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {userTargetProfile.followers.length}
                        followers
                      </p>
                    </div>
                  </div>
                </div>

                {/* Report Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Thông tin vi phạm
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Loại vi phạm: {report.reportType}
                      </p>
                      <p className="text-sm text-gray-900"></p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Lý do: {report.reason}
                      </p>
                      <p className="text-sm text-gray-900"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalShowDetailReport;
