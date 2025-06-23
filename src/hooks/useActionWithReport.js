import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";

const useActionWithReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleActionWithReport = async (reportId, newStatus) => {
    if (isLoading) return toast.warning("Thao tác của bạn quá nhanh!");
    setIsLoading(true);
    try {
      const reportRef = doc(fireStore, "reports", reportId);
      await updateDoc(reportRef, { status: newStatus });
      toast.success("Đã cập nhập trạng thái thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsLoading(false);
    }
  };
  return { handleActionWithReport };
};

export default useActionWithReport;
