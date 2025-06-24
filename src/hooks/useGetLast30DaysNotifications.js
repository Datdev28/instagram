import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import useNotificationStore from "../store/useNotificationStore";

const useRecentNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const { setHasNewNoti } = useNotificationStore();
  useEffect(() => {
    if (!userId) return;
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const notiRef = collection(fireStore, "users", userId, "notifications");
    const q = query(
      notiRef,
      where("createdAt", ">=", Timestamp.fromDate(thirtyDaysAgo)),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notiList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(notiList);
      setNotifications(notiList);
      if (notiList.length > 0) {
        setHasNewNoti(true);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return { notifications };
};

export default useRecentNotifications;
