import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { fireStore } from '../firebase/firebase'
import { toast } from 'react-toastify';

const useDeleteReport = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteReport = async(reportId) => {
    if(isDeleting) return toast.warning("Thao tác quá nhanh");
    setIsDeleting(true);
    console.log(reportId);
    try {
      const reportRef = doc(fireStore, 'reports', reportId); 
      await deleteDoc(reportRef);
      toast.success("Đã xóa thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsDeleting(false);
    }
  }
  return {handleDeleteReport}
}

export default useDeleteReport
