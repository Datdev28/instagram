import { create } from "zustand";

const useNotificationStore = create((set) => ({
  hasNewNoti: false,
  setHasNewNoti: (val) => set({ hasNewNoti: val }),
}));

export default useNotificationStore;
