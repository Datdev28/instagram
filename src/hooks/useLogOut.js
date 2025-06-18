import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import userProfileStore from '../store/userProfileStore';
import { toast } from 'react-toastify';
const useLogOut = () => {
  const [signOut, isLoginOut] = useSignOut(auth);
  const logout = useAuthStore(state => state.logout);
  const {setUserProfile} = userProfileStore()
  const handleLogOut = async() => {
    try {
      await signOut();
      localStorage.removeItem("user");
      setUserProfile(null);
      logout();
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    }
  }
  return {handleLogOut, isLoginOut}
}

export default useLogOut
