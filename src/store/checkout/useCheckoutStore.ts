import { create } from "zustand";

interface CheckoutStore {
  checkoutList: CartList[];
  setCheckoutList: (item: CartList[]) => void;
  resetCheckoutList: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  checkoutList: [],
  setCheckoutList: (item) => set({ checkoutList: item }),
  resetCheckoutList: () => set({ checkoutList: [] }),
}));
