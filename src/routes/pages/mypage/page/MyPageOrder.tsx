import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { fetchCheckout } from "../../../../api/fetchData";
import toast from "react-hot-toast";
import { OrderItem } from "../../../../components/Item";
import { Link } from "react-router";
import { PackageOpen } from "lucide-react";
import { OrderSkeleton } from "../../../../components/Skeleton";

export default function MyPageOrder() {
  const { user } = useAuthStore();
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        const { data } = await fetchCheckout({ buyerId: user.id });

        setOrderList(data);
      } catch (error) {
        toast.error("일치하는 주문 내역이 없습니다.");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [user?.id]);

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
      {!isLoading && orderList.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {isLoading}
          {orderList.map((order: Order) => (
            <li key={order.id}>
              <OrderItem order={order} />
            </li>
          ))}
        </ul>
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
