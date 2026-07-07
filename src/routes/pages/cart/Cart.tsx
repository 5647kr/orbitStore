import { Link, useNavigate } from "react-router";
import Hero from "../../../components/Hero";
import { useCartStore } from "../../../store/useCartStore";
import { Minus, Plus } from "lucide-react";
import { useMemo } from "react";

export default function Cart() {
  const { cartList, updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartList]);

  const handleCheckout = () => {
    if (cartList.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    navigate("/checkout");
  };

  const isCartEmpty = cartList.length === 0;

  console.log(cartList);

  return (
    <>
      <Hero
        title="장바구니"
        subTitle="담아두신 제품을 확인하고 결제를 진행하세요."
      />

      <section className="max-w-7xl p-4 mx-auto py-5">
        <div className="flex flex-col lg:flex-row gap-14 relative">
          <div className="flex-2">
            {cartList.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center gap-4">
                <strong>장바구니에 담은 상품이 없습니다.</strong>
                <Link
                  to="/product"
                  className="border border-(--ink) py-3 px-6 ibm w-fit hover:border-(--navy) hover:bg-(--navy) hover:text-(--bg)"
                >
                  상품보러 가기
                </Link>
              </div>
            ) : (
              <ul>
                {cartList && cartList.length > 0 && (
                  <>
                    {cartList.map((item) => (
                      <li
                        key={item.id}
                        className="py-5 border-b border-(--line) flex flex-col gap-4 lg:flex-row lg:items-center"
                      >
                        {/* 1. 제품 정보 구역 (3등분 중 하나) */}
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
                            {" "}
                            {/* 💡 글자 말줄임(ellipsis)이 작동하려면 min-w-0이 필요합니다 */}
                            <span className="text-xs text-(--muted)">
                              {item.category}
                            </span>
                            <h3 className="fraunces text-base overflow-hidden text-ellipsis whitespace-nowrap">
                              {item.title}
                            </h3>
                            <ul className="flex gap-4 mt-px">
                              <li className="text-sm text-(--navy)">
                                {item.aperture}mm
                              </li>
                              <li className="text-sm text-(--navy)">
                                f/{item.apertureRatio}
                              </li>
                            </ul>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-(--muted) border-b border-(--muted) hover:text-(--danger) hover:border-(--danger) mt-1"
                            >
                              삭제
                            </button>
                          </div>
                        </div>

                        {/* 2. 수량 수정 버튼 구역 (3등분 중 하나) */}
                        <div className="flex-1 lg:w-0 flex lg:justify-center">
                          <div className="w-full max-w-31 h-12 border border-(--line) flex items-center bg-(--bg)">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="flex-1 h-full flex justify-center items-center"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="flex-1 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex-1 h-full flex justify-center items-center"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* 3. 가격 구역 (3등분 중 하나) */}
                        <div className="border-t border-dashed border-(--line) lg:border-0 py-2 flex items-center justify-end gap-1 flex-1 lg:w-0">
                          <span className="text-(--muted) text-xs lg:hidden">
                            결제금액
                          </span>
                          <strong className="ibm font-normal text-base lg:text-lg">
                            ₩
                            {(item.price * item.quantity).toLocaleString(
                              "ko-KR",
                            )}
                          </strong>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}
          </div>

          {/* 결제정보란 */}
          <div className="sticky h-fit top-0 right-0 flex-1 border border-(--line) p-10">
            <h2 className="relative text-xs text-(--brass) before:absolute before:w-5 before:h-px before:border-b before:border-(--brass) before:left-0 before:top-[50%] pl-8 mb-3.5">
              ORDER SUMMARY
            </h2>

            <ul className="border-b border-(--line) pb-4.5">
              <li className="flex justify-between items-center py-2 text-sm font-normal">
                <span>상품금액</span>
                <strong className="font-normal text-(--ink-soft) ibm">
                  ₩{totalPrice.toLocaleString("ko-KR") || 0}
                </strong>
              </li>
              <li className="flex justify-between items-center py-2 text-sm font-normal">
                <span>배송비</span>
                <strong className="font-normal text-(--ink-soft) ibm">
                  무료
                </strong>
              </li>
              <li className="flex justify-between items-center py-2 text-sm font-normal">
                <span>할인금액</span>
                <strong className="font-normal text-(--ink-soft) ibm">
                  -₩0
                </strong>
              </li>
            </ul>

            <div className="pt-4.5 flex justify-between items-center">
              <strong>총 결제금액</strong>
              <strong>₩{totalPrice.toLocaleString("ko-KR") || 0}</strong>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCartEmpty}
              className={`py-3 px-6 text-sm text-center w-full mt-5.5 ${isCartEmpty ? "bg-(--muted) text-(--bg)" : "bg-(--brass) text-(--bg)"}`}
            >
              결제하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
