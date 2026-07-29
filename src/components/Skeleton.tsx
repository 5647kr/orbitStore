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
  return (
    <div className="border border-(--line)">
      {/* 이미지 */}
      <div className="bg-(--surface) w-full aspect-video flex justify-center items-center relative">
        <Image stroke="var(--line)" strokeWidth="1" size={100} />
        {/* 상태 */}
        <div className="border border-(--line) h-6.5 w-12 bg-(--bg) absolute top-5 left-5" />
        {/* 카테고리 */}
        <div className="border border-(--line) h-6.5 w-12 bg-(--ink-soft) absolute top-5 right-5" />
      </div>

      {/* 내용 */}
      <div className="bg-(--bg) p-5 pb-10">
        {/* 날짜 */}
        <div className="w-[50%] h-4.5 bg-(--surface) mb-2" />
        {/* 타이틀 */}
        <div className="w-full h-5.5 bg-(--surface) mb-2" />
        {/* 내용 */}
        <div className="w-full h-10 bg-(--surface) mb-3" />
        {/* 카테고리 */}
        <div className="w-7.5 h-4 bg-(--surface)" />
      </div>
    </div>
  );
}

export function EventDetailSkeleton() {
  return (
    <div className="max-w-7xl p-5 mx-auto py-10">
      {/* 네비게이션 */}
      <div className="bg-(--surface) w-50 h-6 mb-5" />

      {/* 이미지 */}
      <div className="bg-(--surface) w-full aspect-video flex justify-center items-center lg:aspect-21/9 mb-7">
        <Image stroke="var(--line)" strokeWidth="1" size={100} />
      </div>

      {/* 정보란 */}
      <div className="flex flex-col lg:flex-row lg:gap-5 relative">
        {/* 이벤트 정보란 */}
        <div className="lg:flex-3 flex flex-col gap-10">
          {/* 1. 정보 내용란 */}
          <div className="border-b border-(--line) pb-10">
            {/* 카테고리 */}
            <div className="w-40 h-5 bg-(--surface) mb-3.5" />
            {/* 내용 */}
            <div className="w-full h-20 bg-(--surface)" />
          </div>

          {/* 2. 참여 방법 */}
          <div>
            <h3 className="flex items-center gap-2.5 text-lg font-bold mb-5">
              <span className="text-sm w-6 h-6 rounded-[50%] flex justify-center items-center border border-(--navy)">
                1
              </span>
              참여 방법
            </h3>

            <div className="w-full h-50 bg-(--surface)" />
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
              <div className="p-2.5 border-b border-(--line)">
                <div className="bg-(--surface) w-full h-5" />
              </div>
              <div className="p-2.5">
                <div className="bg-(--surface) w-full h-5" />
              </div>
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

            <div className="w-full h-10 bg-(--surface)" />
          </div>
        </div>

        {/* 이벤트 단축정보란 */}
        <div className="mt-5 flex-1 max-h-fit border border-(--line) p-5 lg:sticky lg:top-5 lg:right-0 lg:mt-0">
          {/* 남은 기간 */}
          <div className="py-5 flex flex-col items-center gap-2 border-b border-(--line)">
            <div className="w-10 h-12 bg-(--surface)" />
            <div className="w-12 h-4 bg-(--surface)" />
          </div>

          {/* 단축정보란 */}
          <ul>
            <li className="py-5 border-b border-(--line) flex justify-between items-center">
              <span className="w-20 h-5 bg-(--surface)" />
              <span className="w-20 h-5 bg-(--surface)" />
            </li>
            <li className="py-5 border-b border-(--line) flex justify-between items-center">
              <span className="w-20 h-5 bg-(--surface)" />
              <span className="w-20 h-5 bg-(--surface)" />
            </li>
            <li className="py-5 border-b border-(--line) flex justify-between items-center">
              <span className="w-20 h-5 bg-(--surface)" />
              <span className="w-20 h-5 bg-(--surface)" />
            </li>
            <li className="py-5 border-b border-(--line) flex justify-between items-center">
              <span className="w-20 h-5 bg-(--surface)" />
              <span className="w-20 h-5 bg-(--surface)" />
            </li>
            <li className="py-5 border-b border-(--line) flex justify-between items-center">
              <span className="w-20 h-5 bg-(--surface)" />
              <span className="w-20 h-5 bg-(--surface)" />
            </li>
          </ul>

          {/* 버튼 */}
          <div className="border border-(--navy) text-navy p-3 text-sm text-center mt-5">
            이벤트 목록으로
          </div>
        </div>
      </div>
    </div>
  );
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
        <div className="border border-(--navy) w-32.5 h-11.5 text-base flex justify-center items-center">
          주문 상세 보기
        </div>
        <div />
      </div>
    </div>
  );
}
