import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GuestStore {
  guestData: Order[] | Inquiry[];
  setGuestOrder: (order: Order[]) => void;
}

export const useGuestStore = create<GuestStore>()(persist((set) => ({
  guestData: [],
  setGuestOrder: (order) => set({ guestData: order }),
}), { name: "guest-data", storage: createJSONStorage(() => sessionStorage) }));
