import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import useNotificationStore from "../store/notificationStore";

const useRecentNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const { setHasNewNoti } = useNotificationStore();
  useEffect(() => {
    if (!userId) return;
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const userRef = doc(fireStore, "users", userId);
    const notiRef = collection(fireStore, "users", userId, "notifications");
    const q = query(
      notiRef,
      where("createdAt", ">=", Timestamp.fromDate(thirtyDaysAgo)),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const notiList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notiList);
      if (notiList.length === 0) {
        setHasNewNoti(false);
        return;
      }
      const userSnap = await getDoc(userRef);
      const lastSeen =
        userSnap.data()?.lastSeenNotificationAt?.toDate() || new Date(0);
      const hasUnread = notiList.some(
        (noti) => noti.createdAt.toDate() > lastSeen
      );
      setHasNewNoti(hasUnread);
    });

    return () => unsubscribe();
  }, [userId]);

  return { notifications };
};

export default useRecentNotifications;
