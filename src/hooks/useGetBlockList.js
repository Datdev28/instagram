import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";
import useBlockListStore from "../store/blockListStore";

const useGetBlockList = (userId) => {
  const { setBlockerIdList, setBlockedIdList } = useBlockListStore();

  const fetchBlockList = async () => {
    try {
      const blocksRef = collection(fireStore, "blocks");

      const blockerQuery = query(blocksRef, where("blockerUserId", "==", userId));
      const blockedQuery = query(blocksRef, where("blockedUserId", "==", userId));

      const [blockerSnap, blockedSnap] = await Promise.all([
        getDocs(blockerQuery),
        getDocs(blockedQuery),
      ]);

      const blockedIdList = blockerSnap.docs.map(doc => doc.data().blockedUserId);
      const blockerIdList = blockedSnap.docs.map(doc => doc.data().blockerUserId);

      setBlockedIdList(blockedIdList); 
      setBlockerIdList(blockerIdList); 
    } catch (error) {
      console.error("Lỗi lấy danh sách block:", error);
      toast.error("Đã xảy ra lỗi khi tải danh sách block");
    }
  };

  useEffect(() => {
    if (userId) fetchBlockList();
  }, [userId]);
};

export default useGetBlockList;
