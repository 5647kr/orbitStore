import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  readAllEvent,
  readEvent,
  readOpenEvent,
} from "../../api/event/eventAPI";

export function useAllEventQuery() {
  return useInfiniteQuery({
    queryKey: ["events", "all"],
    queryFn: ({ pageParam }) => {
      return readAllEvent({
        page: pageParam,
        pageNum: 10,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export function useEventQuery(id: string) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => {
      return readEvent({
        id: id,
      });
    },
    enabled: !!id,
  });
}

export function useOpenEventQuery() {
  return useQuery({
    queryKey: ["events", "open"],
    queryFn: () => readOpenEvent(),
  });
}
