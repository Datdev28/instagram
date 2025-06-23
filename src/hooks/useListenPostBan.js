import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useListenPostBan = (uid) => {
  const [postBan, setPostBan] = useState(null);
 
  useEffect(() => {
    if (!uid) return;

    const postRef = doc(fireStore, "users", uid, "banned", "post");

    const unsub = onSnapshot(postRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setPostBan({
          from: data.from?.toDate() || null,
          reason: data.reason || null,
        });
      } else {
        setPostBan(null);
      }
    });

    return () => unsub();
  }, [uid]);

  return postBan;
};

export default useListenPostBan;
