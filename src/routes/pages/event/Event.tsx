import { useInView } from "react-intersection-observer";
import { useAllEventQuery } from "../../../hook/event/useEventQuery";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Hero from "../../../components/Hero";
import { EventSkeleton } from "../../../components/Skeleton";
import { EventItem } from "../../../components/Item";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";

export default function Event() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useAllEventQuery();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (error) {
      toast.error("목록을 불러오는 중 오류가 발생했습니다.", {
        id: "read-event-error",
      });
    }
  }, [error]);

  const events = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <Hero
        title="이벤트"
        subTitle="orbitStore의 진행 중인 프로모션과 커뮤니티 이벤트를 확인하세요."
      />

      {/* 이벤트 목록 */}
      <section className="max-w-7xl p-4 mx-auto py-5">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <li key={index}>
                  <EventSkeleton />
                </li>
              ))
            : events.map((event: Event) => (
                <li key={event.id}>
                  <Link to={`/event/${event.id}`}>
                    <EventItem {...event} />
                  </Link>
                </li>
              ))}
        </ul>

        <div ref={ref} className="py-5 flex justify-center">
          {isFetchingNextPage && (
            <Loader2 className="animate-spin text-(--ink-sub)" size={24} />
          )}
        </div>
      </section>
    </>
  );
}
