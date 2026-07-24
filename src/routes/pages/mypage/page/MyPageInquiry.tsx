import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { fetchInQuiry } from "../../../../api/fetchData";
import toast from "react-hot-toast";
import { MessageCircleQuestionMark } from "lucide-react";
import { Link } from "react-router";

export default function MyPageInquiry() {
  const { user } = useAuthStore();
  const [inquiryList, setInquiryList] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [findInquiry, setFindInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const getInquiries = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        const { data } = await fetchInQuiry({
          name: user.name,
          call: user.call,
          email: user.email,
        });

        setInquiryList(data || []);
      } catch (error) {
        toast.error("문의 내역 조회에 실패하였습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getInquiries();
  }, [user?.id, user?.name, user?.call, user?.email]);

  const openModal = (id: string) => {
    if (!findInquiry) {
      const target = inquiryList.find((item) => item.id === id);
      if (target) setFindInquiry(target);
    }
  };

  const closeModal = () => {
    setFindInquiry(null);
  };

  if (isLoading) {
    return (
      <ul>
        <li className="flex gap-5 border-b border-(--line)">
          <div className="w-1/6 bg-(--surface) h-5 my-2.5" />
          <div className="w-2/6 bg-(--surface) h-5 my-2.5" />
          <div className="w-1/6 bg-(--surface) h-5 my-2.5" />
          <div className="w-1/6 bg-(--surface) h-5 my-2.5" />
          <div className="w-1/6 bg-(--surface) h-5 my-2.5" />
        </li>
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className="flex gap-5 border-b border-(--line)">
            <div className="w-1/6 bg-(--surface) h-9.5 my-5" />
            <div className="w-2/6 bg-(--surface) h-9.5 my-5" />
            <div className="w-1/6 bg-(--surface) h-9.5 my-5" />
            <div className="w-1/6 bg-(--surface) h-9.5 my-5" />
            <div className="w-1/6 bg-(--surface) h-9.5 my-5" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {!isLoading && inquiryList.length > 0 ? (
        <table className="w-full">
          <thead className="border-b border-(--line)">
            <tr>
              <th className="py-2.5 w-1/6 text-(--muted) text-sm font-normal">
                유형
              </th>
              <th className="py-2.5 w-2/6 text-(--muted) text-sm font-normal">
                제목
              </th>
              <th className="py-2.5 w-1/6 text-(--muted) text-sm font-normal">
                접수일
              </th>
              <th className="py-2.5 w-1/6 text-(--muted) text-sm font-normal">
                상태
              </th>
              <th className="py-2.5 w-1/6 text-(--muted) text-sm font-normal">
                상세 보기
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiryList.map((inquiry: Inquiry) => (
              <tr
                key={inquiry.id}
                className="border-b border-(--line) hover:bg-(--surface)"
              >
                <td className="w-1/6 text-center text-sm text-(--muted) py-5">
                  {inquiry.category}
                </td>
                <td className="w-2/6 text-center text-sm text-(--ink) font-bold py-5">
                  {inquiry.title}
                </td>
                <td className="w-1/6 text-center text-sm text-(--muted) py-5">
                  {new Date(inquiry.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td className="w-1/6 text-center text-sm text-(--muted) py-5">
                  <span
                    className={`border py-1 px-2 ${inquiry.answer ? "border-(--ok) text-(--ok)" : "border-(--brass) text-(--brass)"}`}
                  >
                    {inquiry.answer ? "답변완료" : "답변대기"}
                  </span>
                </td>
                <td className="w-1/6 text-center text-sm py-5">
                  <button
                    type="button"
                    className="border border-(--navy) py-2 px-4 hover:bg-(--navy) hover:text-(--bg)"
                    onClick={() => openModal(inquiry.id)}
                  >
                    상세 보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="border border-dashed border-(--line) py-23 px-5 flex flex-col items-center">
          <MessageCircleQuestionMark
            strokeWidth={1}
            size={40}
            stroke="var(--muted)"
          />
          <p className="my-5 text-base text-center text-(--ink-soft)">
            문의 내역이 없습니다.
          </p>
        </div>
      )}

      {/* 답변 팝업 */}
      {findInquiry && (
        <div className="fixed z-999 w-full h-full left-0 top-0 bg-[rgba(15,17,24,0.5)] flex justify-center items-center">
          <article className="bg-(--bg) border border-(--line) w-full max-w-140">
            {/* header */}
            <div className="p-5 border-b border-(--line)">
              <span
                className={`border py-1 px-2 ${findInquiry?.answer ? "border-(--ok) text-(--ok)" : "border-(--brass) text-(--brass)"}`}
              >
                {findInquiry?.answer ? "답변완료" : "답변대기"}
              </span>
              <h2 className="fraunces my-3 text-lg font-bold">
                {findInquiry?.title}
              </h2>
              <div className="flex gap-2.5 text-xs">
                <span className="text-(--muted)">{findInquiry?.category}</span>
                <span className="text-(--muted)">
                  {new Date(findInquiry?.created_at).toLocaleDateString(
                    "ko-KR",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    },
                  )}
                </span>
              </div>
            </div>
            {/* main */}
            <div className="p-5 border-b border-(--line)">
              <h3 className="text-xs text-(--muted) font-normal">문의 내용</h3>

              <div className="p-4.5 bg-(--surface) mt-2.5 mb-5 border border-(--line)">
                <p className="text-sm font-normal text-(--ink-soft)">
                  {findInquiry?.desc}
                </p>
              </div>

              <div>
                {findInquiry?.answer && (
                  <span className="text-xs text-(--muted) font-normal">
                    답변
                  </span>
                )}
                <div
                  className={`p-5 border mt-3 ${findInquiry?.answer ? "border-l-2 border-(--brass) bg-(--brass-soft)" : "border-dashed border-(--line) bg-(--surface)"}`}
                >
                  <p
                    className={`text-sm font-normal ${findInquiry?.answer ? "text-(--ink)" : "text-(--ink-soft)"}`}
                  >
                    {findInquiry?.answer ? (
                      findInquiry?.answer
                    ) : (
                      <>
                        담당자가 문의를 확인하고 있어요. 영업일 기준 1일 이내에
                        답변드리겠습니다.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* footer */}
            <div className="p-5 bg-(--surface) flex gap-2.5 items-center">
              <Link
                to="/inquiry"
                className="w-full text-center py-2 border border-(--navy) bg-(--surface) hover:bg-(--navy) hover:text-(--bg) text-sm"
              >
                추가로 문의하기
              </Link>
              <button
                type="button"
                onClick={closeModal}
                className="w-full text-center py-2 border border-(--brass) bg-(--brass) text-(--bg) text-sm"
              >
                닫기
              </button>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
