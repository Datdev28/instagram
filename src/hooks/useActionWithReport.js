import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";

const useActionWithReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleActionWithReport = async (reportId, newStatus, penatyl) => {
    if (isLoading) return toast.warning("Thao tác của bạn quá nhanh!");
    setIsLoading(true);
    try {
      const reportRef = doc(fireStore, "reports", reportId);
      if(newStatus === 'resolved'){
       await updateDoc(reportRef, { status: newStatus }, {penatyl});
      }else {
       await updateDoc(reportRef, { status: newStatus });
      }
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
