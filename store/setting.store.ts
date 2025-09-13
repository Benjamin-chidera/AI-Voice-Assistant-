import {create} from 'zustand';

interface settingsStore {
    image: string | null;
    setImage: (value: string | null) => void;
}

export const usesettingsStore = create<settingsStore>((set) => ({
    image: null,
    setImage: (value) => set(() => ({image: value}))
}));