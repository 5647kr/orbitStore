import { useInfiniteQuery } from "@tanstack/react-query";
import { readAllOrder } from "../../api/order/orderAPI";

export function useUserOrderQuery(
  { id, name, call }: { id?: string; name?: string; call?: string },
) {
  return useInfiniteQuery({
    queryKey: ["orders", id, name, call],
    queryFn: ({ pageParam }) => {
      return readAllOrder({
        page: pageParam,
        pageNum: 20,
        id: id!,
        name: name!,
        call: call!,
      });
    },
    enabled: !!id && !!name && !!call,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
