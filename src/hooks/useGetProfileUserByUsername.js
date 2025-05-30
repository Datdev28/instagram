import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import userProfileStore from "../store/userProfileStore";
import useLoadingBarStore from "../store/loadingBarStore";
const useGetProfileUserByUsername = (userName) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile, setUserProfile } = userProfileStore();
  const { setProgress } = useLoadingBarStore();
  useEffect(() => {
    const getUserProfile = async () => {
      setProgress(30);
      try {
        const q = query(
          collection(fireStore, "users"),
          where("userName", "==", userName)
        );
        const querySnapShot = await getDocs(q);
        const doc = querySnapShot.docs[0];
        if (!doc) {
          setProgress(100);
          setIsLoading(true);
          setUserProfile(null);
          return;
        }
        const userDoc = doc.data();
        setUserProfile(userDoc);
        setIsLoading(false);
        setProgress(100);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, [userName]);
  return { isLoading, userProfile };
};

export default useGetProfileUserByUsername;
