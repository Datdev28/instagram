import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireStore } from '../firebase/firebase';
const useSubmitReport = () => {
  const handleSubmitReport = async(reportedBy, targetId, reportType, reason) => {
    const newReport = {
     reportedBy,
     targetId,
     reportType,
     reason,
     status: "pending",
     createdAt: serverTimestamp(),
    }
    try {
     await addDoc(collection(fireStore, 'reports'), newReport);
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi! Hãy thử lại")
    }
  }
  return {handleSubmitReport}
}

export default useSubmitReport
