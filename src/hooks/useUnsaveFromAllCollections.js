import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useCollectionPostStore from "../store/collectionSaveStore";

const useUnsaveFromAllCollections = (postId, collectionId = null) => {
  const user = useAuthStore((state) => state.user);
  const unsavePostFromAllCollections = useCollectionPostStore(
    (state) => state.unsavePostFromAllCollections
  );
  const unsavePostFromCollection = useCollectionPostStore(
    (state) => state.unsavePostFromCollection
  );
  const handleUnsaveFromAllCollections = async () => {
    console.log(collectionId);
    if (collectionId) {
      try {
        const collectionRef = doc(
          fireStore,
          "users",
          user.uid,
          "collections",
          collectionId
        );
        await updateDoc(collectionRef, { pickedPosts: arrayRemove(postId) });
        unsavePostFromCollection(collectionId, postId);
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi. Hãy thử lại!");
      }
    } else {
      try {
        const collectionsRef = collection(
          fireStore,
          "users",
          user.uid,
          "collections"
        );
        const querySnapshot = await getDocs(collectionsRef);
        if (querySnapshot.empty) throw new Error("Bộ sưu tập trống!");
        const unsavePromises = querySnapshot.docs.map(async (docSnap) => {
          console.log("123", docSnap.data().pickedPosts);
          try {
            await updateDoc(docSnap.ref, { pickedPosts: arrayRemove(postId) });
          } catch (error) {
            console.log(error);
            toast.error("Đã xảy ra lỗi! Hãy thử lại");
          }
        });
        await Promise.all(unsavePromises);
        unsavePostFromAllCollections(postId);
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi. Hãy thử lại!");
      }
    }
  };
  return { handleUnsaveFromAllCollections };
};

export default useUnsaveFromAllCollections;
