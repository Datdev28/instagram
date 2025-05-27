import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useLoadingBarStore from "../store/loadingBarStore";
const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { user } = useAuthStore();
  const {setProgress} = useLoadingBarStore();
  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        setProgress(30);
        const q = query(
          collection(fireStore, "users"),
          where("uid", "not-in", [user.uid, ...user.following.slice(0, 9)]),
          orderBy("uid"),
          limit(12)
        );
        const querySnapShot = await getDocs(q);
        let users = [];
        querySnapShot.forEach((doc) => {
          users.push(doc.data());
        });
        setSuggestedUsers(users);
      } catch (error) {
        console.log(error);
      } finally {
        setProgress(100);
        setIsLoading(true);
      }
    };
    if (user) getSuggestedUsers();
  }, [user]);
  return { suggestedUsers, isLoading };
};

export default useGetSuggestedUsers;
