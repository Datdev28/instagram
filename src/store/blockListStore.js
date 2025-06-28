import { create } from "zustand";
const useBlockListStore = create((set) => ({
  blockerIdList: [],
  setBlockerIdList: (list) => set({ blockerIdList: list }),
    addBlockerIdList: (blockerUserId, blockedUserId) =>
    set((state) => ({
      blockerIdList: [...state.blockerIdList, {blockerUserId, blockedUserId}],
    })),
  blockedIdList: [],
  setBlockedIdList: (list) => set({ blockedIdList: list }),
}));
export default useBlockListStore;
