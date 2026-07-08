import { create } from "zustand";

interface CheckoutStore {
  orderItem: CartList[];
  setOrderItem: (item: CartList[]) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  orderItem: [],
  setOrderItem: (item) => set({ orderItem: item }),
}));
