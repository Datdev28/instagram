import useAuthStore from "../store/authStore";
import userProfileStore from "../store/userProfileStore";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
const useCreatePost = () => {
  const user = useAuthStore((state) => state.user);
  const userProfile = userProfileStore((state) => state.userProfile);
  const addPost = userProfileStore((state) => state.addPost);
  const handleCreatePost = async (
    imageUrls,
    caption,
    checkedHideLike,
    turnOfComment
  ) => {
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      imageOfPost: imageUrls,
      checkedHideLike: checkedHideLike,
      turnOfComment: turnOfComment,
      createdAt: Date.now(),
      createBy: user?.uid,
      byUserName: user?.userName,
      byAvaUser: user?.profilePicURL,
    };
    try {
      const postDocRef = await addDoc(collection(fireStore, "posts"), newPost);
      const userDocRef = doc(fireStore, "users", user?.uid);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      if (user.uid === userProfile?.uid)
        addPost({ ...newPost, id: postDocRef.id });
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    }
  };
  return { handleCreatePost };
};

export default useCreatePost;
