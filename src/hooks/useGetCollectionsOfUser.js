import { useEffect } from "react";
import useCollectionPostStore from "../store/collectionSaveStore";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const useGetCollectionsOfUser = () => {
  const user = useAuthStore((state) => state.user);
  const { collections, setCollections } = useCollectionPostStore();
  useEffect(() => {
    const fetchDataCollections = async () => {
      if(!user) return
      try {
        const collectionsRef = collection(fireStore, "users", user?.uid, "collections");
        const querySnapshot = await getDocs(collectionsRef);
        const newCollections = [];
        if (!querySnapshot.empty) {
          querySnapshot.docs.forEach((item) => {
            newCollections.push(item.data());
          });
          setCollections(newCollections);
        }
      } catch {
        toast.error("Đã xảy ra lỗi! Hãy thử lại")
      }
    };
    fetchDataCollections();
  }, [user.uid, setCollections]);
  return { collections };
};

export default useGetCollectionsOfUser;
