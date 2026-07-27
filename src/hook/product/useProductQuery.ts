import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useProductFilterStore } from "../../store/product/useProductFilterStore";
import { readAllProduct, readProduct } from "../../api/product/productAPI";

export function useAllProductQuery() {
  const { filter } = useProductFilterStore();

  return useInfiniteQuery({
    queryKey: ["products", filter.category, filter.sort],
    queryFn: ({ pageParam }) => {
      return readAllProduct({
        page: pageParam,
        pageNum: 20,
        category: filter.category,
        sort: filter.sort,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => {
      return readProduct({
        id: id,
      });
    },
  });
}
