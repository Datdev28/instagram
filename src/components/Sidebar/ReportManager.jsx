import React from "react";
import { MdManageAccounts } from "react-icons/md";
import searchToggleStore from "../../store/searchToggleStore";
import { useNavigate } from "react-router-dom";
const ReportManager = () => {
  const { isOpenToggle } = searchToggleStore();
  const navigate = useNavigate();
  return (
    <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
     onClick={() => navigate('/admin/report-management')}
    >
      <MdManageAccounts className="text-3xl" />
      {!isOpenToggle && <p className={`max-lg:hidden`}>Quản lý</p>}
    </div>
  );
};

export default ReportManager;
