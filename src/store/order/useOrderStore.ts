import { create } from "zustand";

interface OrderStore {
  order: {
    id: string;
    items: CartList[];
    address: string;
    totalPrice: number;
  };
  setOrder: (
    id: string,
    items: CartList[],
    address: string,
    totalPrice: number,
  ) => void;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  order: { id: "", items: [], address: "", totalPrice: 0 },
  setOrder: (id, items, address, totalPrice) => {
    set({
      order: { id, items, address, totalPrice },
    });
  },
  resetOrder: () => {
    set({ order: { id: "", items: [], address: "", totalPrice: 0 } });
  },
}));
