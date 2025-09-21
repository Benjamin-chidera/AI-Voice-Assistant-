import { create } from "zustand";


interface ProfileState {
    voice: string;
    setVoice: (voice: string) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
    voice: "Alloy",
    setVoice: (voice) => set(() => ({ voice }))
})) 