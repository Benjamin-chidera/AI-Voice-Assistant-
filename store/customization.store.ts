import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface CustomizationStore {
  voice: string;
  setVoice: (voice: string) => void;

  language: string;
  setLanguage: (language: string) => void;

  color: string;
  setColor: (color: string) => void;

  customize: (data: { voice: string; language: string }) => Promise<void>;
  customizing: boolean;
  loadSettings: () => Promise<void>;
}

export const useCustomizationStore = create<CustomizationStore>((set) => ({
  voice: "alloy",
  setVoice: (voice: string) => set({ voice }),

  language: "en",
  setLanguage: (language: string) => set({ language }),

  color: "bg-blue-500",
  //   setColor: (color: string) => set({ color }),
  setColor: async (color: string) => {
    try {
      set({ color });
      await SecureStore.setItemAsync("selectedColor", color);
    } catch (error) {
      console.error("Failed to save color:", error);
    }
  },
  customizing: false,

  customize: async (val: { voice: string; language: string }) => {
    const { voice, language } = val;
    console.log(voice, language);
    try {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        interface DecodedToken {
          id: number;
          // email: string;
          // fullname: string;
          exp: number;
        }

        const user = jwtDecode<DecodedToken>(token);

        console.log(user);
        set({ customizing: true });

        const { data } = await axios.patch(
          `http://192.168.0.21:8000/echo/customize/${user?.id}`,
          {
            voice,
            echo_language_output: language,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(voice, language);
        set({ voice: data.voice, language: data.echo_language_output });
        await SecureStore.setItemAsync("selectedVoice", voice);
        await SecureStore.setItemAsync("selectedLanguage", language);

        set({ customizing: false });
      }
    } catch (error) {
      console.log(error);
      set({ customizing: false });
    }
  },

  loadSettings: async () => {
    try {
      const [savedColor, savedVoice, savedLanguage] = await Promise.all([
        SecureStore.getItemAsync("selectedColor"),
        SecureStore.getItemAsync("selectedVoice"),
        SecureStore.getItemAsync("selectedLanguage"),
      ]);

      set({
        color: savedColor || "bg-blue-500",
        voice: savedVoice || "alloy",
        language: savedLanguage || "en",
      });

      //   console.log("Settings loaded:", {
      //     color: savedColor || "bg-blue-500",
      //     voice: savedVoice || "alloy",
      //     language: savedLanguage || "en",
      //   });
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  },
}));
