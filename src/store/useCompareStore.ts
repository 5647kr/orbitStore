import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CompareStore {
  compareId: string[];
  compareProduct: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearProduct: () => void;
}

export const useCompareStore = create<CompareStore>()(persist((set, get) => ({
  compareId: [],
  compareProduct: [],

  addProduct: (product) => {
    const { compareId, removeProduct } = get();

    if (compareId.includes(product.id)) {
      removeProduct(product);
    }
    // 최대 4개까지 비교함 저장 가능
    if (compareId.length >= 4) {
      toast.error("비교함에는 최대 4개의 제품만 담을 수 있습니다.", {
        id: "compare-length-error",
      });
      return;
    }
    // 4개 미만이거나 없으면 추가
    toast.success(`${product.title} - 비교함에 담았습니다.`, {
      id: "compare-add",
    });

    set((state) => ({
      compareId: [...state.compareId, product.id],
      compareProduct: [...state.compareProduct, product],
    }));
  },

  removeProduct: (product) => {
    toast.error(`${product.title} - 비교함에서 제거되었습니다.`, {
      id: "compare-delete",
    });
    set((state) => ({
      compareId: state.compareId.filter((id) => id !== product.id),
      compareProduct: state.compareProduct.filter((p) => p.id !== product.id),
    }));
  },

  clearProduct: () => set({ compareId: [], compareProduct: [] }),
}), {
  name: "orbitStore_compare",
  storage: createJSONStorage(() => localStorage),
}));
