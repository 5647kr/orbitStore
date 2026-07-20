import { Copy, X } from "lucide-react";
import Hero from "../../../components/Hero";
import { useCompareStore } from "../../../store/useCompareStore";
import { Link } from "react-router";

export default function Compare() {
  const { compareProduct, removeProduct, clearProduct } = useCompareStore();
  return (
    <>
      <Hero
        title="제품 비교함"
        subTitle="제품 상세페이지에서 담아두신 제품의 스펙을 나란히 비교해보세요."
      />

      {/* 제품 필터 */}
      <section className="max-w-7xl p-5 mx-auto">
        {!compareProduct || compareProduct.length === 0 ? (
          <div className="border border-dashed border-(--line) py-23 px-5 flex flex-col items-center">
            <Copy strokeWidth={1} size={40} stroke="var(--muted)" />
            <p className="my-5 text-base text-(--ink-soft)">
              아직 비교함에 담긴 제품이 없습니다.
            </p>
            <Link to="/product" className="py-3 px-6 bg-(--brass) text-(--bg)">
              제품 둘러보러 가기
            </Link>
          </div>
        ) : (
          <div>
            {/* 제품 비교란 */}
            <div className="border border-(--line)">
              <ul className="flex">
                <li className="w-55 max-w-[100%/5]">
                  {/* 이미지 */}
                  <div className="p-5 w-full aspect-square">
                    <h2>이미지</h2>
                  </div>

                  <div className="p-5 border-t border-(--line)">
                    <h2 className="text-sm text-(--ink) break-keep">분류</h2>
                  </div>

                  <div className="p-5 border-t border-(--line)">
                    <h2 className="text-sm text-(--ink) break-keep">제품명</h2>
                  </div>

                  <div className="p-5 border-t border-(--line)">
                    <h2 className="text-sm text-(--ink) break-keep">가격</h2>
                  </div>

                  <div className="p-5 border-t border-(--line)">
                    <h2 className="text-sm text-(--ink) break-keep">구경</h2>
                  </div>

                  <div className="p-5 border-t border-(--line)">
                    <h2 className="text-sm text-(--ink) break-keep">
                      초점거리
                    </h2>
                  </div>

                  <div className="p-5 border-t border-(--line)">
                    <h2 className="text-sm text-(--ink) break-keep">초점비</h2>
                  </div>

                  <div className="p-5 border-t border-(--line)">
                    <h2 className="text-sm text-(--ink) break-keep">무게</h2>
                  </div>
                </li>

                {compareProduct.map((product) => (
                  <li
                    key={product.id}
                    className="w-55 max-w-[100%/5] border-l border-(--line) relative"
                  >
                    {/* 이미지 */}
                    <div className="p-5">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-full aspect-square"
                      />
                    </div>

                    {/* 분류 */}
                    <div className="p-5 border-t border-(--line)">
                      <h2 className="text-sm text-(--ink) break-keep">
                        {product.category}
                      </h2>
                    </div>

                    {/* 이름 */}
                    <div className="p-5 border-t border-(--line)">
                      <h2 className="text-sm text-(--ink) break-keep">
                        {product.title}
                      </h2>
                    </div>

                    {/* 가격 */}
                    <div className="p-5 border-t border-(--line)">
                      <p className="text-sm text-(--ink) break-keep font-normal">
                        ₩{product.price.toLocaleString("ko-KR")}
                      </p>
                    </div>

                    {/* 구경 */}
                    <div className="p-5 border-t border-(--line)">
                      <p className="text-sm text-(--ink) break-keep">
                        {product.aperture}mm
                      </p>
                    </div>

                    {/* 초점거리 */}
                    <div className="p-5 border-t border-(--line)">
                      <p className="text-sm text-(--ink) break-keep">
                        {product.focalLength}mm
                      </p>
                    </div>

                    {/* 초점비 */}
                    <div className="p-5 border-t border-(--line)">
                      <p className="text-sm text-(--ink) break-keep">
                        f/{product.apertureRatio}
                      </p>
                    </div>

                    {/* 무게 */}
                    <div className="p-5 border-t border-(--line)">
                      <p className="text-sm text-(--ink) break-keep">
                        {(product.mountWeight + product.tubeWeight).toFixed(2)}
                        kg
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeProduct(product)}
                      className="border border-(--line) hover:border-(--navy) rounded-full p-2 absolute top-4 right-4 group transition-colors"
                    >
                      <X
                        strokeWidth={1}
                        size={16}
                        className="stroke-(--line) group-hover:stroke-(--navy) transition-colors"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 하단 버튼란 */}
            <div className="flex gap-2.5 mt-10">
              {compareProduct.length !== 4 && (
                <Link
                  to="/product"
                  className="py-3 px-6 border border-(--navy) text-(--navy) bg-(--bg) hover:bg-(--navy) hover:text-(--bg)"
                >
                  제품 더 담으러 가기
                </Link>
              )}
              <button
                type="button"
                className="py-3 px-6 border border-(--danger) text-(--danger) bg-(--bg) hover:text-(--bg) hover:bg-(--danger)"
                onClick={clearProduct}
              >
                비교함 비우기
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
