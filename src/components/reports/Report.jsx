import React from "react";
import { Eye, MoreVertical } from "lucide-react";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import { formatTimestampToVietnamTime } from "../../utils/formatTimestampToVietnamTime";
const Report = ({ report, index }) => {
  const { userProfile, userTargetProfile } = useGetProfileUserById(
    report.reportedBy,
    report.targetId
  );
  return (
    userProfile &&
    userTargetProfile && (
      <tr key={report.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={userProfile?.profilePicURL}
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
              src={userTargetProfile?.profilePicURL}
              alt="người bị báo cáo"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">
                @{userTargetProfile?.userName}
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
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full `}
          >
            {report.status === "pending" && "Chờ xử lý"}
            {report.status === "reviewed" && "Đã xem xét"}
            {report.status === "resolved" && "Đã giải quyết"}
            {report.status === "rejected" && "Từ chối"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatTimestampToVietnamTime(report.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex justify-end space-x-2">
            <button className="text-blue-600 hover:text-blue-900 p-1">
              <Eye className="w-4 h-4" />
            </button>
            <div className="relative group">
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Đánh dấu đã xem xét
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Đánh dấu đã giải quyết
                  </button>
                  <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                    Từ chối báo cáo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    )
  );
};

export default Report;
