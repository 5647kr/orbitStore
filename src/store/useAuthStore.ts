import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  setLogin: (user: User) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setLogin: (loginData) => set({ user: loginData, isLoggedIn: true }),
      setLogout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "orbitStore_auth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
