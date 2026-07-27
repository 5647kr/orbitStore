import { create } from "zustand";

interface ProductFilterStore {
  filter: { category: string; sort: string };
  setFilter: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  filter: { category: "전체", sort: "최신순" },
  setFilter: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      filter: {
        ...state.filter,
        [name]: value,
      },
    }));
  },
}));