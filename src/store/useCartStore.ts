import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStoreType {
  cartList: CartList[];
  addItem: (item: CartList) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreType>()(
  persist(
    (set) => ({
      cartList: [],

      // 장바구니 담기
      addItem: (item) =>
        set((state) => {
          const isExist = state.cartList.find(
            (product) => product.id === item.id,
          );

          if (isExist) {
            return {
              cartList: state.cartList.map((product) =>
                product.id === item.id
                  ? { ...product, quantity: item.quantity + item.quantity }
                  : item,
              ),
            };
          }
          return { cartList: [...state.cartList, item] };
        }),

      // 장바구니 아이템 삭제
      removeItem: (id) =>
        set((state) => ({
          cartList: state.cartList.filter((item) => item.id !== id),
        })),

      // 장바구니 아이템 수량 수정
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartList: state.cartList.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),

      // 주문 완료시 장바구니 비우기
      clearCart: () => {
        set({ cartList: [] });
      },
    }),
    {
      name: "orbitStore_cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
