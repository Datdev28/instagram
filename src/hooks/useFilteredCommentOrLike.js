import useBlockListStore from "../store/blockListStore";

const useFilteredComments = (comments = []) => {
  const { blockedIdList, blockerIdList } = useBlockListStore();

  const blockedSet = new Set(blockedIdList);   // mình chặn họ
  const blockerSet = new Set(blockerIdList);   // họ chặn mình

  const visibleComments = comments.filter(
    (cmt) => !blockedSet.has(cmt.createBy) && !blockerSet.has(cmt.createBy)
  );

  return visibleComments;
};

export default useFilteredComments;
