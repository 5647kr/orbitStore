import { AlertTriangle, CheckIcon, Copy } from "lucide-react";
import { useInquiryStore } from "../../../store/useInquiryStore";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from "react-hot-toast";

export default function InquirySuccess() {
  const navigate = useNavigate();
  const { inquiry } = useInquiryStore();
  const { isLoggedIn } = useAuthStore();

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("문의번호를 복사했습니다.");
  };

  const navigateButton = () => {
    if (isLoggedIn) {
      navigate("/mypage/inquiry");
    } else {
      navigate("/guest");
    }
  };

  if (!inquiry.id) {
    toast.error("문의 내역을 찾을 수 없습니다. 문의하기로 돌아갑니다.");
    navigate("/inquiry");
  }

  return (
    <section className="max-w-120 mx-auto py-10 flex flex-col items-center px-4">
      {/* 타이틀 */}
      <div className="mb-8">
        <div className="bg-(--ok) w-14 h-14 rounded-full flex justify-center items-center mx-auto">
          <CheckIcon size={24} stroke="var(--bg)" />
        </div>
        <h2 className="text-2xl text-center font-bold mt-6 mb-2.5">
          문의가 접수되었습니다.
        </h2>
        <p className="text-sm text-(--ink-soft) text-center">
          담당자가 확인 후 영업일 기준 1일 이내로 답변드릴게요.
        </p>
      </div>

      {/* 문의 번호 */}
      <div className="border border-(--brass) p-10 bg-(--brass-soft) w-full flex flex-col items-center gap-3 mb-5">
        <h3 className="text-sm text-(--brass)">문의 번호</h3>
        <strong className="ibm text-2xl font-bold text-center">
          {inquiry.id}
        </strong>
      </div>

      {/* 복사 버튼 */}
      <button
        type="button"
        onClick={() => handleCopy(inquiry.id)}
        className="flex items-center gap-2.5 text-(--ink-soft) text-sm p-2.5"
      >
        <Copy size={16} /> 문의번호 복사하기
      </button>

      {/* 안내문 */}
      <div className="border border-dashed border-(--line) p-5 bg-(--surface) flex flex-col items-center gap-2.5 my-7">
        <AlertTriangle size={24} stroke="var(--brass)" />
        <p className="text-(--ink-soft) text-sm break-keep">
          <span className="text-(--ink) font-bold">
            비회원으로 문의하셨다면
          </span>{" "}
          이 문의번호를 꼭 저장해주세요. 로그인 없이는 문의번호(또는
          이름·연락처)로만 답변을 확인하실 수 있습니다.
        </p>
      </div>

      {/* 문의 내약 */}
      <div className="border border-(--line) w-full">
        <ul>
          <li className="flex justify-between items-center p-2.5">
            <span className="text-(--muted) text-sm">문의 유형</span>
            <p className="tet-sm font-semibold">{inquiry.category}</p>
          </li>
          <li className="flex justify-between items-center p-2.5 border-t border-(--line)">
            <span className="text-(--muted) text-sm">제목</span>
            <p className="tet-sm font-semibold">{inquiry.title}</p>
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
          문의내역으로 이동
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
