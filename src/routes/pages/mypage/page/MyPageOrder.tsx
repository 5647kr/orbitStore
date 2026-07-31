import { useEffect } from "react";
import { useAuthStore } from "../../../../store/auth/useAuthStore";
import toast from "react-hot-toast";
import { OrderItem } from "../../../../components/Item";
import { Link, useNavigate } from "react-router";
import { Loader2, PackageOpen } from "lucide-react";
import { OrderSkeleton } from "../../../../components/Skeleton";
import { useUserOrderQuery } from "../../../../hook/order/useOrderQuery";
import { useInView } from "react-intersection-observer";

export default function MyPageOrder() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!user) {
      toast.error("회원정보를 찾을 수 없습니다. 홈페이지로 돌아갑니다.");
      navigate("/");
      return;
    }
  }, [user]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useUserOrderQuery({ id: user?.id, name: user?.name, call: user?.call });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (error) {
      toast.error("주문 내역을 불러오는 중 오류가 발생했습니다.", {
        id: "read-order-error",
      });
    }
  }, [error]);

  const orders = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <OrderSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {!isLoading && orders.length > 0 ? (
        <>
          <ul className="flex flex-col gap-5">
            {orders.map((order: ReadOrder) => (
              <li key={order.id}>
                <OrderItem order={order} />
              </li>
            ))}
          </ul>

          <div ref={ref} className="py-5 flex justify-center">
            {isFetchingNextPage && (
              <Loader2 className="animate-spin text-(--ink-sub)" size={24} />
            )}
          </div>
        </>
      ) : (
        <div className="border border-dashed border-(--line) py-23 px-5 flex flex-col items-center">
          <PackageOpen strokeWidth={1} size={40} stroke="var(--muted)" />
          <p className="my-5 text-base text-center text-(--ink-soft)">
            아직 구매한 제품이 없습니다. <br />
            제품페이지에서 마음에 드는 제품을 구매해보세요.
          </p>
          <Link
            to="/product"
            className="py-3 px-6 border border-(--navy) text-(--navy) hover:bg-(--navy) hover:text-(--bg)"
          >
            제품 둘러보기
          </Link>
        </div>
      )}
    </>
  );
}
