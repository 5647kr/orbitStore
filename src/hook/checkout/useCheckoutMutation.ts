import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCheckout } from "../../api/checkout/checkoutAPI";

export function useCheckoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["checkout"],
    mutationFn: async (
      { orderId, form }: { orderId: string; form: CheckoutForm },
    ) => {
      const response = await createCheckout({ orderId, form });

      if (!response || !response.success) {
        throw new Error("결제 처리 실패");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("결제가 정상적으로 완료되었습니다.");
    },
    onError: () => {
      toast.error("결제 중 오류가 발생했습니다.");
    },
  });
}
