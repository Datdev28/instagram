import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";
const useGetReports = () => {
  const [reports, setReports] = useState([]);
  const [isGetting, setIsGetting] = useState(false);
  const fetchReports = async () => {
    try {
      const reportsRef = collection(fireStore, "reports");
      const snapShot = await getDocs(reportsRef);
      if (!snapShot.empty) {
        const reportsData = snapShot.docs.map((docSnap) => ({
          id: docSnap.id,
          status: "pending",
          ...docSnap.data(),
        }));
        setReports(reportsData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsGetting(true)
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);
  return { reports, refetch: fetchReports, isGetting};
};

export default useGetReports;
