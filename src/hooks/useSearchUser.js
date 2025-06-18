import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const getUser = async (userName) => {
    try {
      setIsLoading(true);
      setError("");
      setUser(null);
      const q = query(
        collection(fireStore, "users"),
        where("userName", "==", userName)
      );
      const querySnapShot = await getDocs(q);
      if (querySnapShot.empty) {
        setError("Không tìm thấy người dùng");
        return
      }
      const doc = querySnapShot.docs[0];
      setUser(doc.data());
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsLoading(false);
    }
  };
  return {error, isLoading, getUser, user, setUser, setError};
};

export default useSearchUser;
