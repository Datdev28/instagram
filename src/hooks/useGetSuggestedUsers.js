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
const useGetSuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { user } = useAuthStore();
  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const q = query(
          collection(fireStore, "users"),
          where("uid", "not-in", [user.uid, ...user.following]),
          orderBy("uid"),
          limit(3)
        );
        const querySnapShot = await getDocs(q);
        let users = [];
        querySnapShot.forEach((doc) => {
          users.push(doc.data());
        });
        setSuggestedUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) getSuggestedUsers();
  }, [user]);
  return {suggestedUsers}
};

export default useGetSuggestedUsers;
