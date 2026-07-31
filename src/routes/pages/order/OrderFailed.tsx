import { X } from "lucide-react";
import { Link } from "react-router";

export default function OrderFailed() {
  return (
    <section className="max-w-120 mx-auto py-10 flex flex-col items-center px-4">
      {/* 타이틀 */}
      <div className="mb-8">
        <div className="bg-(--danger) w-14 h-14 rounded-full flex justify-center items-center mx-auto">
          <X size={24} stroke="var(--bg)" />
        </div>
        <h2 className="text-2xl text-center font-bold mt-6 mb-2.5">
          결제에 실패했습니다.
        </h2>
        <p className="text-sm text-(--ink-soft) text-center">
          결제가 정상적으로 처리되지 않았어요. 장바구니 내용은 그대로 보관되어
          있습니다.
        </p>
      </div>

      {/* 실패 사유 */}
      <div className="border border-(--danger) p-10 bg-(--brass-soft) w-full flex flex-col items-center gap-3 mb-5">
        <h3 className="text-sm text-(--danger)">실패 사유</h3>
        <strong className="ibm text-sm font-bold text-center">
          카드사 한도 초과로 결제가 거절되었습니다.
        </strong>
      </div>

      {/* 안내문 */}
      <div className="border border-(--line) my-7 w-full">
        <div className="p-5 bg-(--surface) border-b border-(--line)">
          <h3 className="text-sm text-(--ink-soft)">이렇게 해보세요</h3>
        </div>
        <div className="p-5 bg-(--bg)">
          <ul>
            <li className="text-(--ink) text-sm">
              - 카드 한도 및 잔액을 확인한 뒤 다시 시도해주세요.
            </li>
            <li className="text-(--ink) text-sm">
              - 해외 결제 차단 설정이 되어 있다면 카드사에 일시 해제를
              요청해주세요.
            </li>
            <li className="text-(--ink) text-sm">
              - 문제가 반복되면 고객센터(1544-0198)로 문의해주세요.
            </li>
          </ul>
        </div>
      </div>

      {/* 네비게이션 */}
      <div className="w-full flex flex-col gap-2.5 mt-8">
        <Link
          to="/checkout"
          className="py-3 px-6 bg-(--brass) text-(--bg) text-sm text-center"
        >
          다시 시도하기
        </Link>
        <Link
          to="/cart"
          className="py-3 px-6 border border-(--navy) text-(--navy) hover:bg-(--navy) hover:text-(--bg) text-sm text-center"
        >
          장바구니로 돌아가기
        </Link>
        <Link to="/" className="py-3 px-6 text-sm text-center">
          홈으로
        </Link>
      </div>
    </section>
  );
}
