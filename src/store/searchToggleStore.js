import {create} from "zustand";
const searchToggleStore = create((set) => ({
  isOpenToggle: false,
  setIsOpenToggle: ((boolean) => set({isOpenToggle: boolean}))
}));
export default searchToggleStore;