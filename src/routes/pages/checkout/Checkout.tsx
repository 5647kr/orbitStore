import { useMemo, useState } from "react";
import Hero from "../../../components/Hero";
import { useCheckoutStore } from "../../../store/useCheckoutStore";
import AddressModal from "../../../components/AddressModal";
import type { Address } from "react-daum-postcode";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router";
import supabase from "../../../supabase";

interface CheckoutForm {
  id: string;
  name: string;
  call: string;
  postCode: string;
  basicAddress: string;
  detailAddress: string;
  memo: string;
}

export default function Checkout() {
  const { user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  if (!user || !isLoggedIn) {
    window.alert("로그인이 필요합니다. 로그인페이지로 이동합니다.");
    navigate("/login");
    return;
  }

  const initForm = {
    id: user.id,
    name: "",
    call: "",
    postCode: "",
    basicAddress: "",
    detailAddress: "",
    memo: "",
  };
  const [addressModal, setAddressModal] = useState(false);
  const { orderItem } = useCheckoutStore();
  const [checkoutForm, setCheckoutForm] = useState(initForm);
  const [checkoutError, setCheckoutError] = useState(initForm);
  const [isAgree, setIsAgree] = useState({
    agree1: false,
    agree2: false,
  });

  const handleAddressComplete = (data: Address) => {
    setCheckoutForm((checkoutForm) => ({
      ...checkoutForm,
      postCode: data.zonecode,
      basicAddress: data.address,
    }));

    setAddressModal(false);
  };

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setCheckoutForm((checkoutForm) => ({
      ...checkoutForm,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const toggleAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setIsAgree({
      agree1: checked,
      agree2: checked,
    });
  };

  const isAllAgree = isAgree.agree1 && isAgree.agree2;

  const totalPrice = useMemo(() => {
    return orderItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [orderItem]);

  const handleCheckout = async () => {
    try {
      const formError = {} as CheckoutForm;

      if (!isAgree.agree1 || !isAgree.agree2) {
        window.alert("약관에 동의해주세요.");
        return;
      }

      if (!checkoutForm.name.trim()) formError.name = "이름을 입력해주세요.";
      if (!checkoutForm.call.trim()) formError.call = "연락처를 입력해주세요.";
      if (!checkoutForm.postCode.trim())
        formError.postCode = "주소를 확인해주세요.";
      if (!checkoutForm.basicAddress.trim())
        formError.basicAddress = "주소를 확인해주세요..";
      if (!checkoutForm.detailAddress.trim())
        formError.detailAddress = "상세주소를 입력해주세요.";
      if (!checkoutForm.memo.trim()) formError.memo = "배송 요청을 남겨주세요.";

      if (Object.keys(formError).length > 0) {
        setCheckoutError(formError);
        return;
      }

      const payment = {
        buyer: checkoutForm,
        items: orderItem,
        totalPrice: totalPrice,
      };

      const { data, error } = await supabase.functions.invoke("payment-ready", {
        body: payment,
      });

      if (error) {
        console.log(error);

        if ("context" in error && error.context) {
        }

        return;
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Hero
        title="결제하기"
        subTitle="배송 정보와 결제 수단을 확인한 뒤 주문을 완료해주세요."
      />

      <section className="max-w-7xl p-4 mx-auto py-5">
        <div className="flex flex-col lg:flex-row gap-14 relative">
          {/* 인적사항란 */}
          <div className="flex-2">
            {/* 1. 배송 정보 */}
            <div>
              <h3 className="flex items-center gap-2.5 text-lg font-bold mb-5">
                <span className="text-sm w-6 h-6 rounded-[50%] flex justify-center items-center border border-(--navy)">
                  1
                </span>
                배송 정보
              </h3>

              <form className="flex flex-col gap-4">
                {/* 이름, 연락처 */}
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
                      autoComplete="off"
                      onChange={handleForm}
                      value={checkoutForm.name}
                      className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                    />
                  </div>
                  {/* call */}
                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="call"
                      className="font-normal text-(--ink-soft)"
                    >
                      연락처<span className="text-(--brass)">*</span>
                    </label>
                    <input
                      type="text"
                      id="call"
                      name="call"
                      placeholder="010-0000-0000"
                      autoComplete="off"
                      onChange={handleForm}
                      value={checkoutForm.call}
                      className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                    />
                  </div>
                </div>

                {/* 우편번호 */}
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="postCode" className="text-(--ink-soft)">
                    우편번호<span className="text-(--brass)">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="postCode"
                      name="postCode"
                      placeholder="12345"
                      readOnly
                      autoComplete="off"
                      value={checkoutForm.postCode}
                      className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                    />
                    <button
                      type="button"
                      className="border border-(--navy) py-2 px-4 text-xs text-nowrap hover:boder-(--navy) hover:bg-(--navy) hover:text-(--bg)"
                      onClick={() => setAddressModal(true)}
                    >
                      주소검색
                    </button>
                  </div>
                </div>
                {/* 기본 주소 */}
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="basicAddress" className="text-(--ink-soft)">
                    기본 주소<span className="text-(--brass)">*</span>
                  </label>
                  <input
                    type="text"
                    id="basicAddress"
                    name="basicAddress"
                    placeholder="도로명 주소"
                    autoComplete="off"
                    readOnly
                    value={checkoutForm.basicAddress}
                    className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                  />
                </div>
                {/* 상세 주소 */}
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="detailAddress" className="text-(--ink-soft)">
                    상세 주소<span className="text-(--brass)">*</span>
                  </label>
                  <input
                    type="text"
                    id="detailAddress"
                    name="detailAddress"
                    placeholder="동/호수 등 상세 주소"
                    autoComplete="off"
                    onChange={handleForm}
                    value={checkoutForm.detailAddress}
                    className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
                  />
                </div>

                {/* 배송 메모 */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="memo">배송 메모</label>
                  <select
                    id="memo"
                    name="memo"
                    autoComplete="off"
                    onChange={handleForm}
                    value={checkoutForm.memo}
                    className="border border-(--line) w-full py-3 px-3.5 text-base focus:outline-(--brass)"
                  >
                    <option value="">배송 메모를 선택해주세요.</option>
                    <option value="문앞에 놓아주세요">문앞에 놓아주세요</option>
                    <option value="부재 시 경비실에 맡겨주세요">
                      부재 시 경비실에 맡겨주세요
                    </option>
                    <option value="배송 전 연락 부탁드립니다">
                      배송 전 연락 부탁드려요
                    </option>
                  </select>
                </div>
              </form>
            </div>

            {/* 2. 주문 상품 확인 */}
            <div className="py-10 border-t border-(--line) mt-10">
              <h3 className="flex items-center gap-2.5 text-lg font-bold mb-5">
                <span className="text-sm w-6 h-6 rounded-[50%] flex justify-center items-center border border-(--navy)">
                  2
                </span>
                주문 상품 확인
              </h3>

              {/* 주문 상품 */}
              <div className="border border-(--line) p-6">
                <ul>
                  {orderItem.map((item) => (
                    <li
                      key={item.id}
                      className="py-5 border-b border-(--line) flex flex-col gap-4 lg:flex-row lg:items-center"
                    >
                      <div className="flex gap-4 lg:flex-2 lg:w-0">
                        {/* 제품 이미지 */}
                        <div
                          className="w-25 aspect-square bg-(--surface) flex justify-center items-center relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250

after:absolute after:w-4.5 after:h-4.5 after:bottom-2.5 after:right-2.5 after:border-b-2 after:border-r-2 after:border-(--navy) after:transition-all after:duration-250

hover:before:w-6 hover:before:h-6 hover:before:border-(--brass)
hover:after:w-6 hover:after:h-6 hover:after:border-(--brass)
"
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-[80%] aspect-square align-top"
                          />
                        </div>

                        {/* 제품 정보란 */}
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-(--muted)">
                            {item.category}
                          </span>
                          <h3 className="fraunces text-base overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.title}
                          </h3>
                          <ul className="flex gap-4 mt-px">
                            <li className="text-sm text-(--navy)">
                              {item.aperture}mm
                            </li>
                            <li className="text-sm text-(--navy)">
                              f/{item.apertureRatio}
                            </li>
                            <li className="text-sm text-(--navy)">
                              수량 {item.quantity}개
                            </li>
                          </ul>
                        </div>

                        <div className="flex-1 lg:w-0 flex lg:justify-end items-center">
                          <strong className="ibm font-normal text-base lg:text-lg">
                            ₩
                            {(item.price * item.quantity).toLocaleString(
                              "ko-KR",
                            )}
                          </strong>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. 약관 동의 */}
            <div className="py-10 border-t border-(--line) mt-10">
              <h3 className="flex items-center gap-2.5 text-lg font-bold mb-5">
                <span className="text-sm w-6 h-6 rounded-[50%] flex justify-center items-center border border-(--navy)">
                  3
                </span>
                약관 동의
              </h3>

              <div className="p-4.5 bg-(--surface) border border-(--line)">
                <p className="text-xs text-(--ink-soft) break-keep mb-2">
                  주문하신 상품의 결제, 배송 및 개인정보 처리를 위해 아래 내용에
                  동의해주세요. 수집된 정보는 주문 처리 및 배송 목적 이외에는
                  사용되지 않으며, 관련 법령에 따라 일정 기간 보관 후
                  파기됩니다.
                </p>
                <p className="text-xs text-(--ink-soft) break-keep ">
                  결제 완료 후 취소·환불은 마이페이지 또는 고객센터(1544-0198)를
                  통해 접수하실 수 있으며, 상품 특성에 따라 처리 기준이 다를 수
                  있습니다.
                </p>
              </div>

              <div className="flex flex-col gap-5 mt-4">
                <label className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isAllAgree}
                    onChange={toggleAllAgree}
                  />
                  전체 동의
                </label>
                <label className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="agree1"
                    onChange={toggleAgree}
                    checked={isAgree.agree1}
                  />
                  주문 내용 확인 및 결제 진행에 동의합니다.
                  <span className="text-(--brass)">*</span>
                </label>
                <label className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="agree2"
                    onChange={toggleAgree}
                    checked={isAgree.agree2}
                  />
                  개인정보 수집 및 이용에 동의합니다.
                  <span className="text-(--brass)">*</span>
                </label>
              </div>
            </div>
          </div>

          {/* 결제정보란 */}
          <div className="sticky h-fit top-5 right-0 flex-1 border border-(--line) p-10">
            <h2 className="relative text-xs text-(--brass) before:absolute before:w-5 before:h-px before:border-b before:border-(--brass) before:left-0 before:top-[50%] pl-8 mb-3.5">
              PAYMENT SUMMARY
            </h2>

            <ul className="border-b border-(--line) pb-4.5">
              <li className="flex justify-between items-center py-2 text-sm font-normal">
                <span>상품금액</span>
                <strong>₩{totalPrice.toLocaleString("ko-KR") || 0}</strong>
              </li>
              <li className="flex justify-between items-center py-2 text-sm font-normal">
                <span>배송비</span>
                <strong className="font-normal text-(--ink-soft) ibm">
                  무료
                </strong>
              </li>
              <li className="flex justify-between items-center py-2 text-sm font-normal">
                <span>할인금액</span>
                <strong className="font-normal text-(--ink-soft) ibm">
                  -₩0
                </strong>
              </li>
            </ul>

            <div className="pt-4.5 flex justify-between items-center">
              <strong>총 결제금액</strong>
              <strong>₩{totalPrice.toLocaleString("ko-KR") || 0}</strong>
            </div>

            <button
              type="submit"
              onClick={handleCheckout}
              className="py-3 px-6 text-sm text-center w-full mt-5.5 bg-(--brass) text-(--bg)"
            >
              ₩{totalPrice.toLocaleString("ko-KR") || 0} 결제하기
            </button>
          </div>
        </div>
      </section>

      {addressModal && (
        <AddressModal
          setAddressModal={setAddressModal}
          onComplete={handleAddressComplete}
        />
      )}
    </>
  );
}
