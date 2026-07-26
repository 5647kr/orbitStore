import { useMutation } from "@tanstack/react-query";
import { createInquiry } from "../../api/inquiry/inquiryAPI";
import toast from "react-hot-toast";

export default function useInquiryMutation() {
  return useMutation({
    mutationKey: ["inquiry"],
    mutationFn: (form: CreateInquiry) => createInquiry(form),
    onSuccess: () => {
      toast.success("문의가 정상적으로 접수되었습니다.");
    },
    onError: () => {
      toast.error("문의 접수에 실패했습니다.");
    },
  });
}
