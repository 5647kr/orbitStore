import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStoreType {
  cartList: CartList[];
  addItem: (item: CartList) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  resetCart: () => void;
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
              cartList: state.cartList.map((product) => {
                if (product.id === item.id) {
                  const nextQuantity = product.quantity + item.quantity;
                  const maxStock = product.amount ?? 99;
                  const validQuantity = Math.min(nextQuantity, maxStock);

                  return { ...product, quantity: validQuantity };
                }
                return product;
              }),
            };
          }

          const maxStock = item.amount ?? 99;
          const initialQuantity = Math.min(item.quantity, maxStock);

          return {
            cartList: [...state.cartList, {
              ...item,
              quantity: initialQuantity,
            }],
          };
        }),

      // 장바구니 아이템 삭제
      removeItem: (id) =>
        set((state) => ({
          cartList: state.cartList.filter((item) => item.id !== id),
        })),

      // 장바구니 아이템 수량 수정
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartList: state.cartList.map((item) => {
            if (item.id === id) {
              const maxStock = item.amount ?? 99; // 💡 최대 재고 수량
              // 💡 1 이상, maxStock(재고) 이하로 제한
              const validQuantity = Math.max(1, Math.min(quantity, maxStock));

              return { ...item, quantity: validQuantity };
            }
            return item;
          }),
        })),

      // 주문 완료시 장바구니 비우기
      resetCart: () => {
        set({ cartList: [] });
      },
    }),
    {
      name: "orbitStore_cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
