import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
const useSignUpWithEmailAndPassword = () => {
  const [
    createUserWithEmailAndPassword,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore(state => state.login)
  const signUp = async (inputs) => {
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if(!newUser && error){
        console.log(error);
        return
      }
      if(newUser){
        const userDoc = {
          uid: newUser.user.uid,
          email:inputs.email,
          userName:inputs.userName,
          bio:"",
          profilePicURL:"",
          followers: [],
          following: [],
          posts: [],
          createAt: Date.now(),
        }
      await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
      localStorage.setItem("user", JSON.stringify(userDoc))
      loginUser(userDoc);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return {loading, error, signUp}
}

export default useSignUpWithEmailAndPassword
