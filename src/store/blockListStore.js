import { create } from "zustand";

const useBlockListStore = create((set) => ({
  blockerIdList: [],
  setBlockerIdList: (list) => set({ blockerIdList: list }),

  blockedIdList: [],
  setBlockedIdList: (list) => set({ blockedIdList: list }),

  addBlockedId: (blockedUserId) =>
    set((state) => ({
      blockedIdList: [...state.blockedIdList, blockedUserId],
    })),

  removeBlockedId: (blockedUserId) =>
    set((state) => ({
      blockedIdList: state.blockedIdList.filter((id) => id !== blockedUserId),
    })),
}));

export default useBlockListStore;
