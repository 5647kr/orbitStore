import { Link } from "react-router";

export default function Home() {
  return (
    <>
      {/* OFFICIAL PARTNER STORE */}
      <section className="max-w-7xl mx-auto py-20 px-10">
        {/* OFFICIAL PARTNER STORE */}
        <div className="flex gap-5 flex-col lg:flex-row pb-15">
          <div className="flex-1">
            <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
              OFFICIAL PARTNER STORE
            </p>
            <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5">
              세계의 광학 브랜드, <br />
              <span className="text-(--brass)">ORBITSTORE</span>에서 정품으로.
            </h2>
            <p className="break-keep text-(--ink-soft) mb-8">
              Sky-Watcher, Celestron, Orion, Omegon — 전 세계 아마추어 천문
              시장을 이끄는 네 개 브랜드의 정품만을 엄선했습니다. 국내 배송과
              A/S까지, ASTRUM 한 곳에서 끝냅니다.
            </p>
            <div className="flex gap-5">
              <Link
                to="/product"
                className="border border-(--brass) py-3 px-6 ibm w-fit bg-(--brass) text-(--bg)"
              >
                전체 제품 보기
              </Link>
              <Link
                to="/brand"
                className="border border-(--ink) py-3 px-6 ibm w-fit hover:border-(--navy) hover:bg-(--navy) hover:text-(--bg)"
              >
                브랜드 살펴보기
              </Link>
            </div>

            <div className="mt-10 py-5 border-t border-(--line)">
              <ul className="flex gap-5">
                <li className="flex flex-col gap-px">
                  <strong className="text-xl font-normal text-(--navy) ibm">
                    4
                  </strong>
                  <span className="text-(--muted) text-sm">
                    공식 취급 브랜드
                  </span>
                </li>
                <li className="flex flex-col gap-px">
                  <strong className="text-xl font-normal text-(--navy) ibm">
                    100%
                  </strong>
                  <span className="text-(--muted) text-sm">정품 인증 상품</span>
                </li>
                <li className="flex flex-col gap-px">
                  <strong className="text-xl font-normal text-(--navy) ibm">
                    5년
                  </strong>
                  <span className="text-(--muted) text-sm">국내 광학 보증</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop"
              alt="세계의 광학 브랜드, ORBITSTORE이 한 곳에
              모았습니다."
            />
          </div>
        </div>
      </section>

      {/* OFFICIAL BRAND */}
      <div className="bg-(--surface) flex items-center overflow-x-auto">
        <strong className="text-(--muted) text-sm font-normal p-5 border-r border-(--line)">
          OFFICIAL BRANDS
        </strong>
        <ul className="flex">
          <li className="py-5 px-10 border-r border-(--line) text-lg font-bold">
            SKY_WATCHER
          </li>
          <li className="py-5 px-10 border-r border-(--line) text-lg font-bold">
            CELESTRON
          </li>
          <li className="py-5 px-10 border-r border-(--line) text-lg font-bold">
            ORION
          </li>
          <li className="py-5 px-10 border-r border-(--line) text-lg font-bold">
            OMEGON
          </li>
        </ul>
      </div>

      {/* SHOP BY TYPE */}
      <section className="max-w-7xl mx-auto py-20 px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
          <div className=" flex-1">
            <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
              SHOP BY TYPE
            </p>
            <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5">
              목적에 맞는 광학계를 확인하세요.
            </h2>
          </div>
          <p className="break-keep text-(--ink-soft) flex-1 text-end">
            행성 관측부터 딥스카이 촬영까지, 3가지 계열로 정리했습니다.
          </p>
        </div>

        {/* 3가지 유형 */}
        <div className="mt-10">
          <ul className="flex gap-5">
            <li className="flex flex-col items-center">
              <div>
                {/* <img src="" alt="" /> */}
              </div>
              <span className="text-(--muted) text-sm">REFRACTOR</span>
              <h3 className="text-base">굴절망원경</h3>
            </li>
          </ul>
        </div>
      </section>

      {/* SIGNATURE LINE-UP */}
      <section className="bg-(--surface)">
        <div className="max-w-7xl mx-auto py-20 px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className=" flex-1">
              <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                SIGNATURE LINE-UP
              </p>
              <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5">
                지금, 가장 많이 찾는 모델
              </h2>
            </div>
            <Link
              to="/product"
              className="border border-(--ink) py-3 px-6 ibm w-fit hover:border-(--navy) hover:bg-(--navy) hover:text-(--bg)"
            >
              전체 제품 보기
            </Link>
          </div>

          {/* 제품목록 */}
          <div className="mt-10">
            <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              <li className="flex flex-col items-center">
                <div>
                  {/* <img src="" alt="" /> */}
                </div>
                <span className="text-(--muted) text-sm">REFRACTOR</span>
                <h3 className="text-base">굴절망원경</h3>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY ORBITSTORE */}
      <section className="max-w-7xl mx-auto py-20 px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <div className=" flex-1">
            <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
              WHY ORBITSTORE
            </p>
            <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5">
              브랜드 공식몰이 아닌 ORBITSTORE에서 사야 하는 이유
            </h2>
          </div>

          <div className="flex-1">
            <ul>
              <li className="py-5 border-b border-(--line) flex gap-10">
                <span className="text-(--brass) text-sm fraunces">01</span>
                <div>
                  <h4 className="text-base font-bold">정품 인증 판매</h4>
                  <p className="text-base text-(--ink-soft)">
                    각 브랜드 공식 수입사를 통해 들여온 정품만 취급합니다.
                  </p>
                </div>
              </li>
              <li className="py-5 border-b border-(--line) flex gap-10">
                <span className="text-(--brass) text-sm fraunces">02</span>
                <div>
                  <h4 className="text-base font-bold">브랜드 횡단 비교</h4>
                  <p className="text-base text-(--ink-soft)">
                    네 브랜드의 라인업을 한 화면에서 스펙 기준으로 비교할 수
                    있습니다.
                  </p>
                </div>
              </li>
              <li className="py-5 border-b border-(--line) flex gap-10">
                <span className="text-(--brass) text-sm fraunces">03</span>
                <div>
                  <h4 className="text-base font-bold">국내 A/S 원스톱</h4>
                  <p className="text-base text-(--ink-soft)">
                    브랜드마다 다른 해외 A/S 절차 없이 ASTRUM 한 곳에서
                    접수·수리합니다.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 3가지 이유 */}
        <div className="mt-10"></div>
      </section>

      {/* EVENTS */}
      <section className="bg-(--surface)">
        <div className="max-w-7xl mx-auto py-20 px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className=" flex-1">
              <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                EVENTS
              </p>
              <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5">
                이벤트
              </h2>
            </div>
            <Link
              to="/event"
              className="border border-(--ink) py-3 px-6 ibm w-fit hover:border-(--navy) hover:bg-(--navy) hover:text-(--bg)"
            >
              전체 이벤트 보기
            </Link>
          </div>

          {/* 이벤트 목록 */}
          <div className="mt-10">
            <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              <li className="flex flex-col items-center">
                <div>
                  {/* <img src="" alt="" /> */}
                </div>
                <span className="text-(--muted) text-sm">REFRACTOR</span>
                <h3 className="text-base">굴절망원경</h3>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 취급 */}
      <div className="bg-(--navy)">
        <ul className="flex">
          <li className="py-14 w-full flex flex-col items-center gap-4">
            <strong className="text-(--bg) font-bold fraunces text-4xl">
              4
            </strong>
            <span className="text-(--line) text-sm">공식 취급 브랜드</span>
          </li>
          <li className="py-14 w-full flex flex-col items-center gap-4">
            <strong className="text-(--bg) font-bold fraunces text-4xl">
              12,600+
            </strong>
            <span className="text-(--line) text-sm">누적 판매 경통 수</span>
          </li>
          <li className="py-14 w-full flex flex-col items-center gap-4">
            <strong className="text-(--bg) font-bold fraunces text-4xl">
              5년
            </strong>
            <span className="text-(--line) text-sm">광학 무상 보증</span>
          </li>
          <li className="py-14 w-full flex flex-col items-center gap-4">
            <strong className="text-(--bg) font-bold fraunces text-4xl">
              24hr
            </strong>
            <span className="text-(--line) text-sm">이내 출고</span>
          </li>
        </ul>
      </div>

      {/* READY TO OBSERVE */}
      <section className="max-w-7xl mx-auto py-15">
        <p className="relative text-sm text-(--brass) mb-3.5 text-center">
          READY TO OBSERVE
        </p>
        <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5 text-center">
          오늘 밤, 당신의 첫 별을 ORBITSTORE과 함께 찾아보세요.
        </h2>

        <div className="flex justify-center gap-2.5">
          <Link
            to="/product"
            className="border border-(--brass) bg-(--brass) py-3 px-6 ibm w-fit text-(--bg)"
          >
            전체 제품 보기
          </Link>
          <Link
            to="/inquiry"
            className="border border-(--ink) py-3 px-6 ibm w-fit hover:border-(--navy) hover:bg-(--navy) hover:text-(--bg)"
          >
            구매 상담 신청
          </Link>
        </div>
      </section>
    </>
  );
}
