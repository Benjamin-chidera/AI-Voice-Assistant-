import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface profileState {
  textColors: string;
  setTextColors: (textColors: string) => void;

  bgColors: string;
  setBgColors: (bgColors: string) => void;

  loadColors: () => Promise<void>;
}

export const useProfileStore = create<profileState>((set) => ({
  textColors: "text-white",
  //   setTextColors: (textColors) => set(() => ({ textColors })),
  setTextColors: async (textColors: string) => {
    try {
      set({ textColors });
      await SecureStore.setItemAsync("textColors", textColors);
    } catch (error) {
      console.error("Failed to save text color:", error);
    }
  },

  bgColors: "bg-[#0D0D1]",
  //   setBgColors: (bgColors) => set(() => ({ bgColors })),
  setBgColors: async (bgColors: string) => {
    try {
      set({ bgColors });
      await SecureStore.setItemAsync("bgColors", bgColors);
    } catch (error) {
      console.error("Failed to save bg color:", error);
    }
  },


  loadColors: async () => {
    const [textColors, bgColors] = await Promise.all([
      SecureStore.getItemAsync("textColors"),
      SecureStore.getItemAsync("bgColors"),
    ]);
    set(() => ({
      textColors: textColors || "text-white",
      bgColors: bgColors || "bg-[#0D0D1]",
    }));
  },
}));
