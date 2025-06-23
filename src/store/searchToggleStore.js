import {create} from "zustand";
const searchToggleStore = create((set) => ({
  isOpenToggle: false,
  setIsOpenToggle: ((boolean) => set({isOpenToggle: boolean})),
  mode: "search",
  setMode: (mode) => set({ mode }),
}));
export default searchToggleStore;