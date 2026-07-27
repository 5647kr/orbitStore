import { Link, useLocation, useNavigate } from "react-router";
import Hero from "../../../components/Hero";
import { OrderItem } from "../../../components/Item";
import { useGuestOrderQuery } from "../../../hook/guest/useGuestQuery";
import { useEffect } from "react";

export default function GuestOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form;

  const { data: orders } = useGuestOrderQuery(form);
  // URL 직접 입력 등 예외적인 방어 코드만 유지

  useEffect(() => {
    if (!form) {
      navigate("/guest", { replace: true });
    }
  }, [form, navigate]);

  if (!orders) return null;

  return (
    <>
      <Hero
        title="주문조회 결과"
        subTitle="입력하신 정보와 일치하는 주문을 찾습니다."
      />

      <section className="max-w-7xl p-4 mx-auto py-5">
        <ul className="flex flex-col gap-5">
          {orders.map((order: Order) => (
            <li key={order.id}>
              <OrderItem order={order} />
            </li>
          ))}
        </ul>

        <div>
          <div className="flex gap-4 mt-5">
            <Link
              to="/guest"
              className="w-fit text-center py-2 px-4 border border-(--navy) bg-(--surface) hover:bg-(--navy) hover:text-(--bg) text-sm"
            >
              다른 정보 조회하기
            </Link>
            <Link
              to="/product"
              className="w-fit text-center py-2 px-4 border border-(--brass) bg-(--brass) text-(--bg) text-sm"
            >
              다른 제품 둘러보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
