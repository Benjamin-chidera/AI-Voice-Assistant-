import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";
import { create } from "zustand";

interface CustomizationStore {
  voice: string;
  setVoice: (voice: string) => void;
  voiceIdentifier?: string;
  setVoiceIdentifier?: (voiceIdentifier: string) => void;

  language: string;
  setLanguage: (language: string) => void;

  color: string;
  setColor: (color: string) => void;

  customize: (data: {
    voice: string;
    language: string;
    voiceIdentifier?: string;
  }) => Promise<void>;
  customizing: boolean;
  loadSettings: () => Promise<void>;
}

export const useCustomizationStore = create<CustomizationStore>((set) => ({
  voice: "alloy",
  setVoice: (voice: string) => set({ voice }),

  language: "en",
  setLanguage: (language: string) => set({ language }),

  voiceIdentifier: "",
  setVoiceIdentifier: (voiceIdentifier: string) => set({ voiceIdentifier }),

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

  customize: async (val: {
    voice: string;
    language: string;
    voiceIdentifier?: string;
  }) => {
    const { voice, language, voiceIdentifier } = val;
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
          `${process.env.EXPO_PUBLIC_API_URL}/echo/customize/${user?.id}`,
          {
            voice,
            echo_language_output: language,
            voice_identifier: voiceIdentifier,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Success", data?.message);
        set({
          voice: data.voice,
          language: data.echo_language_output,
          voiceIdentifier: data.voice_identifier,
        });
        await SecureStore.setItemAsync("selectedVoice", voice);
        await SecureStore.setItemAsync("selectedLanguage", language);
        if (voiceIdentifier) {
          await SecureStore.setItemAsync(
            "selectedVoiceIdentifier",
            voiceIdentifier
          );
        }

        set({ customizing: false });
      }
    } catch (error: any) {
      console.log("Error response:", error?.response?.data?.detail);
      Alert.alert("Error", error?.response?.data?.detail);
      set({ customizing: false });
    }
  },

  loadSettings: async () => {
    try {
      const [savedColor, savedVoice, savedLanguage, savedVoiceIdentifier] =
        await Promise.all([
          SecureStore.getItemAsync("selectedColor"),
          SecureStore.getItemAsync("selectedVoice"),
          SecureStore.getItemAsync("selectedLanguage"),
          SecureStore.getItemAsync("selectedVoiceIdentifier"),
        ]);

      set({
        color: savedColor || "bg-blue-500",
        voice: savedVoice || "alloy",
        language: savedLanguage || "en",
        voiceIdentifier: savedVoiceIdentifier || undefined,
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
