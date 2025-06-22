import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Flag, MoreVertical } from 'lucide-react';

const AdminReportsManagement = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - báo cáo giả lập
  const mockReports = [
    {
      id: 1,
      reportedBy: { username: 'user123', avatar: '/api/placeholder/32/32' },
      reportedUser: { username: 'violator456', avatar: '/api/placeholder/32/32', followers: 15000 },
      type: 'harassment',
      reason: 'Bình luận có tính chất quấy rối và đe dọa',
      content: 'Bài đăng chứa nội dung xúc phạm và đe dọa người khác',
      postType: 'post',
      timestamp: '2025-06-22T10:30:00Z',
      status: 'pending',
      priority: 'high',
      evidence: ['screenshot1.jpg', 'screenshot2.jpg']
    },
    {
      id: 2,
      reportedBy: { username: 'user789', avatar: '/api/placeholder/32/32' },
      reportedUser: { username: 'spammer321', avatar: '/api/placeholder/32/32', followers: 500 },
      type: 'spam',
      reason: 'Gửi tin nhắn spam liên tục',
      content: 'Tài khoản này liên tục gửi tin nhắn quảng cáo không mong muốn',
      postType: 'message',
      timestamp: '2025-06-22T09:15:00Z',
      status: 'reviewed',
      priority: 'medium',
      evidence: ['chat_log.txt']
    },
    {
      id: 3,
      reportedBy: { username: 'user456', avatar: '/api/placeholder/32/32' },
      reportedUser: { username: 'fakeaccount', avatar: '/api/placeholder/32/32', followers: 25000 },
      type: 'impersonation',
      reason: 'Mạo danh người nổi tiếng',
      content: 'Tài khoản này đang mạo danh một người nổi tiếng để lừa đảo',
      postType: 'profile',
      timestamp: '2025-06-22T08:45:00Z',
      status: 'resolved',
      priority: 'high',
      evidence: ['comparison.jpg', 'fake_verification.jpg']
    },
    {
      id: 4,
      reportedBy: { username: 'user654', avatar: '/api/placeholder/32/32' },
      reportedUser: { username: 'inappropriate', avatar: '/api/placeholder/32/32', followers: 2000 },
      type: 'inappropriate_content',
      reason: 'Nội dung không phù hợp với trẻ em',
      content: 'Bài đăng chứa hình ảnh không phù hợp',
      postType: 'story',
      timestamp: '2025-06-22T07:20:00Z',
      status: 'pending',
      priority: 'medium',
      evidence: ['inappropriate_image.jpg']
    },
    {
      id: 5,
      reportedBy: { username: 'user999', avatar: '/api/placeholder/32/32' },
      reportedUser: { username: 'copyright_violator', avatar: '/api/placeholder/32/32', followers: 8000 },
      type: 'copyright',
      reason: 'Sử dụng hình ảnh có bản quyền',
      content: 'Tài khoản này sử dụng hình ảnh có bản quyền mà không có phép',
      postType: 'reel',
      timestamp: '2025-06-21T18:30:00Z',
      status: 'pending',
      priority: 'low',
      evidence: ['original_image.jpg', 'copyright_notice.pdf']
    }
  ];

  useEffect(() => {
    setReports(mockReports);
    setFilteredReports(mockReports);
  }, []);

  useEffect(() => {
    let filtered = reports;

    // Lọc theo trạng thái
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(report => report.status === selectedFilter);
    }

    setFilteredReports(filtered);
  }, [selectedFilter, searchTerm, reports]);



  const handleStatusChange = (reportId, newStatus) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý báo cáo</h1>
              <p className="text-gray-600 mt-1">Xử lý và theo dõi các báo cáo từ người dùng</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm báo cáo..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Flag className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng báo cáo</p>
                <p className="text-2xl font-bold text-gray-900"></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                <p className="text-2xl font-bold text-gray-900"></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đã xem xét</p>
                <p className="text-2xl font-bold text-gray-900"></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đã giải quyết</p>
                <p className="text-2xl font-bold text-gray-900"></p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              {[
                { value: 'all', label: 'Tất cả' },
                { value: 'pending', label: 'Chờ xử lý' },
                { value: 'reviewed', label: 'Đã xem xét' },
                { value: 'resolved', label: 'Đã giải quyết' }
              ].map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Báo cáo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người bị báo cáo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại vi phạm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Độ ưu tiên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-8 w-8 rounded-full" src={report.reportedBy.avatar} alt="" />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Báo cáo #{report.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            bởi @{report.reportedBy.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-8 w-8 rounded-full" src={report.reportedUser.avatar} alt="" />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            @{report.reportedUser.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.reportedUser.followers.toLocaleString()} followers
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-2">
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.postType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium`}>
                        {report.priority === 'high' && 'Cao'}
                        {report.priority === 'medium' && 'Trung bình'}
                        {report.priority === 'low' && 'Thấp'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full `}>
                        {report.status === 'pending' && 'Chờ xử lý'}
                        {report.status === 'reviewed' && 'Đã xem xét'}
                        {report.status === 'resolved' && 'Đã giải quyết'}
                        {report.status === 'rejected' && 'Từ chối'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <div className="relative group">
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            <div className="py-1">
                              <button
                                onClick={() => handleStatusChange(report.id, 'reviewed')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Đánh dấu đã xem xét
                              </button>
                              <button
                                onClick={() => handleStatusChange(report.id, 'resolved')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Đánh dấu đã giải quyết
                              </button>
                              <button
                                onClick={() => handleStatusChange(report.id, 'rejected')}
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              >
                                Từ chối báo cáo
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Chi tiết báo cáo #{selectedReport.id}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Report Info */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full `}>
                      {selectedReport.status === 'pending' && 'Chờ xử lý'}
                      {selectedReport.status === 'reviewed' && 'Đã xem xét'}
                      {selectedReport.status === 'resolved' && 'Đã giải quyết'}
                    </span>
                    <span className="text-sm font-medium">
                      Độ ưu tiên: {selectedReport.priority === 'high' && 'Cao'}
                      {selectedReport.priority === 'medium' && 'Trung bình'}
                      {selectedReport.priority === 'low' && 'Thấp'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Thời gian:</strong> {new Date(selectedReport.timestamp).toLocaleString('vi-VN')}
                  </p>
                </div>

                {/* Reported User */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Người bị báo cáo</h4>
                  <div className="flex items-center space-x-3">
                    <img 
                      className="h-12 w-12 rounded-full" 
                      src={selectedReport.reportedUser.avatar} 
                      alt="" 
                    />
                    <div>
                      <p className="font-medium text-gray-900">@{selectedReport.reportedUser.username}</p>
                      <p className="text-sm text-gray-500">{selectedReport.reportedUser.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                </div>

                {/* Report Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Thông tin vi phạm</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Loại vi phạm:</p>
                      <p className="text-sm text-gray-900"></p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Lý do:</p>
                      <p className="text-sm text-gray-900">{selectedReport.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mô tả chi tiết:</p>
                      <p className="text-sm text-gray-900">{selectedReport.content}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Loại nội dung:</p>
                      <p className="text-sm text-gray-900">{selectedReport.postType}</p>
                    </div>
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Bằng chứng ({selectedReport.evidence.length})</h4>
                  <div className="space-y-2">
                    {selectedReport.evidence.map((evidence, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-blue-600">
                        <Eye className="w-4 h-4" />
                        <span>{evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-6 border-t">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedReport.id, 'resolved');
                      setShowModal(false);
                    }}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Giải quyết
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedReport.id, 'reviewed');
                      setShowModal(false);
                    }}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Đánh dấu đã xem
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedReport.id, 'rejected');
                      setShowModal(false);
                    }}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportsManagement;