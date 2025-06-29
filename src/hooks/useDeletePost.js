import {
  arrayRemove,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  collection,
  getDoc,
} from "firebase/firestore";
import { useState } from "react";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import userProfileStore from "../store/userProfileStore";
import usePostStore from "../store/postStore";
import { toast } from "react-toastify";

const useDeletePost = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useAuthStore((state) => state.user);
  const deletePostInUserProfile = userProfileStore((state) => state.deletePost);
  const deletePostInPosts = usePostStore((state) => state.deletePost);

  const handleDeletePost = async (postId) => {
    if (!user?.uid || !postId) {
      return;
    }

    try {
      setIsDeleting(true);
      const postRef = doc(fireStore, "posts", postId);
      const userRef = doc(fireStore, "users", user.uid);

      const postDoc = await getDoc(postRef);
      if (!postDoc.exists()) {
        return;
      }
      const savedByRef = collection(fireStore, "posts", postId, "savedBy");
      const savedByDocs = await getDocs(savedByRef);
      const removeFromUserPromises = savedByDocs.docs.map(async (docSnap) => {
        const savedUserId = docSnap.id;
        const savedUserRef = doc(fireStore, "users", savedUserId);
        try {
          const savedUserDoc = await getDoc(savedUserRef);
          if (savedUserDoc.exists()) {
            await updateDoc(savedUserRef, {
              savePosts: arrayRemove(postId),
            });

            const collectionsRef = collection(
              fireStore,
              "users",
              savedUserId,
              "collections"
            );
            const collectionDocs = await getDocs(collectionsRef);
            const removeFromCollectionsPromises = collectionDocs.docs.map(
              async (colDoc) => {
                const collectionRef = doc(
                  fireStore,
                  "users",
                  savedUserId,
                  "collections",
                  colDoc.id
                );
                const data = colDoc.data();
                if (data?.pickedPosts?.includes(postId)) {
                  try {
                    await updateDoc(collectionRef, {
                      pickedPosts: arrayRemove(postId),
                    });
                  } catch {
                    toast.error("Lỗi khi xoá khỏi bộ sưu tập.");
                  }
                }
              }
            );
            await Promise.all(removeFromCollectionsPromises);
          }
        } catch {
          toast.error("Đã xảy ra lỗi. Hãy thử lại!");
        }

        try {
          await deleteDoc(docSnap.ref);
        } catch {
          toast.error("Đã xảy ra lỗi khi xoá savedBy.");
        }
      });

      await Promise.all(removeFromUserPromises);

      await deleteDoc(postRef);

      await updateDoc(userRef, {
        posts: arrayRemove(postId),
      });

      deletePostInUserProfile(postId);
      deletePostInPosts(postId);
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDeletePost, isDeleting };
};

export default useDeletePost;
