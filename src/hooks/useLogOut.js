import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
const useLogOut = () => {
  const [signOut, isLoginOut] = useSignOut(auth);
  const handleLogOut = async() => {
    try {
      await signOut();
      localStorage.removeItem("user")
      console.log("logged out")
    } catch (error) {
      console.log(error)
    }
  }
  return {handleLogOut, isLoginOut}
}

export default useLogOut
