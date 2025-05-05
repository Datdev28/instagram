import { create } from "zustand";
const useLoadingBarStore = create((set) => ({
  progress: 0,
  setProgress: ((percent) => set({ progress: percent }))
}));
export default useLoadingBarStore;