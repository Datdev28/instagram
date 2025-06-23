import { Eye, MoreVertical, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import { useState } from "react";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import { formatTimestampToVietnamTime } from "../../utils/formatTimestampToVietnamTime";
import ModalShowDetailReport from "../../components/modal/ModalShowDetailReport";
import ModalConfirmDeletePost from "../modal/ModalConfirmDeletePost";
import useBannedUser from "../../hooks/useBannedUser";

const Report = ({ report, index, pickReportType }) => {
  const { userProfile, userTargetProfile } = useGetProfileUserById(
    report.reportedBy,
    report.targetId
  );
  const {handleBannedUser} = useBannedUser();
  const [isOpenModalShowDetailReport, setIsOpenModalShowDetailReport] =
    useState(false);
  const [isOpenModalConfirmDeleteReport, setIsOpenModalConfirmDeleteReport] =
    useState(false);

  const handleClickRemove = () => {
    setIsOpenModalConfirmDeleteReport(true);
  };

  const handleClickViewDetailReport = () => {
    setIsOpenModalShowDetailReport(true);
  };
  const handleClickBannedCommentOrPost = async(bannedType) => {
     await handleBannedUser(userTargetProfile.uid, report.reason, bannedType);
  };
  const handleClickBannedCommentAndPost = async() => {
     await handleBannedUser(userTargetProfile.uid, report.reason, 'comment');
     await handleBannedUser(userTargetProfile.uid, report.reason, 'post');
  }
  return (
    <>
      {userProfile && userTargetProfile && (
        <tr key={report.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={userProfile?.profilePicURL || "/defaultProfilePic.jpg"}
                alt="người gửi báo cáo"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  Báo cáo #{index + 1}
                </div>
                <div className="text-sm text-gray-500"></div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={
                  userTargetProfile?.profilePicURL || "/defaultProfilePic.jpg"
                }
                alt="người bị báo cáo"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  {userTargetProfile?.userName}
                </div>
                <div className="text-sm text-gray-500">
                  {userTargetProfile?.followers.length} followers
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-2"></div>
              <div>
                <div className="text-sm font-medium text-gray-900"></div>
                <div className="text-sm text-gray-500">{report.reportType}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-2"></div>
              <div>
                <div className="text-sm font-medium text-gray-900"></div>
                <div className="text-sm text-gray-500">{report.reason}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`
           inline-flex px-2 py-1 text-xs font-semibold rounded-full
           ${report.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
           ${report.status === "reviewed" ? "bg-blue-100 text-blue-800" : ""}
           ${report.status === "resolved" ? "bg-green-100 text-green-800" : ""}
           ${report.status === "refuse" ? "bg-red-100 text-red-800" : ""}
          `}
            >
              {report.status === "pending" && "Chờ xử lý"}
              {report.status === "reviewed" && "Đã xem xét"}
              {report.status === "resolved" && "Đã giải quyết"}
              {report.status === "refuse" && "Từ chối"}
            </span>
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {formatTimestampToVietnamTime(report.createdAt)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-center space-x-2">
              <button className="text-blue-600 hover:text-blue-900 p-1">
                <Eye
                  className="w-4 h-4 cursor-pointer"
                  onClick={handleClickViewDetailReport}
                />
              </button>
              {pickReportType === "pending" && (
                <div className="relative group">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical className="w-4 h-4 " />
                  </button>
                  <div className="absolute -top-4 right-0 mt-2  bg-white rounded-md shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleClickBannedCommentOrPost("comment")}
                      >
                        Cấm người dùng bình luận trong 3 phút
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleClickBannedCommentOrPost("post")}
                      >
                        Cấm người dùng đăng bài trong 3 phút
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={handleClickBannedCommentAndPost}
                      >
                        Cấm người dùng bình luận và đăng bài trong 3 phút
                      </button>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Đánh dấu đã xem xét
                      </button>
                      <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                        Từ chối báo cáo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {pickReportType !== "all" && (
                <Trash2
                  className="cursor-pointer"
                  onClick={handleClickRemove}
                />
              )}
            </div>
          </td>
        </tr>
      )}

      {isOpenModalShowDetailReport &&
        createPortal(
          <ModalShowDetailReport
            report={report}
            userTargetProfile={userTargetProfile}
            index={index}
            isOpenModalShowDetailReport={isOpenModalShowDetailReport}
            setIsOpenModalShowDetailReport={setIsOpenModalShowDetailReport}
          />,
          document.body
        )}

      {isOpenModalConfirmDeleteReport &&
        createPortal(
          <ModalConfirmDeletePost
            isOpenModalConfirmDeletePost={isOpenModalConfirmDeleteReport}
            setIsOpenModalConfirmDeletePost={setIsOpenModalConfirmDeleteReport}
            isOpenFromReport={true}
          />,
          document.body
        )}
    </>
  );
};

export default Report;
