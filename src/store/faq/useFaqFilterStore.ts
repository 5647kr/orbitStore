import { create } from "zustand";

interface FaqFilterStore {
  category: string;
  setFilter: (category: string) => void;
}

export const useFaqFilterStore = create<FaqFilterStore>((set) => ({
  category: "전체",
  setFilter: (category) => set({ category }),
}));
