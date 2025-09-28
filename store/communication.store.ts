import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';


interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  audioUrl?: string;
  timestamp: Date;
}

interface CommunicationStore {
  messages: Message[];
  isProcessing: boolean;
  ai_response: "";
  url: string;

  // Keep your existing structure for compatibility
  communication_response: {
    ai_response: string;
    user_text: string;
    speech_response: string;
  };

  voice: (uri: string) => Promise<void>;
  // stream: (uri: string) => Promise<void>;
  clearMessages: () => void;
}

export const useCommunicationStore = create<CommunicationStore>((set, get) => ({
  messages: [],
  isProcessing: false,
  ai_response: "",
  url: "",

  communication_response: {
    ai_response: "",
    user_text: "",
    speech_response: "",
  },

  voice: async (uri) => {
    try {
      set({ isProcessing: true });

      const token = await SecureStore.getItemAsync("token");

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "recording.m4a",
        type: "audio/m4a",
      } as any);

      const { data } = await axios.post(
        "http://192.168.0.21:8000/chat/communicate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", data);

      // Update the latest response (for backward compatibility)
      set({ communication_response: data, ai_response: data.ai_response });

      // Add messages to conversation history
      const currentMessages = get().messages;

      // Add user message
      if (data.user_text) {
        const userMessage: Message = {
          id: `user-${Date.now()}`,
          type: "user",
          text: data.user_text,
          timestamp: new Date(),
        };
        currentMessages.push(userMessage);
      }

      // Add AI response
      if (data.ai_response) {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: "ai",
          text: data.ai_response,
          audioUrl: data.speech_response,
          timestamp: new Date(),
        };
        currentMessages.push(aiMessage);
      }

      set({ messages: [...currentMessages] });
    } catch (error) {
      console.error("Communication error:", error);

      // Add error message to conversation
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: "ai",
        text: "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
      }));
    } finally {
      set({ isProcessing: false });
    }
  },

  // stream: async (aiText: string) => {
  //   try {
  //     const token = await SecureStore.getItemAsync("token");
  
  //     const response = await axios.post(
  //       "http://192.168.0.21:8000/chat/stream_communicate",
  //       { ai_response: aiText },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         responseType: "arraybuffer", // get raw binary
  //       }
  //     ); 
   
  //     console.log("API Response:", response.data);
  
  //     // Convert binary to base64
  //     // const base64Audio = Buffer.from(response.data, 'binary').toString('base64');
  
  //     // // Save to local file
  //     // const localUri = `${FileSystem.Directory}response.mp3`;

  //     // await FileSystem.writeAsStringAsync(localUri, base64Audio, {
  //     //   encoding: "base64",
  //     // });
  
  //     // Set the local URI in your store
  //     // set({ url: localUri });
  
  //     // console.log("Saved audio to:", localUri);
  //   } catch (error) {
  //     console.error("Stream error:", error);
  //   }
  // },

  clearMessages: () => {
    set({
      messages: [],
      communication_response: {
        ai_response: "",
        user_text: "",
        speech_response: "",
      },
    });
  },
}));
