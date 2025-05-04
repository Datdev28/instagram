import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
const useLogin = () => {
  const [signInWithEmailAndPassword, ,loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);
  const signIn = async (inputs) => {
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (userCred) {
        const docRef = doc(fireStore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { signIn, loading, error};
};

export default useLogin;
