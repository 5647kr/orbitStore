import { useQuery } from "@tanstack/react-query";
import { readGuestInquiry, readGuestOrder } from "../../api/guest/guestAPI";

export function useGuestInquiryQuery(form: ReadGuest | null) {
  return useQuery({
    queryKey: ["inquiry", form],
    queryFn: () => readGuestInquiry(form!),
    enabled: !!form,
    staleTime: 1000 * 60 * 10,
  });
}

export function useGuestOrderQuery(form: ReadGuest | null) {
  return useQuery({
    queryKey: ["orders", form],
    queryFn: () => readGuestOrder(form!),
    enabled: !!form,
    staleTime: 1000 * 60 * 10,
  });
}
