import { AlertTriangle, CheckIcon, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from "react-hot-toast";
import { useOrderStore } from "../../../store/order/useOrderStore";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { order } = useOrderStore();
  const { isLoggedIn } = useAuthStore();

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("주문번호를 복사했습니다.");
  };

  const navigateButton = () => {
    if (isLoggedIn) {
      navigate("/mypage/order");
    } else {
      navigate("/guest");
    }
  };

  if (!order.id) {
    toast.error("주문 내역을 찾을 수 없습니다. 제품페이지로 돌아갑니다.");
    navigate("/product");
  }

  return (
    <section className="max-w-120 mx-auto py-10 flex flex-col items-center px-4">
      {/* 타이틀 */}
      <div className="mb-8">
        <div className="bg-(--ok) w-14 h-14 rounded-full flex justify-center items-center mx-auto">
          <CheckIcon size={24} stroke="var(--bg)" />
        </div>
        <h2 className="text-2xl text-center font-bold mt-6 mb-2.5">
          결제가 완료되었습니다.
        </h2>
        <p className="text-sm text-(--ink-soft) text-center">
          주문해주셔서 감사합니다. 상품 준비가 시작되면 알려드릴게요.
        </p>
      </div>

      {/* 주문 번호 */}
      <div className="border border-(--brass) p-10 bg-(--brass-soft) w-full flex flex-col items-center gap-3 mb-5">
        <h3 className="text-sm text-(--brass)">문의 번호</h3>
        <strong className="ibm text-2xl font-bold text-center">
          {order.id}
        </strong>
      </div>

      {/* 복사 버튼 */}
      <button
        type="button"
        onClick={() => handleCopy(order.id)}
        className="flex items-center gap-2.5 text-(--ink-soft) text-sm p-2.5"
      >
        <Copy size={16} /> 주문번호 복사하기
      </button>

      {/* 안내문 */}
      <div className="border border-dashed border-(--line) p-5 bg-(--surface) flex flex-col items-center gap-2.5 my-7">
        <AlertTriangle size={24} stroke="var(--brass)" />
        <p className="text-(--ink-soft) text-sm break-keep">
          <span className="text-(--ink) font-bold">
            비회원으로 주문하셨다면
          </span>{" "}
          이 주문번호를 꼭 저장해주세요. 로그인 없이는 주문번호(또는
          이름·연락처)로만 답변을 확인하실 수 있습니다.
        </p>
      </div>

      {/* 주문 내역 */}
      <div className="border border-(--line) w-full">
        <ul>
          {order.items.map((item, index) => (
            <li
              key={item.id}
              className={`p-5 flex flex-col gap-4 lg:flex-row lg:items-center ${index === order.items.length - 1 ? null : "border-b border-(--line)"}`}
            >
              <div className="flex gap-4 lg:flex-2 lg:w-0">
                {/* 제품 이미지 */}
                <div
                  className="w-25 aspect-square bg-(--surface) flex justify-center items-center relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250

after:absolute after:w-4.5 after:h-4.5 after:bottom-2.5 after:right-2.5 after:border-b-2 after:border-r-2 after:border-(--navy) after:transition-all after:duration-250

hover:before:w-6 hover:before:h-6 hover:before:border-(--brass)
hover:after:w-6 hover:after:h-6 hover:after:border-(--brass)
"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[80%] aspect-square align-top"
                  />
                </div>

                {/* 제품 정보란 */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-(--muted)">
                    {item.category}
                  </span>
                  <h3 className="fraunces text-base overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.title}
                  </h3>
                  <p className="text-sm text-(--navy)">
                    수량 {item.quantity}개
                  </p>
                </div>

                <div className="flex-1 lg:w-0 flex lg:justify-end items-center">
                  <strong className="ibm font-normal text-base lg:text-lg">
                    ₩{(item.price * item.quantity).toLocaleString("ko-KR")}
                  </strong>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 결제 내역 */}
      <div className="border border-(--line) w-full mt-5">
        <ul>
          <li className="flex justify-between items-center p-2.5">
            <span className="text-(--muted) text-sm">결제 수단</span>
            <p className="tet-sm">카카오페이</p>
          </li>
          <li className="flex justify-between items-center p-2.5 border-t border-(--line)">
            <span className="text-(--muted) text-sm">배송지</span>
            <p className="tet-sm">{order.address}</p>
          </li>
          <li className="flex justify-between items-center p-2.5 border-t border-(--line) bg-(--surface)">
            <span className="text-sm font-bold">총 결제금액</span>
            <p className="tet-sm">
              ₩{order.totalPrice.toLocaleString("ko-KR")}
            </p>
          </li>
        </ul>
      </div>

      {/* 네비게이션 */}
      <div className="w-full flex flex-col gap-2.5 mt-8">
        <button
          type="button"
          className="py-3 px-6 bg-(--brass) text-(--bg) text-sm"
          onClick={navigateButton}
        >
          주문내역으로 이동
        </button>
        <Link
          to="/product"
          className="py-3 px-6 border border-(--navy) text-(--navy) hover:bg-(--navy) hover:text-(--bg) text-sm text-center"
        >
          쇼핑 계속하기
        </Link>
        <Link to="/" className="py-3 px-6 text-sm text-center">
          홈으로
        </Link>
      </div>
    </section>
  );
}
