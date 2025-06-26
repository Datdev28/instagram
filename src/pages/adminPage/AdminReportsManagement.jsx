import { Filter, Eye, CheckCircle, Clock, Flag } from "lucide-react";
import useGetReports from "../../hooks/useGetReports";
import Report from "../../components/reports/Report";
import { IoRefresh } from "react-icons/io5";
import { useState } from "react";
const AdminReportsManagement = () => {
  const { reports, fetchReports, isGetting } = useGetReports();
  const noReports = reports.length === 0 && isGetting;
  const [pickReportType, setPickReportType] = useState("all");
  const handleClickReportType = async (reportType) => {
    setPickReportType(`${reportType}`);
    await fetchReports(reportType);
  };
  const handleClickRefresh = async() => {
    await fetchReports()
  }
  return (
    <div className="h-screen bg-gray-50 overflow-x-hidden">
      {reports && (
        <div className="w-full h-full">
          <div className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Quản lý báo cáo
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Xử lý và theo dõi các báo cáo từ người dùng
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Flag className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Tổng báo cáo
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports ? reports.length : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Chờ xử lý
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports
                        ? reports.filter((r) => r.status === "pending").length
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Đã xem xét
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports
                        ? reports.filter((r) => r.status === "reviewed").length
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Đã giải quyết
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports
                        ? reports.filter((r) => r.status === "resolved").length
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <button
                    className={`${
                      pickReportType === "all"
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-black"
                    } font-semibold px-4 py-1 rounded-md cursor-pointer transition-colors select-none`}
                    onClick={() => handleClickReportType("all")}
                  >
                    Tất cả
                  </button>
                  <button
                    className={`${
                      pickReportType === "pending"
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-black"
                    } font-semibold px-4 py-1 rounded-md cursor-pointer transition-colors select-none`}
                    onClick={() => handleClickReportType("pending")}
                  >
                    Chờ xử lý
                  </button>
                  <button
                    className={`${
                      pickReportType === "reviewed"
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-black"
                    } font-semibold px-4 py-1 rounded-md cursor-pointer transition-colors select-none`}
                    onClick={() => handleClickReportType("reviewed")}
                  >
                    Đã xem xét
                  </button>
                  <button
                    className={`${
                      pickReportType === "resolved"
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-black"
                    } font-semibold px-4 py-1 rounded-md cursor-pointer transition-colors select-none`}
                    onClick={() => handleClickReportType("resolved")}
                  >
                    Đã giải quyết
                  </button>
                  <button
                    className={`${
                      pickReportType === "refuse"
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-black"
                    } font-semibold px-4 py-1 rounded-md cursor-pointer transition-colors`}
                    onClick={() => handleClickReportType("refuse")}
                  >
                    Đã từ chối
                  </button>
                </div>
                <div className="flex gap-x-2 items-center cursor-pointer bg-gray-200 px-2 py-1 rounded-md"
                 onClick={handleClickRefresh}
                >
                   <IoRefresh className="text-2xl"/>
                   <p className="font-semibold">Làm mới</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm ">
              {noReports ? (
                <div className="w-full h-64 text-3xl font-bold flex items-center justify-center text-gray-500">
                  Chưa có báo cáo nào
                </div>
              ) : !isGetting ? (
                <div className="w-full h-64 flex items-center justify-center">
                  <img
                    className="object-cover w-12 h-12 rounded-full"
                    src="/loading.gif"
                    alt="loading"
                  />
                </div>
              ) : (
                <div className=" pr-[17px] max-h-[500px]">
                  <table className="min-w-full table-fixed divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-nowrap tracking-wider">
                          Báo cáo
                        </th>
                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-nowrap tracking-wider">
                          Người bị báo cáo
                        </th>
                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-nowrap  tracking-wider">
                          Loại vi phạm
                        </th>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-nowrap  tracking-wider">
                          Nội dung vi phạm
                        </th>
                        <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  text-nowrap tracking-wider">
                          Trạng thái
                        </th>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-nowrap  tracking-wider">
                          Thời gian
                        </th>
                        {pickReportType === "all" && (
                          <th className="w-1/8 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase text-nowrap tracking-wider">
                            Hành động
                          </th>
                        )}
                        {pickReportType === "resolved" && (
                          <th className="w-1/4 px-6 py-3 text-xs text-center font-medium text-gray-500 uppercase text-nowrap tracking-wider">
                            Hình phạt
                          </th>
                        )}
                        {pickReportType !== "all" && (
                          <th className="w-1/8 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase text-nowrap tracking-wider">
                            Hành động
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports &&
                        reports.length > 0 &&
                        reports.map((report, index) => (
                          <Report
                            key={report.id}
                            report={report}
                            index={index}
                            pickReportType={pickReportType}
                            fetchReports={fetchReports}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportsManagement;
