import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '../firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import { useState } from 'react';
const useSignUpWithEmailAndPassword = () => {
  const [existsUserName, setExistsUserName] = useState(false);
  const [
    createUserWithEmailAndPassword,
    user ,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore(state => state.login)
  const signUp = async (inputs) => {
    const q = query(collection(fireStore, "users"), where("userName", "==", inputs.userName));
    const querySnapShot = await getDocs(q);
    if(!querySnapShot.empty){
      setExistsUserName(true);
      return 
    }
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
          fullName:inputs.fullName,
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
  return {loading, error, signUp, existsUserName}
}

export default useSignUpWithEmailAndPassword
