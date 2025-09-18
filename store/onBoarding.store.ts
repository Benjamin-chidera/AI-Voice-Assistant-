import { create } from "zustand";

interface OnBoardingStore {
  hasOnBoarded: boolean | null;
  setHasOnBoarded: (value: boolean) => void;
}

export const useOnBoardingStore = create<OnBoardingStore>((set) => ({
  hasOnBoarded: null,
  setHasOnBoarded: (value) => set({ hasOnBoarded: value }),
}));
