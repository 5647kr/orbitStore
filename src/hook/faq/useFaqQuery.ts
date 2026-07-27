import { useInfiniteQuery } from "@tanstack/react-query";
import { useFaqFilterStore } from "../../store/faq/useFaqFilterStore";
import { readAllFaq } from "../../api/faq/faqAPI";

export function useAllFaqQuery() {
  const { category } = useFaqFilterStore();

  return useInfiniteQuery({
    queryKey: ["faqs", category],
    queryFn: ({ pageParam }) => {
      return readAllFaq({
        page: pageParam,
        pageNum: 10,
        category: category,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 50 * 10,
    gcTime: 1000 * 60 * 10,
  });
}
