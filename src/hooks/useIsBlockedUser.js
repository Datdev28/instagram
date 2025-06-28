import useBlockListStore from "../store/blockListStore";
import { useMemo } from "react";

const useIsBlockedUser = (profileUserId) => {
  const { blockerIdList, blockedIdList } = useBlockListStore();

  const blockedIdSet = useMemo(() => new Set(blockedIdList), [blockedIdList]);
  const blockerIdSet = useMemo(() => new Set(blockerIdList), [blockerIdList]);

  const blockedByMe = blockedIdSet.has(profileUserId);
  const blockedByThem = blockerIdSet.has(profileUserId);
  const isBlocked = blockedByMe || blockedByThem;

  return {
    isBlocked,
    blockedByMe,
    blockedByThem,
  };
};

export default useIsBlockedUser;
