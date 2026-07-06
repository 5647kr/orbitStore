import { useEffect, useState } from "react";
import Hero from "../../../components/Hero";
import { fetchData } from "../../../api/fetchData";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router";

export default function Faq() {
  const [faqList, setFaqList] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("전체");
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const { data } = await fetchData("faq", category);

        setFaqList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [category]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleActiveItem = (id: string) => {
    activeItem === id ? setActiveItem(null) : setActiveItem(id);
  };

  return (
    <>
      <Hero
        title="자주 묻는 질문"
        subTitle="주문, 배송, A/S에 대해 자주 문의주시는 내용을 모았습니다."
      />

      {/* 필터링 */}
      <section className="max-w-7xl p-5 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:items-center lg:gap-0">
          {/* 제품 카테고리 */}
          <div>
            <ul className="flex gap-2.5">
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer hover:border-(--navy) ${category === "전체" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  전체
                  <input
                    type="radio"
                    value="전체"
                    name="category"
                    className="hidden"
                    checked={category === "전체"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer hover:border-(--navy) ${category === "주문결제" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  주문 / 결제
                  <input
                    type="radio"
                    value="주문결제"
                    name="category"
                    className="hidden"
                    checked={category === "주문결제"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer  hover:border-(--navy) ${category === "배송" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  배송
                  <input
                    type="radio"
                    value="배송"
                    name="category"
                    className="hidden"
                    checked={category === "배송"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer hover:border-(--navy) ${category === "제품" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  제품
                  <input
                    type="radio"
                    value="제품"
                    name="category"
                    className="hidden"
                    checked={category === "제품"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`py-2 px-4 border rounded-[20px] cursor-pointer hover:border-(--navy) ${category === "교환환불" ? "border-(--navy) bg-(--navy) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink-soft)"}`}
                >
                  교환 / 환불
                  <input
                    type="radio"
                    value="교환환불"
                    name="category"
                    className="hidden"
                    checked={category === "교환환불"}
                    onChange={handleFilterChange}
                  />
                </label>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* faq목록 */}
      <section className="max-w-7xl p-5 mx-auto">
        <ul>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <li
                key={index}
                className="border-b border-(--line) flex justify-between items-center py-5.5"
              >
                <div className="h-6 w-100 bg-(--surface)" />
                <Plus />
              </li>
            ))
          ) : (
            <>
              {faqList.map((item: Faq, index) => (
                <li key={item.id} className="border-b border-(--line)">
                  <div>
                    <button
                      type="button"
                      onClick={() => handleActiveItem(item.id)}
                      className="w-full flex justify-between items-center py-5.5 text-left gap-5"
                    >
                      <span className="ibm">
                        Q{index + 1}. {item.title}
                      </span>
                      {activeItem === item.id ? (
                        <Minus stroke="var(--ink-soft)" />
                      ) : (
                        <Plus stroke="var(--ink-soft)" />
                      )}
                    </button>
                  </div>
                  {activeItem === item.id && (
                    <p className="ibm pb-5.5 text-(--ink-soft)">{item.desc}</p>
                  )}
                </li>
              ))}
            </>
          )}
        </ul>
      </section>

      <section className="max-w-7xl p-6 mx-auto bg-(--surface) my-20 text-center">
        <p className="ibm text-(--ink-soft) mb-4.5">
          원하는 답변을 차지 못하셨나요?
        </p>
        <Link
          to="/contact"
          className="bg-(--brass) py-3.5 px-7 text-(--bg) hover:bg-(--brass-deep) w-fit mx-auto"
        >
          1:1 문의하기
        </Link>
      </section>
    </>
  );
}
