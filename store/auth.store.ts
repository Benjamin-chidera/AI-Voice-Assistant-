import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

// const api = !process.env.EXPO_API_URL;

// console.log(api);

interface AuthState {
  // User state
  user: {
    id: number | null;
    email: string | null;
    profile_pic: string | null;
    fullname: string | null;
    voice: string | null;
  };
  token: string | null;
  isAuthenticated: boolean; 
  setIsAuthenticated: (isAuthenticated: boolean) => void;

  // Form state
  fullname: string;
  email: string;
  password: string;

  // Actions
  setFullname: (fullname: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  register: (data: {
    fullname: string;
    email: string;
    password: string;
  }) => Promise<void>;

  //   user info
  getUser: () => Promise<void>;

  login: (data: { email: string; password: string }) => Promise<void>;

  //   loading state
  loading: boolean;
  setLoading: (loading: boolean) => void;

  //   logout
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: {
    id: null,
    email: null,
    fullname: null,
    profile_pic: null,
    voice: null,
  },
  token: null,
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  fullname: "",
  email: "",
  password: "",

  // Form setters
  setFullname: (fullname: string) => set({ fullname }),
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),

  // Loading state
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),

  // Register function
  register: async (data: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    try {
      const { fullname, email, password } = data;

      if (!fullname || !email || !password) {
        throw new Error("Please fill all fields");
      }

      set({ loading: true });
      const response = await axios.post(
        `http://192.168.0.21:8000/auth/register`,
        {
          fullname,
          email,
          password,
        }
      );

      if (response.status === 201) {
        const { access_token, user } = response.data;

        // Persist token
        await SecureStore.setItemAsync("token", access_token);
        console.log(response.data);

        // Update state
        set({
          user,
          token: access_token,
          isAuthenticated: true,
          setIsAuthenticated: (isAuthenticated: boolean) =>
            set({ isAuthenticated }),
          loading: false,

          // Clear form
          fullname: "",
          email: "",
          password: "",
        });

        // Navigate to main app

        router.replace("/home");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      set({ loading: false });

      // Handle specific error cases
      if (error.response?.status === 400) {
        throw new Error("Invalid registration data");
      } else if (error.response?.status === 400) {
        throw new Error("User already exists");
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    }
  },

  login: async (data: { email: string; password: string }) => {
    const { email, password } = data;

    try {
      if (!email || !password) {
        console.log("Please fill all fields");
        return;
      }

      set({ loading: true });
      const response = await axios.post(`http://192.168.0.21:8000/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { access_token, user } = response.data;

        // console.log(response);

        // Persist token
        await SecureStore.setItemAsync("token", access_token);

        // Update state
        set({
          user,
          token: access_token,
          isAuthenticated: true,
          setIsAuthenticated: (isAuthenticated: boolean) =>
            set({ isAuthenticated }),
          loading: false,

          // Clear form
          email: "",
          password: "",
        });
        // Navigate to main app

        router.replace("/home");
      }
    } catch (error) {
      console.log(error);
    }
  },

  getUser: async () => {
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

      const { data } = await axios(
        `http://192.168.0.21:8000/auth/user/${user.id}/`
      );

      console.log(data);

      set({
        user: data,
      });
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      set({
        user: {
          email: null,
          fullname: null,
          profile_pic: null,
          id: null,
          voice: null,
        },
        token: null,
        isAuthenticated: false,
        setIsAuthenticated: (isAuthenticated: boolean) =>
          set({ isAuthenticated }),
      });
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));
