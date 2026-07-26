import Hero from "../../../components/Hero";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import useInquiryMutation from "../../../hook/inquiry/useInquiryMutation";
import { useInquiryStore } from "../../../store/useInquiryStore";

export default function Inquiry() {
  const initForm = {
    category: "",
    name: "",
    call: "",
    email: "",
    orderId: "",
    title: "",
    desc: "",
  };
  const [form, setForm] = useState(initForm);
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();
  const { mutate: createInquiry, isPending: isCreating } = useInquiryMutation();
  const { setInquiry } = useInquiryStore();

  const handleForm = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const ToggleAgree = () => {
    setIsAgree((isAgree) => !isAgree);
  };

  const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.category.trim()) {
      toast.error("문의 유형을 선택해주세요.");
      return;
    }

    if (!form.name.trim()) {
      toast.error("이름을 입력해주세요.");
      return;
    }

    if (!form.call.trim()) {
      toast.error("연락처를 입력해주세요.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("이메일을 입력해주세요.");
      return;
    }

    if (!form.title.trim()) {
      toast.error("문의 제목을 입력해주세요.");
      return;
    }

    if (!form.desc.trim()) {
      toast.error("문의 내용을 입력해주세요.");
      return;
    }

    if (!isAgree) {
      toast.error("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    // 문의ID 생성
    const inquiryId = `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    //
    const inquiryForm = { id: inquiryId, ...form };

    createInquiry(inquiryForm, {
      onSuccess: () => {
        navigate("/inquiry/success");
        setInquiry(inquiryId, form.category, form.title);
      },
      onError: () => {
        navigate("/inquiry/failed");
      },
      onSettled: () => {
        setForm(initForm);
        setIsAgree(false);
      },
    });
  };
  return (
    <>
      <Hero
        title="1:1 문의"
        subTitle="제품, 주문, A/S 등 궁금하신 점을 남겨주시면 영업일 기준 1일 이내 답변드립니다."
      />

      <section className="max-w-7xl p-5 mx-auto flex flex-col lg:flex-row gap-16">
        <div className="w-full border border-(--line) p-10">
          <h2 className="relative text-xs text-(--brass) before:absolute before:w-5 before:h-px before:border-b before:border-(--brass) before:left-0 before:top-[50%] pl-8 mb-3.5">
            INQUIRY FORM
          </h2>

          <form onSubmit={submitForm} className="flex flex-col gap-4">
            {/* 문의 유형 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="category">
                문의 유형<span className="text-(--brass)">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleForm}
                autoComplete="off"
                disabled={isCreating}
                className="border border-(--line) w-full py-3 px-3.5 text-base focus:outline-(--brass)"
                required
              >
                <option value="">선택해주세요.</option>
                <option value="상품문의">상품문의</option>
                <option value="주문배송문의">주문 배송문의</option>
                <option value="as문의">A/S 문의</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* name */}
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name" className="text-(--ink-soft)">
                  이름<span className="text-(--brass)">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="홍길동"
                  onChange={handleForm}
                  autoComplete="off"
                  disabled={isCreating}
                  value={form.name}
                  className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                />
              </div>
              {/* call */}
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="call" className="font-normal text-(--ink-soft)">
                  연락처<span className="text-(--brass)">*</span>
                </label>
                <input
                  type="text"
                  id="call"
                  name="call"
                  placeholder="010-0000-0000"
                  onChange={handleForm}
                  autoComplete="off"
                  value={form.call}
                  disabled={isCreating}
                  className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                />
              </div>
            </div>
            {/* email */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email" className="text-(--ink-soft)">
                이메일<span className="text-(--brass)">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@orbitstore.com"
                onChange={handleForm}
                autoComplete="off"
                value={form.email}
                disabled={isCreating}
                className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
              />
            </div>
            {/* order */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="orderId" className="text-(--ink-soft)">
                주문번호<span className="text-(--muted)"> (해당 시)</span>
              </label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                placeholder="예: ORD-1784530205960-663"
                onChange={handleForm}
                autoComplete="off"
                value={form.orderId}
                disabled={isCreating}
                className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
              />
            </div>
            {/* title */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="title" className="text-(--ink-soft)">
                제목<span className="text-(--brass)">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="문의 제목을 입력해주세요."
                onChange={handleForm}
                autoComplete="off"
                value={form.title}
                disabled={isCreating}
                className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
              />
            </div>
            {/* desc */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="desc" className="text-(--ink-soft)">
                문의 내용<span className="text-(--brass)">*</span>
              </label>
              <textarea
                id="desc"
                name="desc"
                placeholder="문의 내용을 상세히 작성해주세요."
                onChange={handleForm}
                autoComplete="off"
                value={form.desc}
                disabled={isCreating}
                className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5 min-h-35 resize-none"
              />
            </div>

            <div className="w-full flex gap-2">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={isAgree}
                disabled={isCreating}
                onChange={ToggleAgree}
              />
              <label htmlFor="agree" className="text-(--ink-soft) text-xs">
                개인정보 수집 및 이용에 동의합니다.
                <span className="text-(--brass)">*</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="w-full text-(--bg) bg-(--brass) py-3 px-6"
            >
              문의 접수하기
            </button>
          </form>
        </div>

        <div className="w-full p-10">
          <h2 className="relative text-xs text-(--brass) before:absolute before:w-5 before:h-px before:border-b before:border-(--brass) before:left-0 before:top-[50%] pl-8 mb-3.5">
            BEFORE YOU ASK
          </h2>

          <div>
            <h3 className="ibm text-2xl font-bold">먼저 FAQ를 확인해보세요</h3>
            <p className="font-light text-(--ink-soft) mt-3 mb-4">
              배송, 결제, A/S 관련 질문의 상당수는 FAQ 페이지에서 바로 확인하실
              수 있습니다.
            </p>
            <Link
              to="/faq"
              className="border border-(--ink) py-3 px-6 ibm w-fit hover:border-(--navy) hover:bg-(--navy) hover:text-(--bg)"
            >
              FAQ 바로가기
            </Link>
          </div>

          <div className="py-7 my-7 border-t border-(--line)">
            <h3 className="ibm text-4.5 font-bold">고객센터 안내</h3>

            <ul className="mt-2">
              <li className="py-3.5 border-b border-(--line) ibm text-sm flex justify-between items-center">
                <span>전화상담</span>
                <strong className="font-normal">1544-0198</strong>
              </li>
              <li className="py-3.5 border-b border-(--line) ibm text-sm flex justify-between items-center">
                <span>운영시간</span>
                <strong className="font-normal">
                  평일 09:00–18:00 (주말·공휴일 휴무)
                </strong>
              </li>
              <li className="py-3.5 border-b border-(--line) ibm text-sm flex justify-between items-center">
                <span>이메일</span>
                <strong className="font-normal">support@orbitstore.com</strong>
              </li>
              <li className="py-3.5 border-b border-(--line) ibm text-sm flex justify-between items-center">
                <span>평균 답변 시간</span>
                <strong className="font-normal">영업일 기준 1일 이내</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
