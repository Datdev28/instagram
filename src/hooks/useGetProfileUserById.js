import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";

const useGetProfileUserById = (userId, targetUserId = null) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userTargetProfile, setUserTargetProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getProfileUserById = async () => {
        setIsLoading(true)
      try {
        const userRef = doc(fireStore, "users", userId);
        const userDocument = await getDoc(userRef);
        if (userDocument.exists()) {
          setUserProfile(userDocument.data());
        }
        if (targetUserId) {
          const userTargetRef = doc(fireStore, "users", targetUserId);
          const targetUserDocument = await getDoc(userTargetRef);
          if (targetUserDocument.exists()) {
            setUserTargetProfile(targetUserDocument.data());
          }
        }
      } catch {
        toast.error("Đã xảy ra lỗi. Hãy thử lại!");
      } finally {
        setIsLoading(false)
      }
    };
    getProfileUserById();
  }, [userId, targetUserId]);
  return { userProfile, userTargetProfile, isLoading };
};

export default useGetProfileUserById;
