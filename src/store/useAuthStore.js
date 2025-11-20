import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      logOut: () => set({ token: null, isAuthenticated: false }),
    }),
    { name: "auth_chat" }
  )
);
