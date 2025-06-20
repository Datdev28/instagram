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
            }
          } catch {
            toast.error("Đã xảy ra lỗi. Hãy thử lại!");
          }

          try {
            await deleteDoc(docSnap.ref);
          } catch  {
            toast.error("Đã xảy ra lỗi. Hãy thử lại!");
          }
        });
        // Chờ tất cả các thao tác xóa khỏi users hoàn thành
        await Promise.all(removeFromUserPromises);

        // 3. Xóa bài viết chính
        await deleteDoc(postRef);

        // 4. Xóa postId khỏi danh sách posts của chủ bài viết
        await updateDoc(userRef, {
          posts: arrayRemove(postId),
        });

        // 5. Xóa khỏi store local
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
