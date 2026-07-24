import { create } from "zustand";
import { logoutAuth } from "../api/auth";

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  setLogin: (user: User) => void;
  setLogout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  setLogin: (loginData) => set({ user: loginData, isLoggedIn: true }),
  setLogout: async () => {
    await logoutAuth();
    set({ user: null, isLoggedIn: false });
  },
}));
