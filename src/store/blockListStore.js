import { create } from "zustand";
const useBlockListStore = create((set) => ({
  blockerIdList: [],
  setBlockerIdList: (list) => set({ blockerIdList: list }),
  blockedIdList: [],
  setBlockedIdList: (list) => set({ blockedIdList: list }),
  addBlockedIdList: (blockedUserId) =>
    set((state) => ({
      blockedIdList: [...state.blockedIdList, blockedUserId],
    })),
}));
export default useBlockListStore;
