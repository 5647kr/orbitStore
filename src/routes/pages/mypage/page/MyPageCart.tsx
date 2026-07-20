import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../../store/useCartStore";
import { Link } from "react-router";

export default function MyPageCart() {
  const { cartList, removeItem } = useCartStore();
  console.log(cartList);
  return (
    <div>
      {cartList.length > 0 ? (
        <div>
          <ul>
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

                {/* 3. 가격 구역 (3등분 중 하나) */}
                <div className="border-t border-dashed border-(--line) lg:border-0 py-2 flex items-center justify-end gap-1 flex-1 lg:w-0">
                  <span className="text-(--muted) text-xs lg:hidden">
                    결제금액
                  </span>
                  <strong className="ibm font-normal text-base lg:text-lg">
                    ₩{(item.price * item.quantity).toLocaleString("ko-KR")}
                  </strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="border border-dashed border-(--line) py-23 px-5 flex flex-col items-center">
          <ShoppingCart strokeWidth={1} size={40} stroke="var(--muted)" />
          <p className="my-6 text-base text-center text-(--ink-soft)">
            아직 장바구니에 담긴 제품이 없습니다. <br />
            제품 상세페이지의 <span className="font-bold">장바구니</span>
            버튼으로 담아보세요.
          </p>
          <Link
            to="/product"
            className="py-3 px-6 border border-(--navy) text-(--navy) hover:bg-(--navy) hover:text-(--bg)"
          >
            제품 둘러보기
          </Link>
        </div>
      )}
    </div>
  );
}
