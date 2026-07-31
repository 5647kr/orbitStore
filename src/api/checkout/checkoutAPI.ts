import PortOne from "@portone/browser-sdk/v2";
import supabase from "../../supabase";
import { updateProductStock } from "../product/productAPI";

export async function createCheckout(
  { orderId, form }: { orderId: string; form: CheckoutForm },
) {
  try {
    const orderName = form.items.length > 1
      ? `${form.items[0].title} 외 ${form.items.length - 1}건`
      : form.items[0].title;

    const response = await PortOne.requestPayment({
      storeId: import.meta.env.VITE_PORTONE_STORE_ID,
      channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
      paymentId: orderId,
      orderName: orderName,
      totalAmount: form.totalPrice,
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      customer: {
        customerId: form.buyer.id,
        fullName: form.buyer.name,
      },
    });

    if (response && response.code !== undefined) {
      throw new Error(response.message || "사용자가 결제를 취소하였습니다.");
    }

    const orderForm = {
      id: orderId,
      buyerId: form.buyer.id,
      buyerName: form.buyer.name,
      buyerBasicAddress: form.buyer.basicAddress,
      buyerDetailAddress: form.buyer.detailAddress,
      buyerCall: form.buyer.call,
      price: form.totalPrice,
      items: form.items,
      memo: form.buyer.memo,
      pg_tx_id: response?.txId || null,
      status: "COMPLETED",
      deliver: "READY",
    };

    const orderData = await createOrder(orderForm);

    await updateProductStock(form.items);

    return { success: true, data: orderData };
  } catch (error) {
    return { success: false };
  }
}

export async function createOrder(form: CreateOrder) {
  const { data, error } = await supabase
    .from("orders")
    .insert([form])
    .select();

  if (error) throw error;

  return data;
}
