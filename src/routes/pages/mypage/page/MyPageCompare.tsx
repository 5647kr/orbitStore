import { Copy } from "lucide-react";
import { useCompareStore } from "../../../../store/useCompareStore";
import { Link } from "react-router";

export default function MyPageCompare() {
  const { compareProduct } = useCompareStore();

  return (
    <>
      {compareProduct.length > 0 ? (
        <div className="border border-(--line) p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-(--navy) text-base">
              <span className="fraunces text-lg font-bold">
                {compareProduct.length}
              </span>
              개 제품을 비교할 준비가 되었습니다.
            </h3>
            <Link
              to="/compare"
              className="text-nowrap py-2.5 px-5 bg-(--brass) text-(--bg) w-fit"
            >
              스펙 비교하기
            </Link>
          </div>

          <div className="py-5">
            <ul className="flex gap-2.5">
              {compareProduct.map((item) => (
                <li
                  key={item.id}
                  className="border border-(--line) p-5 max-w-50"
                >
                  <div
                    className="w-full aspect-square bg-(--surface) flex justify-center items-center relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250

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
                  <h4 className="py-2.5 font-bold">{item.title}</h4>
                  <p className="fraunces text-sm">
                    ₩{item.price.toLocaleString("ko-KR")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2.5 border-t border-dashed border-(--line) flex flex-col  lg:flex-row lg:items-center lg:justify-between gap-5">
            <p>
              {compareProduct.length === 4 ? (
                <>
                  최대 4개까지 담아 구경·초점거리·초점비 등 스펙을 한 화면에서
                  비교할 수 있습니다.
                </>
              ) : (
                <>
                  {4 - compareProduct.length}개를 더 담으면 스펙을 나란히 비교할
                  수 있습니다.
                </>
              )}
            </p>
            {compareProduct.length !== 4 && (
              <Link
                to="/product"
                className="text-nowrap py-2.5 px-5 bg-(--brass) text-(--bg) w-fit"
              >
                비교할 제품 더 담기
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-(--line) py-23 px-5 flex flex-col items-center">
          <Copy strokeWidth={1} size={40} stroke="var(--muted)" />
          <p className="my-5 text-base text-center text-(--ink-soft)">
            아직 비교함에 담긴 제품이 없습니다. <br />
            제품 상세페이지의 <span className="font-bold">비교함 담기</span>
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
    </>
  );
}
