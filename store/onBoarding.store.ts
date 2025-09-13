import {create} from 'zustand';

interface OnBoardingStore {
    hasOnBoarded: boolean;
    setHasOnBoarded: (value: boolean) => void;
}

export const useOnBoardingStore = create<OnBoardingStore>((set) => ({
    hasOnBoarded: true,
    setHasOnBoarded: (value: boolean) => set(() => ({hasOnBoarded: value}))
}));