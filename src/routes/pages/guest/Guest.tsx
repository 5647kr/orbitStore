import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { fetchCheckout, fetchInQuiry } from "../../../api/fetchData";
import toast from "react-hot-toast";
import { useGuestStore } from "../../../store/useGuestStore";

interface CheckForm {
  name: string;
  call: string;
  orderId?: string;
}

export default function Guest() {
  const initForm = {
    name: "",
    call: "",
    orderId: "",
  };
  const [checkCategory, setCheckCategory] = useState("order");
  const [checkType, setChecktype] = useState("orderId");
  const [checkForm, setCheckForm] = useState<CheckForm>(initForm);
  const [checkError, setCheckError] = useState<CheckForm>(initForm);
  const [isLoading, setIsLoading] = useState(false);
  const { setGuestOrder } = useGuestStore();
  const navigate = useNavigate();

  const toggleCheckCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckCategory(e.target.value);
  };

  const toggleCheckType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecktype(e.target.value);
  };

  const handleCheckForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 주문 조회
  const submitCheckForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (checkCategory === "order") {
        const { data } = await fetchCheckout(checkForm);

        setGuestOrder(data);
        toast.success("주문 내역을 성공적으로 조회했습니다.", {
          id: "guest-order",
          duration: 1000,
        });

        setTimeout(() => {
          navigate("/guest/order");
        }, 1000);
      } else {
        const { data } = await fetchInQuiry(checkForm);

        setGuestOrder(data);
        toast.success("문의 내역을 성공적으로 조회했습니다.", {
          id: "guest-inquiry",
          duration: 1000,
        });

        setTimeout(() => {
          navigate("/guest/inquiry");
        }, 1000);
      }
    } catch (error) {
      if (checkCategory === "order") {
        toast.error("일치하는 주문 내역이 없습니다.");
      } else {
        toast.error("일치하는 문의 내역이 없습니다.");
      }
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-7xl p-5 mx-auto flex justify-center items-center">
      <div className="border border-(--line) w-full max-w-110 p-12">
        {/* 카테고리 토글 */}
        <div className="flex border-b border-(--line)">
          <label
            className={`w-full p-5 text-center cursor-pointer border-b-2 ${checkCategory === "order" ? "border-(--brass) text-(--brass) font-bold" : "border-(--bg) text-(--muted)"}`}
          >
            주문조회
            <input
              type="radio"
              className="hidden"
              onChange={toggleCheckCategory}
              checked={checkType === "order"}
              value="order"
            />
          </label>
          <label
            className={`w-full p-5 text-center cursor-pointer border-b-2 ${checkCategory === "inquiry" ? "border-(--brass) text-(--brass) font-bold" : "border-(--bg) text-(--muted)"}`}
          >
            문의내역조회
            <input
              type="radio"
              className="hidden"
              onChange={toggleCheckCategory}
              checked={checkType === "inquiry"}
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
            className={`w-full p-5 text-center cursor-pointer border-b-2 ${checkType === "orderId" ? "border-(--brass) text-(--brass) font-bold" : "border-(--bg) text-(--muted)"}`}
          >
            {checkCategory === "order" ? "주문번호로 조회" : "문의번호로 조회"}
            <input
              type="radio"
              className="hidden"
              onChange={toggleCheckType}
              checked={checkType === "orderId"}
              value="orderId"
            />
          </label>
          <label
            className={`w-full p-5 text-center cursor-pointer border-b-2 ${checkType === "name" ? "border-(--brass) text-(--brass) font-bold" : "border-(--bg) text-(--muted)"}`}
          >
            이름·연락처로 조회
            <input
              type="radio"
              className="hidden"
              onChange={toggleCheckType}
              checked={checkType === "name"}
              value="name"
            />
          </label>
        </div>

        <form className="flex flex-col gap-5 mt-5" onSubmit={submitCheckForm}>
          {checkType === "orderId" ? (
            <>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="orderId" className="text-(--ink-soft)">
                  {checkCategory === "order" ? "주문번호" : "문의번호"}
                </label>
                <input
                  type="orderId"
                  id="orderId"
                  name="orderId"
                  placeholder={
                    checkCategory === "order"
                      ? "예: ORD-1784530205960-663"
                      : "예: #9929"
                  }
                  value={checkForm.orderId}
                  onChange={handleCheckForm}
                  autoComplete="off"
                  required
                  className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name" className="text-(--ink-soft)">
                  {checkCategory === "order" ? "받는 분 이름" : "이름"}
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder={
                    checkCategory === "order"
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
                {checkCategory === "order" ? "주문 조회하기" : "문의 조회하기"}
              </button>
            </>
          ) : (
            <>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name" className="text-(--ink-soft)">
                  {checkCategory === "order" ? "받는 분 이름" : "이름"}
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder={
                    checkCategory === "order"
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
                {checkCategory === "order"
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
