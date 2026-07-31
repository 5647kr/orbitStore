import { useState } from "react";
import { Link } from "react-router";

export function ProductItem(product: Product) {
  return (
    <div className="flex flex-col">
      {/* 이미지 */}
      <div
        className="w-full aspect-square bg-(--surface) mb-4 flex justify-center items-center p-5 relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250
      
      after:absolute after:w-4.5 after:h-4.5 after:bottom-2.5 after:right-2.5 after:border-b-2 after:border-r-2 after:border-(--navy) after:transition-all after:duration-250
      
      hover:before:w-6 hover:before:h-6 hover:before:border-(--brass)
      hover:after:w-6 hover:after:h-6 hover:after:border-(--brass)
      "
      >
        <Link
          to={`/product/${product.id}`}
          target="_blank"
          className="block w-full h-full"
        >
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-full align-top"
          />
          {product.amount < 4 && (
            <span
              className={`absolute top-5 right-5 py-2 px-4 border text-xs ${product.amount <= 0 ? "border-(--muted) text-(--muted)" : "border-(--danger) text-(--danger)"}`}
            >
              {product.amount <= 0 ? "품절" : "품절 임박"}
            </span>
          )}
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <span className="ibm text-xs text-(--muted)">{product.category}</span>
        <h3>
          <Link
            to={`/product/${product.id}`}
            target="_blank"
            className="fraunces w-full text-lg text-(--ink) overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {product.title}
          </Link>
        </h3>
        <span className="text-xs text-(--ink-soft)">
          {product.aperture}mm · f/{product.apertureRatio} ·{" "}
          {product.focalLength}
        </span>
        <strong className="text-base font-semibold">
          ₩{product.price.toLocaleString("ko-KR")}
        </strong>
      </div>
      <Link
        to={`/product/${product.id}`}
        target="_blank"
        className="block mt-3.5 border border-(--navy) py-2 px-4 text-center hover:bg-(--navy) hover:text-(--bg)"
      >
        상세보기
      </Link>
    </div>
  );
}

