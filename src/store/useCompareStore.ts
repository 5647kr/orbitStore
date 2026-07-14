import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CompareStore {
  compareId: string[];
  compareProduct: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  clearProduct: () => void;
}

export const useCompareStore = create<CompareStore>()(persist((set) => ({
  compareId: [],
  compareProduct: [],

  addProduct: (product) =>
    set((state) => {
      // 이미 있을떄 다시 누를경우 삭제 기능
      if (state.compareId.includes(product.id)) {
        alert(`${product.title} - 비교함에서 제거되었습니다.`);
        return {
          compareId: state.compareId.filter((id) => id !== product.id),
          compareProduct: state.compareProduct.filter((p) =>
            p.id !== product.id
          ),
        };
      }
      // 최대 4개까지 비교함 저장 가능
      if (state.compareId.length >= 4) {
        alert("비교함에는 최대 4개의 제품만 담을 수 있습니다.");
        return state;
      }
      // 4개 미만이거나 없으면 추가
      alert(`${product.title} - 비교함에 담았습니다.`);
      return {
        compareId: [...state.compareId, product.id],
        compareProduct: [...state.compareProduct, product],
      };
    }),

  removeProduct: (id) =>
    set((state) => ({
      compareId: state.compareId.filter((item) => item !== id),
      compareProduct: state.compareProduct.filter((p) => p.id !== id),
    })),

  clearProduct: () => set({ compareId: [], compareProduct: [] }),
}), {
  name: "orbitStore_compare",
  storage: createJSONStorage(() => localStorage),
}));
