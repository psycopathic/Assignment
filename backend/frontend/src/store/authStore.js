import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isSignUp: false,
      isLogin: false,

      signup: async (data) => {
        set({ isSignUp: true });
        try {
          const res = await axiosInstance.post("/signup", data);
          set({ authUser: res.data });
          toast.success("Signup successful!");
          return res.data;
        } catch (error) {
          const errMsg = error.response?.data?.error || error.response?.data?.message || error.message;
          toast.error(errMsg);
          return { error: errMsg };
        } finally {
          set({ isSignUp: false });
        }
      },
      login: async (data) => {
        set({ isLogin: true });
        try {
          const res = await axiosInstance.post("/login", data);
          set({ authUser: res.data });
          toast.success("Login successful!");
        } catch (error) {
          console.log("Error in login controller", error.message);
        } finally {
          set({ isLogin: false });
        }
      },
      logout: async () => {
        try {
          await axiosInstance.post("/logout");
          set({ authUser: null });
          toast.success("Logout successful!");
        } catch (error) {
          console.log("Error in logout controller", error.message);
        }
      },
    }),
    {
      name: "auth-storage", // Key in localStorage
    }
  )
);
