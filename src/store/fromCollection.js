import { create } from "zustand";
const useFromCollection = create((set) => ({
  fromCollection: { isCollectionSmall: false, collectionId: null },
  setFromCollection: (boolean, collectionId) =>
    set({
      fromCollection: {
        isCollectionSmall: boolean,
        collectionId,
      },
    }),
}));
export default useFromCollection;