export function EventItem(event: Event) {
  const beforeEndDay = Math.ceil(
    (new Date(event.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  const beforeStartDay = Math.ceil(
    (new Date(event.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  const isUpcoming = beforeStartDay > 0;
  const isEnded = beforeEndDay < 0;

  const statusText = isUpcoming ? "예정" : isEnded ? "종료" : "진행 중";

  return (
    <div className="group border border-(--line) hover:border-(--ink) transition-colors duration-500 ">
      {/* 이미지 */}
      <div className="w-full aspect-video relative overflow-hidden">
        <img
          src={event.img}
          alt={event.title}
          className="w-full object-cover aspect-video transition-transform duration-500 group-hover:scale-120"
        />
        {/* 상태 */}
        <div
          className={`border py-px px-2 bg-(--bg) absolute top-5 left-5 ${isUpcoming ? "border-(--brass) text-(--brass)" : isEnded ? "border-(--muted) text-(--muted)" : "border-(--ok) text-(--ok)"}`}
        >
          <span className="text-xs">{statusText}</span>
        </div>
        {/* 카테고리 */}
        <div className="border border-(--line) py-px px-2 bg-(--ink-soft) absolute top-5 right-5">
          <span className="text-xs text-(--bg)">{event.category}</span>
        </div>
      </div>

      {/* 내용 */}
      <div className="bg-(--bg) p-5 pb-10">
        {/* 날짜 */}
        <div className="text-(--muted) text-xs mb-2">
          <span>{event.startDate}</span> ~<span>{event.endDate}</span>
        </div>
        {/* 타이틀 */}
        <h2 className="fraunces text-base font-bold mb-2">{event.title}</h2>
        {/* 내용 */}
        <p className="ibm text-sm text-(--ink-soft) mb-3 line-clamp-2 break-keep">
          {event.desc}
        </p>
        {/* 카테고리 */}
        <span className="text-xs text-(--ink-soft)">{event.category}</span>
      </div>
    </div>
  );
}

export function OrderItem({ order }: { order: ReadOrder }) {
  const [showDetail, setShowDetail] = useState(false);

  const totalAmount = order.items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const toggleDetail = () => {
    setShowDetail((showDetail) => !showDetail);
  };
  return (
    <div className="border border-(--line)">
      {/* 주문번호 */}
      <div className="p-5 bg-(--surface) border-b border-(--line) flex justify-between items-center">
        <h2 className="text-(--ink-soft) text-base">{order.id}</h2>
        <p className="border border-(--brass) p-2.5 text-xs text-(--brass)">
          배송중
        </p>
      </div>

      {/* 주문 기본 정보 */}
      <div className="p-5 flex items-center gap-5">
        {/* 이미지 */}
        <div
          className="w-25 aspect-square bg-(--surface) flex justify-center items-center relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250

after:absolute after:w-4.5 after:h-4.5 after:bottom-2.5 after:right-2.5 after:border-b-2 after:border-r-2 after:border-(--navy) after:transition-all after:duration-250

hover:before:w-6 hover:before:h-6 hover:before:border-(--brass)
hover:after:w-6 hover:after:h-6 hover:after:border-(--brass)
"
        >
          <img
            src={order.items[0].img}
            alt={order.items[0].title}
            className="w-[80%] aspect-square align-top"
          />
        </div>

        {/* 기본 정보 */}
        <div className="flex-1">
          <h2 className="text-base font-bold">
            {order.items.length > 1
              ? `${order.items[0].title} 외${order.items.length - 1}건`
              : order.items[0].title}
          </h2>
          <div className="flex gap-5 my-2.5">
            <p className="text-sm">
              {new Date(order.created_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              주문
            </p>
            <p className="text-sm">수량 {totalAmount}개</p>
          </div>
          <strong className="text-sm font-bold fraunces">
            ₩{totalPrice.toLocaleString("ko-KR")}
          </strong>
        </div>

        {/* 상세보기 버튼 */}
        <button
          type="button"
          onClick={toggleDetail}
          className="border border-(--navy) py-2.5 px-5 text-(--nany) hover:bg-(--navy) hover:text-(--bg)"
        >
          {showDetail ? "주문 상세 닫기" : "주문 상세 보기"}
        </button>
      </div>

      {showDetail && (
        <div className="p-5 border-t border-dashed border-(--line) flex flex-col gap-5">
          {/* 주문 상품 */}
          <div>
            <h3 className="text-lg font-bold mb-4">주문 상품</h3>
            <ul>
              {order.items.map((item) => (
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
                        ₩{(item.price * item.quantity).toLocaleString("ko-KR")}
                      </strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* 배송지 정보 */}
          <div>
            <h3 className="text-lg font-bold mb-4">배송지 정보</h3>

            <div className="border border-(--line)">
              <ul>
                <li className="p-2.5 border-b border-(--line)">
                  <h4 className="text-sm text-(--muted)">받는 분</h4>
                  <p>{order.buyerName}</p>
                </li>
                <li className="p-2.5 border-b border-(--line)">
                  <h4 className="text-sm text-(--muted)">연락처</h4>
                  <p>{order.buyerCall}</p>
                </li>
                <li className="p-2.5 border-b border-(--line)">
                  <h4 className="text-sm text-(--muted)">배송 주소</h4>
                  <p>
                    {order.buyerBasicAddress}
                    {order.buyerDetailAddress}
                  </p>
                </li>
                <li className="p-2.5">
                  <h4 className="text-sm text-(--muted)">배송 메모</h4>
                  <p>{order.memo}</p>
                </li>
              </ul>
            </div>
          </div>
          {/* 결제정보 */}
          <div>
            <h3 className="text-lg font-bold mb-4">결제 정보</h3>

            <div className="border border-(--line) px-5">
              <ul className="flex flex-col gap-2.5 py-5 border-b border-(--line)">
                <li className="flex justify-between items-center text-(--ink-soft)">
                  <span>결제수단</span>
                  <span>카카오페이</span>
                </li>
                <li className="flex justify-between items-center text-(--ink-soft)">
                  <span>상품금액</span>
                  <span>₩{totalPrice.toLocaleString("ko-KR")}</span>
                </li>
                <li className="flex justify-between items-center text-(--ink-soft)">
                  <span>배송비</span>
                  <span>무료</span>
                </li>
              </ul>

              <div className="py-5">
                <strong className="text-lg font-bold flex justify-between items-center">
                  총 결제금액
                  <span className="fraunces">
                    ₩{totalPrice.toLocaleString("ko-KR")}
                  </span>
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function InquiryItem({ inquiry }: { inquiry: ReadInquiry }) {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail((showDetail) => !showDetail);
  };
  return (
    <div className="border border-(--line)">
      {/* 문의번호 */}
      <div className="p-5 bg-(--surface) border-b border-(--line) flex justify-between items-center">
        <h2 className="text-(--muted) text-sm">
          {inquiry.id}{" "}
          <span className="text-sm text-(--ink)">{inquiry.category}</span>
        </h2>
        <div className="flex items-center gap-2.5">
          <p className="text-sm text-(--muted)">
            {new Date(inquiry.created_at).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            접수
          </p>
          <span
            className={`border py-1 px-2 ${inquiry.answer ? "border-(--ok) text-(--ok)" : "border-(--brass) text-(--brass)"}`}
          >
            {inquiry.answer ? "답변완료" : "답변대기"}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xs text-(--muted) font-normal">문의 내용</h3>

        <div className="p-4.5 bg-(--surface) mt-2.5 mb-5 border border-(--line)">
          <p className="text-sm font-normal text-(--ink-soft)">
            {inquiry.desc}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleDetail}
          className="border border-(--navy) py-2.5 px-5 text-(--nany) hover:bg-(--navy) hover:text-(--bg)"
        >
          {showDetail ? "문의 상세 닫기" : "문의 상세 보기"}
        </button>
      </div>
      <>
        {showDetail && (
          <div className="p-5 border-t border-dashed border-(--line)">
            {inquiry.answer && (
              <span className="text-xs text-(--muted) font-normal">답변</span>
            )}
            <div
              className={`p-5 border mt-3 ${inquiry.answer ? "border-l-2 border-(--brass) bg-(--brass-soft)" : "border-dashed border-(--line) bg-(--surface)"}`}
            >
              <p
                className={`text-sm font-normal ${inquiry.answer ? "text-(--ink)" : "text-(--ink-soft)"}`}
              >
                {inquiry.answer ? (
                  inquiry.answer
                ) : (
                  <>
                    담당자가 문의를 확인하고 있어요. 영업일 기준 1일 이내에
                    답변드리겠습니다.
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
