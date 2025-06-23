import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useListenCommentBan = (uid) => {
  const [commentBan, setCommentBan] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const commentRef = doc(fireStore, "users", uid, "banned", "comment");

    const unsub = onSnapshot(commentRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setCommentBan({
          from: data.from?.toDate() || null,
          reason: data.reason || null,
        });
      } else {
        setCommentBan(null);
      }
    });

    return () => unsub();
  }, [uid]);

  return commentBan;
};

export default useListenCommentBan;
