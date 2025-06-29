import useBlockListStore from "../store/blockListStore";

const useFilteredComments = (comments = []) => {
  const { blockedIdList, blockerIdList } = useBlockListStore();

  const blockedSet = new Set(blockedIdList); 
  const blockerSet = new Set(blockerIdList);  

  const visibleComments = comments.filter(
    (cmt) => !blockedSet.has(cmt.createBy) && !blockerSet.has(cmt.createBy)
  );

  return visibleComments;
};

export default useFilteredComments;
