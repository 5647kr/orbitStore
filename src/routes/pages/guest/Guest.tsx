import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  useGuestInquiryQuery,
  useGuestOrderQuery,
} from "../../../hook/guest/useGuestQuery";

export default function Guest() {
  const navigate = useNavigate();
  const initForm = {
    name: "",
    call: "",
    id: "",
  };
  const [check, setCheck] = useState({ category: "order", type: "id" });
  const [checkForm, setCheckForm] = useState<ReadGuest>(initForm);

  const [form, setForm] = useState<ReadGuest | null>(null);

  const orderQuery = useGuestOrderQuery(
    check.category === "order" ? form : null,
  );
  const inquiryQuery = useGuestInquiryQuery(
    check.category === "inquiry" ? form : null,
  );

  const activeQuery = check.category === "order" ? orderQuery : inquiryQuery;

  useEffect(() => {
    if (form && activeQuery.isSuccess && activeQuery.data) {
      const isOrder = check.category === "order";
      toast.success(
        `${isOrder ? "주문" : "문의"} 내역을 성공적으로 조회했습니다.`,
      );

      navigate(isOrder ? "/guest/order" : "/guest/inquiry", {
        state: { form },
      });
    }

    if (activeQuery.isError) {
      toast.error("일치하는 내역이 없습니다.");
    }
  }, [activeQuery.isSuccess, activeQuery.isError, activeQuery.data]);

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitCheckForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (check.type === "id") {
      if (checkForm.id?.trim() === "") {
        check.category === "order"
          ? toast.error("주문번호를 입력해주세요.")
          : toast.error("문의번호를 입력해주세요.");
        return;
      }
    }

    if (checkForm.name.trim() === "") {
      toast.error("이름을 입력해주세요.");
      return;
    }

    if (checkForm.call.trim() === "") {
      toast.error("연락처을 입력해주세요.");
      return;
    }

    setForm({ ...checkForm });

    console.log(check, form);
  };

  return (
    <section className="max-w-7xl p-5 mx-auto flex justify-center items-center">
      <div className="border border-(--line) w-full max-w-110 p-12">
        {/* 카테고리 토글 */}
        <div className="flex border-b border-(--line)">
          <label
            className={`w-full p-5 text-center cursor-pointer border-b-2 ${check.category === "order" ? "border-(--brass) text-(--brass) font-bold" : "border-(--bg) text-(--muted)"}`}
          >
            주문조회
            <input
              type="radio"
              className="hidden"
              name="category"
              onChange={handleChangeCheck}
              checked={check.category === "order"}
              value="order"
            />
          </label>
          <label
            className={`w-full p-5 text-center cursor-pointer border-b-2 ${check.category === "inquiry" ? "border-(--brass) text-(--brass) font-bold" : "border-(--bg) text-(--muted)"}`}
          >
            문의내역조회
            <input
              type="radio"
              className="hidden"
              name="category"
              onChange={handleChangeCheck}
              checked={check.category === "inquiry"}
              value="inquiry"
            />
          </label>
        </div>

        <div className="p-5 border border-(--line) bg-(--surface) my-5">
          <p className="text-sm font-normal text-(--ink-soft)">
            회원가입 없이 주문하신 경우, 주문 시 입력하신 정보로 주문 내역을
            확인하실 수 있습니다.
          </p>
        </div>

        {/* 타입 토글 */}
        <div className="flex border-b border-(--line)">
          <label
            className={`w-full p-5 text-center cursor-pointer border-b-2 ${check.type === "id" ? "border-(--brass) text-(--brass) font-bold" : "border-(--bg) text-(--muted)"}`}
          >
            {check.category === "order" ? "주문번호로 조회" : "문의번호로 조회"}
            <input
              type="radio"
              className="hidden"
              name="type"
              onChange={handleChangeCheck}
              checked={check.type === "id"}
              value="id"
            />
          </label>
          <label
            className={`w-full p-5 text-center cursor-pointer border-b-2 ${check.type === "name" ? "border-(--brass) text-(--brass) font-bold" : "border-(--bg) text-(--muted)"}`}
          >
            이름·연락처로 조회
            <input
              type="radio"
              className="hidden"
              name="type"
              onChange={handleChangeCheck}
              checked={check.type === "name"}
              value="name"
            />
          </label>
        </div>

        <form className="flex flex-col gap-5 mt-5" onSubmit={submitCheckForm}>
          {check.type === "id" ? (
            <>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="id" className="text-(--ink-soft)">
                  {check.category === "order" ? "주문번호" : "문의번호"}
                </label>
                <input
                  type="id"
                  id="id"
                  name="id"
                  placeholder={
                    check.category === "order"
                      ? "예: ORD-1784530205960-663"
                      : "예: INQ-1784530205960-549"
                  }
                  value={checkForm.id}
                  onChange={handleCheckForm}
                  autoComplete="off"
                  required
                  className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name" className="text-(--ink-soft)">
                  {check.category === "order" ? "받는 분 이름" : "이름"}
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder={
                    check.category === "order"
                      ? "주문 시 입력한 이름"
                      : "문의 시 입력한 이름"
                  }
                  value={checkForm.name}
                  onChange={handleCheckForm}
                  autoComplete="off"
                  required
                  className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label htmlFor="call" className="text-(--ink-soft)">
                  휴대폰번호
                </label>
                <input
                  type="call"
                  id="call"
                  name="call"
                  placeholder="010-0000-0000"
                  value={checkForm.call}
                  onChange={handleCheckForm}
                  autoComplete="off"
                  required
                  className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                />
              </div>

              <button
                type="submit"
                className="w-full text-(--bg) bg-(--brass) py-3 px-6 mt-5 hover:bg-(--brass-deep)"
              >
                {check.category === "order" ? "주문 조회하기" : "문의 조회하기"}
              </button>
            </>
          ) : (
            <>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name" className="text-(--ink-soft)">
                  {check.category === "order" ? "받는 분 이름" : "이름"}
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder={
                    check.category === "order"
                      ? "주문 시 입력한 이름"
                      : "문의 시 입력한 이름"
                  }
                  value={checkForm.name}
                  onChange={handleCheckForm}
                  autoComplete="off"
                  required
                  className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label htmlFor="call" className="text-(--ink-soft)">
                  휴대폰번호
                </label>
                <input
                  type="call"
                  id="call"
                  name="call"
                  placeholder="010-0000-0000"
                  value={checkForm.call}
                  onChange={handleCheckForm}
                  autoComplete="off"
                  required
                  className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                />
              </div>

              <button
                type="submit"
                className="w-full text-(--bg) bg-(--brass) py-3 px-6 mt-5 hover:bg-(--brass-deep)"
              >
                {check.category === "order"
                  ? "전체 주문 조회하기"
                  : "전체 문의 조회하기"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
