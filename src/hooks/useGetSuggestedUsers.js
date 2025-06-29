import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";
import useLoadingBarStore from "../store/loadingBarStore";
import useBlockListStore from "../store/blockListStore";

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { blockerIdList, blockedIdList } = useBlockListStore();
  const { user } = useAuthStore();
  const setProgress = useLoadingBarStore(state => state.setProgress);
  useEffect(() => {
    const getSuggestedUsers = async () => {
      if (!user) return;
      setProgress(30);
      try {
        const snapshot = await getDocs(collection(fireStore, "users"));
        const allUsers = snapshot.docs.map((doc) => doc.data());

        const followingIds = user.following;

        const filteredUsers = allUsers.filter(
          (u) =>
            u.uid !== user.uid &&
            !followingIds?.includes(u.uid) &&
            !blockerIdList?.includes(u.uid) &&
            !blockedIdList?.includes(u.uid)
        );
        setSuggestedUsers(filteredUsers.slice(0, 10));
      } catch (error) {
        console.error(error);
        toast.error("Đã xảy ra lỗi. Hãy thử lại!");
      } finally {
        setProgress(100);
        setIsLoading(true);
      }
    };

    getSuggestedUsers();
  }, [user]);

  return { suggestedUsers, isLoading };
};

export default useGetSuggestedUsers;
