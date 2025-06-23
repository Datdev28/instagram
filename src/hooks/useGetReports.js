import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";

const useGetReports = () => {
  const [reports, setReports] = useState([]);
  const [isGetting, setIsGetting] = useState(false);

  const fetchReports = async (reportType = "all") => {
    setIsGetting(false);
    try {
      let reportsRef = collection(fireStore, "reports");

      if (reportType !== "all") {
        reportsRef = query(reportsRef, where("status", "==", reportType));
      }

      const snapShot = await getDocs(reportsRef);

      const reportsData = snapShot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setReports(reportsData);
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsGetting(true);
    }
  };

  useEffect(() => {
    fetchReports(); 
  }, []);

  return { reports, fetchReports, isGetting };
};

export default useGetReports;
