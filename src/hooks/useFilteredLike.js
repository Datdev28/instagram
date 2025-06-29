import useBlockListStore from "../store/blockListStore";

const useFilteredLike = (likes = []) => {
  console.log("likes", likes)
  const { blockedIdList, blockerIdList } = useBlockListStore();

  const blockedSet = new Set(blockedIdList);   // mình chặn họ
  const blockerSet = new Set(blockerIdList);   // họ chặn mình

  const visibleLikes = likes.filter(
    (like) => !blockedSet.has(like) && !blockerSet.has(like)
  );

  return visibleLikes;
};

export default useFilteredLike;
