import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const useGetCollectionByCollectionId = (collectionId) => {
  const [collection, setCollection] = useState(null);
  const [isGetting, setIsGetting] = useState(false);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if(!collectionId || !user) return
    const fetDataCollection = async () => {
      try {
        const collectionRef = doc(fireStore,"users",user?.uid,"collections", collectionId);
        const document = await getDoc(collectionRef);
        if(document.exists){
          setCollection(document.data());
        }

      } catch {
        toast.error("Đã xảy ra lỗi. Hãy thử lại!");
      } finally {
        setIsGetting(true);
      }
    };
    fetDataCollection()
  }, [collectionId]);
  return { collection, isGetting };
};

export default useGetCollectionByCollectionId;
