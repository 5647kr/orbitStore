import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import { useEventQuery } from "../../../hook/event/useEventQuery";
import { EventDetailSkeleton } from "../../../components/Skeleton";
import { Star } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    toast.error("이벤트를 찾을 수 없습니다.");
    navigate("/event");
  }

  const { data, isLoading, error, isError } = useEventQuery(id!);

  if (isLoading || !data) return <EventDetailSkeleton />;

  if (isError && error) {
    toast.error("이벤트 정보를 불러올 수 없습니다.", { id: "event-error" });
  }

  const beforeEndDay = Math.ceil(
    (new Date(data.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  const beforeStartDay = Math.ceil(
    (new Date(data.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  // 2. 이벤트 상태 판단
  const isUpcoming = beforeStartDay > 0;
  const isEnded = beforeEndDay < 0;

  const statusText = isUpcoming ? "예정" : isEnded ? "종료" : "진행 중";

  // 3. D-Day 텍스트 및 라벨 세팅
  let dDayText = "";
  let dDayLabel = "";

  if (isUpcoming) {
    dDayText = `D - ${beforeStartDay}`;
    dDayLabel = "시작까지 남은 기간";
  } else if (isEnded) {
    dDayText = "END";
    dDayLabel = "이벤트가 종료되었습니다";
  } else {
    dDayText = beforeEndDay === 0 ? "D - Day" : `D - ${beforeEndDay}`;
    dDayLabel = "종료까지 남은 기간";
  }

  return (
    <section className="max-w-7xl p-5 mx-auto py-10">
      <div>
        {/* 네비게이션 */}
        <div className="mb-5">
          <span className="text-sm text-(--muted)">
            홈 / 이벤트 / {data.title}
          </span>
        </div>

        {/* 이미지 */}
        <div className="bg-(--surface) w-full aspect-video flex justify-center items-center lg:aspect-21/9 mb-7">
          <img
            className="w-full aspect-video lg:aspect-21/9 object-cover"
            src={data.img}
            alt={data.title}
          />
        </div>

        {/* 정보란 */}
        <div className="flex flex-col lg:flex-row lg:gap-5 relative">
          {/* 이벤트 정보란 */}
          <div className="lg:flex-3 flex flex-col gap-10">
            {/* 1. 정보 내용란 */}
            <div className="border-b border-(--line) pb-10">
              {/* 카테고리 */}
              <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                {data.category} · EVENT
              </p>
              {/* 내용 */}
              <p className="text-(--ink-soft) break-keep">{data.desc}</p>
            </div>

            {/* 2. 참여 방법 */}
            <div>
              <h3 className="flex items-center gap-2.5 text-lg font-bold mb-5">
                <span className="text-sm w-6 h-6 rounded-[50%] flex justify-center items-center border border-(--navy)">
                  1
                </span>
                참여 방법
              </h3>

              <div>
                <ul className="flex flex-col">
                  {data.participate.map(
                    (item: { id: number; step: string }) => (
                      <li
                        key={item.id}
                        className="relative pl-10 pb-10 last:pb-0 
                   /* 세로 연결선 */
                    before:absolute before:left-1.25 before:top-2.5 before:bottom-0 before:w-px before:bg-(--line) last:before:hidden 
                   /* 원형 포인트 */
                    after:absolute after:left-0 after:top-1.5 after:w-3 after:h-3 after:rounded-full after:border-2 after:border-(--brass) after:bg-(--bg)"
                      >
                        {/* STEP 라벨 */}
                        <span className="block text-xs font-semibold tracking-wider text-(--brass) mb-2.5">
                          STEP {item.id}
                        </span>

                        {/* 상세 설명 */}
                        <p className="text-base text-(--ink) break-keep leading-relaxed">
                          {item.step}
                        </p>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* 3. 혜택 안내 */}
            <div>
              <h3 className="flex items-center gap-2.5 text-lg font-bold mb-5">
                <span className="text-sm w-6 h-6 rounded-[50%] flex justify-center items-center border border-(--navy)">
                  2
                </span>
                혜택 안내
              </h3>

              <div className="border border-(--line)">
                <ul>
                  {data.rewards.map((item: { id: number; desc: string }) => (
                    <li
                      key={item.id}
                      className="p-2.5 flex items-center gap-2.5 border-b border-(--line) last:border-b-0"
                    >
                      <Star stroke="var(--brass)" strokeWidth="1" size={20} />
                      <p>{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. 유의사항 */}
            <div>
              <h3 className="flex items-center gap-2.5 text-lg font-bold mb-5">
                <span className="text-sm w-6 h-6 rounded-[50%] flex justify-center items-center border border-(--navy)">
                  3
                </span>
                유의사항
              </h3>

              <ul>
                {data.notes.map((item: { id: number; desc: string }) => (
                  <li key={item.id}>
                    <p>{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 이벤트 단축정보란 */}
          <div className="mt-5 flex-1 max-h-fit border border-(--line) p-5 lg:sticky lg:top-5 lg:right-0 lg:mt-0">
            {/* 남은 기간 */}
            <div className="py-5 flex flex-col items-center gap-2 border-b border-(--line)">
              <strong className="text-(--brass) text-3xl fraunces">
                {dDayText}
              </strong>
              <span className="text-xs text-(--muted)">{dDayLabel}</span>
            </div>

            {/* 단축정보란 */}
            <ul>
              <li className="py-5 border-b border-(--line) flex justify-between items-center">
                <span className="text-sm text-(--muted)">상태</span>
                <span className="text-sm">{statusText}</span>
              </li>
              <li className="py-5 border-b border-(--line) flex justify-between items-center">
                <span className="text-sm text-(--muted)">카테고리</span>
                <span className="text-sm">{data.category}</span>
              </li>
              <li className="py-5 border-b border-(--line) flex justify-between items-center">
                <span className="text-sm text-(--muted)">시작일</span>
                <span className="text-sm">{data.startDate}</span>
              </li>
              <li className="py-5 border-b border-(--line) flex justify-between items-center">
                <span className="text-sm text-(--muted)">종료일</span>
                <span className="text-sm">{data.endDate}</span>
              </li>
              <li className="py-5 border-b border-(--line) flex justify-between items-center">
                <span className="text-sm text-(--muted)">등록일</span>
                <span className="text-sm">
                  {new Date(data.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </li>
            </ul>

            {/* 버튼 */}
            <Link
              to="/event"
              className="border border-(--navy) text-navy p-3 text-sm text-center mt-5 block w-full hover:bg-(--navy) hover:text-(--bg)"
            >
              이벤트 목록으로
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
