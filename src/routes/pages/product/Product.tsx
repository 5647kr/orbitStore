import { useEffect, useMemo, useState } from "react";
import Hero from "../../../components/Hero";
import { fetchData } from "../../../api/fetchData";
import { ProductSkeleton } from "../../../components/Skeleton";
import { ProductItem } from "../../../components/Item";

export default function Product() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [filter, setFilter] = useState({ category: "전체", sort: "최신순" });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchData(
          "product",
          filter.category,
          filter.sort,
        );

        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filter.category, filter.sort]);

  console.log(data);

  // 필터링 처리
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilter((filter) => ({
      ...filter,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Hero
        title="전체 제품"
        subTitle={`목적과 예산에 맞는 광학계를 찾아보세요. 총 ${data.length || 0}종의 제품이 있습니다.`}
      />

      {/* 제품 필터 */}
      <section className="max-w-7xl p-5 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:items-center lg:gap-0">
          {/* 제품 카테고리 */}
          <div>
            <ul className="flex gap-2.5">
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer hover:border-(--navy) ${filter.category === "전체" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  전체
                  <input
                    type="radio"
                    value="전체"
                    name="category"
                    className="hidden"
                    checked={filter.category === "전체"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer hover:border-(--navy) ${filter.category === "굴절망원경" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  굴절 망원경
                  <input
                    type="radio"
                    value="굴절망원경"
                    name="category"
                    className="hidden"
                    checked={filter.category === "굴절망원경"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer  hover:border-(--navy) ${filter.category === "반사망원경" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  반사 망원경
                  <input
                    type="radio"
                    value="반사망원경"
                    name="category"
                    className="hidden"
                    checked={filter.category === "반사망원경"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer hover:border-(--navy) ${filter.category === "돕소니안" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  돕소니안
                  <input
                    type="radio"
                    value="돕소니안"
                    name="category"
                    className="hidden"
                    checked={filter.category === "돕소니안"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
            </ul>
          </div>
          {/* 정렬 카테고리 */}
          <div>
            <select
              name="sort"
              className="py-2 px-4 border border-(--line) focus:outline-none cursor-pointer"
              onChange={handleFilterChange}
            >
              <option value="최신순">최신순</option>
              <option value="높은가격순">높은 가격순</option>
              <option value="낮은가격순">낮은 가격순</option>
            </select>
          </div>
        </div>
      </section>

      {/* 제품 리스트 */}
      <section className="max-w-7xl p-4 mx-auto py-5">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <li key={index}>
                  <ProductSkeleton />
                </li>
              ))
            : data.map((item: Product) => (
                <li key={item.id}>
                  <ProductItem {...item} />
                </li>
              ))}
        </ul>
      </section>
    </>
  );
}
