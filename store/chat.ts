import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface ChatStoreState {
  messages: Message[];
  isProcessing: boolean;

  // Keep your existing structure for compatibility
  communication_response: {
    ai_chat: string;
    user_chat: string;
  };

  clearMessages: () => void;
  sendChat: (data: { chat: string }) => Promise<void>;

  // Add your new state here
  chat: string;
  setChat: (chat: string) => void;
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
  chat: "",
  setChat: (chat: string) => set({ chat }),
  messages: [],
  isProcessing: false,
  communication_response: {
    ai_chat: "",
    user_chat: "",
  },

  clearMessages: () => {
    set({
      messages: [],
      communication_response: { ai_chat: "", user_chat: "" },
    });
  },

  sendChat: async (data: { chat: string }) => {
    try {
      set({ isProcessing: true });

      const token = await SecureStore.getItemAsync("token");
      const { chat } = data;

      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Sending chat:", chat);

      // Add user message FIRST
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        type: "user",
        text: chat,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, userMessage],
      }));

      // Make API call
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/chat_with_ai`,
        { message: chat },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      // Update communication_response
      set({
        communication_response: {
          ai_chat: response.data.ai_chat || "",
          user_chat: chat,
        },
      });

      // Add AI response
      if (response.data.ai_chat) {
        const aiMessage: Message = {
          id: `ai-${Date.now() + 1}`, // +1 to ensure unique ID
          type: "ai",
          text: response.data.ai_chat,
          timestamp: new Date(),
        };

        set((state) => ({
          messages: [...state.messages, aiMessage],
        }));
      }

      // Clear input after successful send
      set({ chat: "" });
    } catch (error: any) {
      console.error("Error sending chat:", error);

      // Add error message to conversation
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: "ai",
        text: "Sorry, I couldn't process your message. Please try again.",
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
      }));

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    } finally {
      set({ isProcessing: false });
    }
  },
}));
