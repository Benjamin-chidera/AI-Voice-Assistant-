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
    image: string | null;
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
  confirmPassword: string;
  image: string | null;

  // Actions
  setFullname: (fullname: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setImage: (image: string | null) => void;
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

  // update user profile
  updateProfile: (data: {
    fullname: string;
    email: string;
    confirmPassword: string;
    password: string;
    image: string | null;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: {
    id: null,
    email: null,
    fullname: null,
    // profile_pic: null,
    voice: null,
    image: null,
  },
  token: null,
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: null,

  // Form setters
  setFullname: (fullname: string) => set({ fullname }),
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setConfirmPassword: (confirmPassword: string) => set({ confirmPassword }),
  setImage: (image: string | null) => set({ image }),

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

      const { data } = await axios(
        `http://192.168.0.21:8000/auth/user/${user?.id}/`
      );      

      set({
        user: data,
        image: data.profile_pic,
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
          // profile_pic: null,
          id: null,
          voice: null,
          image: null,
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

  updateProfile: async (datas: {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
    image: string | null;
  }) => {
    try {
      const { fullname, email, password, confirmPassword, image } = datas;
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        interface DecodedToken {
          id: number;
          exp: number;
        }
        const user = jwtDecode<DecodedToken>(token);
        set({ loading: true });

        // Build FormData
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);

        if (image) {
          const uriParts = image.split(".");
          const fileType = uriParts[uriParts.length - 1];

          formData.append("profile_pic", {
            uri: image,
            name: `profile.${fileType}`,
            type: `image/${fileType}`,
          } as any);
        }

        const { data } = await axios.patch(
          `http://192.168.0.21:8000/auth/user/${user?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            }, 
          }
        );

        console.log("Updated user:", data.user.profile_pic);

        set({
          user: data.user, 
          image: data.user.profile_pic,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
}));
