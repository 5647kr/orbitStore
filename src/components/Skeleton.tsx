import { Image } from "lucide-react";

export function ProductSkeleton() {
  return (
    <div className="flex flex-col">
      {/* 이미지 */}
      <div
        className="w-full aspect-square bg-(--surface) mb-4 flex justify-center items-center relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250
      
      after:absolute after:w-4.5 after:h-4.5 after:bottom-2.5 after:right-2.5 after:border-b-2 after:border-r-2 after:border-(--navy) after:transition-all after:duration-250
      
      hover:before:w-6 hover:before:h-6 hover:before:border-(--brass)
      hover:after:w-6 hover:after:h-6 hover:after:border-(--brass)
      "
      >
        <Image stroke="var(--line)" strokeWidth="1" size={100} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="bg-(--line) h-3 w-11" />
        <span className="bg-(--line) h-5.5 w-30" />
        <span className="bg-(--line) h-3 w-50" />
        <span className="bg-(--line) h-6.5 w-30" />
      </div>
      <div className="bg-(--line) h-9.5 w-full mt-3.5" />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl p-5 mx-auto py-10">
      {/* 네비게이션 */}
      <div className="bg-(--surface) w-50 h-6 mb-5" />

      {/* 제품 정보란 */}
      <div className="flex gap-16">
        {/* 이미지 */}
        <div
          className="w-full max-w-125 max-h-125 aspect-square bg-(--surface) mb-4 flex justify-center items-center relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250
      
      after:absolute after:w-4.5 after:h-4.5 after:bottom-2.5 after:right-2.5 after:border-b-2 after:border-r-2 after:border-(--navy) after:transition-all after:duration-250
      
      hover:before:w-6 hover:before:h-6 hover:before:border-(--brass)
      hover:after:w-6 hover:after:h-6 hover:after:border-(--brass)
      "
        >
          <Image stroke="var(--line)" strokeWidth="1" size={100} />
        </div>

        <div className="w-full">
          {/* 카테고리 */}
          <div className="w-50 h-3.5 bg-(--surface)" />
          {/* 제품명 */}
          <div className="w-full h-10 bg-(--surface) mt-2.5" />
          {/* 가격 */}
          <div className="w-50 h-13 bg-(--surface) mt-4.5" />
          {/* 설명 */}
          <div className="w-full h-13 bg-(--surface) mt-4.5" />
          {/* 스펙 */}
          <div className="mt-8 border-t border-(--line)">
            {/* 구경 */}
            <div className="py-3.5 border-b border-(--line)">
              <div className="w-full bg-(--surface) h-5.5" />
            </div>
            {/* 초점거리 */}
            <div className="py-3.5 border-b border-(--line)">
              <div className="w-full bg-(--surface) h-5.5" />
            </div>
            {/* 초점비 */}
            <div className="py-3.5 border-b border-(--line)">
              <div className="w-full bg-(--surface) h-5.5" />
            </div>
            {/* 무게 */}
            <div className="py-3.5 border-b border-(--line)">
              <div className="w-full bg-(--surface) h-5.5" />
            </div>
            {/* goto */}
            <div className="py-3.5 border-b border-(--line)">
              <div className="w-full bg-(--surface) h-5.5" />
            </div>
          </div>
          {/* 버튼들 */}
          <div className="mt-8 flex gap-3.5">
            <div className="flex-1 h-12.5 bg-(--surface) " />
            <div className="flex-1 h-12.5 bg-(--surface) " />
            <div className="flex-1 h-12.5 bg-(--surface) " />
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventSkeleton() {
  return <div>EventSkeleton</div>;
}

export function OrderSkeleton() {
  return (
    <div className="border border-(--line)">
      <div className="h-19.75 border-b border-(--line) bg-(--surface)" />
      <div className="p-5 flex items-center">
        {/* 이미지 */}
        <div className="w-25 h-25 bg-(--surface)" />
        {/* 기본정보 */}
        <div className="flex-1 ml-5">
          {/* 제품명 */}
          <div className="w-60 h-6 bg-(--surface)" />
          <div className="w-45 h-5 bg-(--surface) my-2.5" />
          <div className="w-25 h-4.5 bg-(--surface)" />
        </div>
        {/* 버튼 */}
        <div className="border border-(--navy) w-32.5 h-11.5 text-base flex justify-center items-center">주문 상세 보기</div>
        <div />
      </div>
    </div>
  );
}
