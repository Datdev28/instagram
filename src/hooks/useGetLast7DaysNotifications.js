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
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const userRef = doc(fireStore, "users", userId);
    const notiRef = collection(fireStore, "users", userId, "notifications");
    const q = query(
      notiRef,
      where("createdAt", ">=", Timestamp.fromDate(sevenDaysAgo)),
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
      const rawLastSeen = userSnap.data()?.lastSeenNotificationAt;

      const lastSeen =
        rawLastSeen instanceof Timestamp
          ? rawLastSeen.toDate()
          : new Date(0); // fallback nếu không có hoặc sai định dạng

      const hasUnread = notiList.some(
        (noti) =>
          noti.createdAt instanceof Timestamp &&
          noti.createdAt.toDate() > lastSeen
      );

      setHasNewNoti(hasUnread);
    });

    return () => unsubscribe();
  }, [userId]);

  return { notifications };
};

export default useRecentNotifications;
