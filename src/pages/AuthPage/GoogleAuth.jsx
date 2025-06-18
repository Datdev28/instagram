import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";
const GoogleAuth = () => {
  const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);
  const login = useAuthStore((state) => state.login);
  const userGoogle = async () => {
    try {
      const newUser = await signInWithGoogle();
      const docRef = doc(fireStore, "users", newUser.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        localStorage.setItem("user", JSON.stringify(docSnap.data()));
        login(docSnap.data());
      } else {
        if (newUser) {
          const userDoc = {
            uid: newUser.user.uid,
            email: newUser.user.email,
            userName: newUser.user.email.split("@")[0],
            fullName:newUser.user.displayName,
            bio: "",
            profilePicURL: newUser.user.photoURL,
            followers: [],
            following: [],
            posts: [],
            createAt: Date.now(),
          };
          await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
          localStorage.setItem("user", JSON.stringify(userDoc));
          login(userDoc);
        }
      }
    } catch {
     toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    }
  };
  return (
    <div className="flex items-center justify-center gap-x-2 mt-10 mb-4 select-none">
      <img src="/auth-icon-google.png" className="w-6 h-6" alt="logo google" />
      <span className="text-blue-400 cursor-pointer"
       onClick={userGoogle}
      >Đăng nhập với Google</span>
    </div>
  );
};

export default GoogleAuth;
