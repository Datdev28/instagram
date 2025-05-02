import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
const useSignUpWithEmailAndPassword = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const signUp = async (inputs) => {
    if(!inputs.email || !inputs.userName || !inputs.password || !inputs.confirmPassword){
      console.log("Bạn phải điền đầy đủ thông tin")
      return;
    }
    console.log(error);
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
      localStorage.setItem("users", JSON.stringify(userDoc))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return {loading, error, signUp}
}

export default useSignUpWithEmailAndPassword
