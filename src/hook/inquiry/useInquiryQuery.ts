import { useInfiniteQuery } from "@tanstack/react-query";
import { readAllInquiry } from "../../api/inquiry/inquiryAPI";

export function useUserInquiryQuery(
  { name, call }: { name?: string; call?: string },
) {
  return useInfiniteQuery({
    queryKey: ["inquiry"],
    queryFn: ({ pageParam }) => {
      return readAllInquiry({
        page: pageParam,
        pageNum: 20,
        name: name!,
        call: call!,
      });
    },
    enabled: !!name && !!call,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
}
