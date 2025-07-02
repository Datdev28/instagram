import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";

const useGetProfileUserById = (userId, targetUserId = null) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userTargetProfile, setUserTargetProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const userRef = doc(fireStore, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        }
      } catch (error) {
        console.log(error);
        toast.error("Lỗi khi lấy userProfile");
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [userId]);

  useEffect(() => {
    const getTargetUser = async () => {
      if (!targetUserId) return;
      setIsLoading(true);
      try {
        const targetRef = doc(fireStore, "users", targetUserId);
        const targetSnap = await getDoc(targetRef);
        if (targetSnap.exists()) {
          setUserTargetProfile(targetSnap.data());
        }
      } catch (error) {
        console.log(error);
        toast.error("Lỗi khi lấy userTargetProfile");
      } finally {
        setIsLoading(false);
      }
    };
    getTargetUser();
  }, [targetUserId]);

  return { userProfile, userTargetProfile, isLoading };
};

export default useGetProfileUserById;
