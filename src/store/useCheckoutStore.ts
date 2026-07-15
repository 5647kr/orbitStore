import PortOne from "@portone/browser-sdk/v2";
import { create } from "zustand";
import { insertData } from "../api/fetchData";
import { useCartStore } from "./useCartStore";

interface CheckoutStore {
  // 결제를 위한 주문 목록 담는 배열과 함수
  orderItem: CartList[];
  setOrderItem: (item: CartList[]) => void;

  // 결제 통신
  isProgressing: boolean;
  requestCheckout: (
    payment: Payment,
  ) => Promise<{ success: boolean; message?: string }>;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  orderItem: [],
  setOrderItem: (item) => set({ orderItem: item }),

  isProgressing: false,
  requestCheckout: async (payment) => {
    set({ isProgressing: true });

    try {
      const orderId = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const orderName = payment.items.length > 1
        ? `${payment.items[0].title} 외 ${payment.items.length - 1}건`
        : payment.items[0].title;

      const response = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STORE_ID,
        channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
        paymentId: orderId,
        orderName: orderName,
        totalAmount: payment.totalPrice,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        customer: {
          customerId: payment.buyer.id,
          fullName: payment.buyer.name,
        },
      });

      if (response && response.code !== undefined) {
        return {
          success: false,
          message: response.message || "결제에 실패했습니다.",
        };
      }

      await insertData("orders", {
        id: orderId,
        buyerId: payment.buyer.id,
        buyerName: payment.buyer.name,
        buyerBasicAddress: payment.buyer.basicAddress,
        buyerDetailAddress: payment.buyer.detailAddress,
        buyerCall: payment.buyer.call,
        price: payment.totalPrice,
        items: payment.items,
        memo: payment.buyer.memo,
        pg_tx_id: response?.txId || null,
        status: "COMPLETED",
        deliver: "READY",
      });

      useCartStore.getState().clearCart();
      return { success: true };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: error instanceof Error
          ? error.message
          : "결제 요청 중 알 수 없는 오류가 발생했습니다.",
      };
    } finally {
      set({ isProgressing: false });
    }
  },
}));
