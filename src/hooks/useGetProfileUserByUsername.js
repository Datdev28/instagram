import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { fireStore } from '../firebase/firebase';
import userProfileStore from '../store/userProfileStore';

const useGetProfileUserByUsername = (userName) => {
  const [isLoading, setIsLoading] = useState(false);
  const {userProfile, setUserProfile} = userProfileStore();
  useEffect(() => {
    const getUserProfile = async() => {
      setIsLoading(true);
      try {
        const q = query(collection(fireStore, "users"), where("username", "==", userName));
        const querySnapShot = await getDocs(q);
        if(querySnapShot.empty) return setUserProfile(null);
        let userDoc;
        querySnapShot.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserProfile(userDoc);
      } catch (error) {
        console.log(error);
      }
    }
    getUserProfile();
  }, [setUserProfile, userName])
  return {isLoading, userProfile}
}

export default useGetProfileUserByUsername
