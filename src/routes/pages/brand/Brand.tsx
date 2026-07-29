import { CirclePlus, Monitor, ShieldCheck, UserRoundCog } from "lucide-react";
import { Link } from "react-router";

export default function Brand() {
  return (
    <>
      <section className="max-w-7xl mx-auto p-5">
        {/* OFFICIAL PARTNER STORE */}
        <div className="flex gap-5 flex-col lg:flex-row pb-15 border-b border-(--line)">
          <div className="flex-1">
            <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
              OFFICIAL PARTNER STORE
            </p>
            <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5">
              세계의 광학 브랜드, <br />
              <span className="text-(--brass)">ORBITSTORE</span>이 한 곳에
              모았습니다.
            </h2>
            <p className="break-keep text-(--ink-soft) mb-8">
              ORBITSTORE는 직접 제조하지 않습니다. 대신 Sky-Watcher, Celestron,
              Orion, Omegon <br /> 전 세계 아마추어 천문 시장을 이끄는 네 개
              브랜드의 정품만을 엄선해, 국내 배송과 A/S까지 책임지는 공식 파트너
              스토어입니다.
            </p>
            <Link
              to="/product"
              className="border border-(--ink) py-3 px-6 ibm w-fit hover:border-(--navy) hover:bg-(--navy) hover:text-(--bg)"
            >
              전체 제품 보기
            </Link>

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

        {/* WHY ORBITSTORE */}
        <div className="py-15">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className=" flex-1">
              <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                WHY ORBITSTORE
              </p>
              <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5">
                왜 브랜드 공식몰이 아닌 <br />
                ORBITSTORE에서 사야 할까요
              </h2>
            </div>
            <p className="break-keep text-(--ink-soft) flex-1">
              여러 브랜드를 오가며 비교할 필요 없이, 한 곳에서 정품과 전문
              상담을 모두 받으세요.
            </p>
          </div>

          {/* 4가지 인증 */}
          <div className="mt-10">
            <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              <li className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-(--muted) flex justify-center items-center">
                  <ShieldCheck size={20} strokeWidth={1} stroke="var(--navy)" />
                </div>
                <h3 className="text-sm font-semibold mt-4 mb-px">
                  정품 인증 판매
                </h3>
                <p className="text-(--ink-soft) text-xs break-keep">
                  각 브랜드 공식 수입사를 통해 들여온 정품만 취급합니다.
                </p>
              </li>
              <li className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-(--muted) flex justify-center items-center">
                  <Monitor size={20} strokeWidth={1} stroke="var(--navy)" />
                </div>
                <h3 className="text-sm font-semibold mt-4 mb-px">
                  브랜드 횡단 비교
                </h3>
                <p className="text-(--ink-soft) text-xs break-keep">
                  네 브랜드의 라인업을 한 화면에서 스펙 기준으로 비교할 수
                  있습니다.
                </p>
              </li>
              <li className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-(--muted) flex justify-center items-center">
                  <CirclePlus size={20} strokeWidth={1} stroke="var(--navy)" />
                </div>
                <h3 className="text-sm font-semibold mt-4 mb-px">
                  국내 A/S 원스톱
                </h3>
                <p className="text-(--ink-soft) text-xs break-keep">
                  브랜드마다 다른 해외 A/S 절차 없이 ORBITSTORE 한 곳에서
                  접수·수리합니다.
                </p>
              </li>
              <li className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-(--muted) flex justify-center items-center">
                  <UserRoundCog
                    size={20}
                    strokeWidth={1}
                    stroke="var(--navy)"
                  />
                </div>
                <h3 className="text-sm font-semibold mt-4 mb-px">
                  전문가 상담
                </h3>
                <p className="text-(--ink-soft) text-xs break-keep">
                  목적과 예산에 맞는 브랜드·모델을 엔지니어가 직접 추천해
                  드립니다.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SHOP BY BRAND */}
      <section className="bg-(--surface)">
        <div className="max-w-7xl mx-auto py-15 px-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className=" flex-1">
              <p className="relative text-sm text-(--brass) mb-3.5 pl-12 before:w-10 before:h-px before:bg-(--brass) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                SHOP BY BRAND
              </p>
              <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5">
                네 가지 브랜드, 저마다 다른 강점
              </h2>
            </div>
            <p className="break-keep text-(--ink-soft) flex-1">
              입문부터 전문가용까지 - 목적에 맞는 브랜드를 골라보세요.
            </p>
          </div>

          {/* 4가지 인증 */}
          <div className="mt-10">
            <ul className="grid grid-cols-2 gap-5">
              <li className="border border-(--line) p-5">
                <h3 className="text-3xl font-bold mb-3">Sky-Watcher</h3>
                <p className="text-(--ink-soft) break-keep">
                  돕소니안 반사망원경과 GoTo 자동 추적 시스템의 대중화를 이끈
                  브랜드입니다. 구경 대비 합리적인 가격과 폭넓은 라인업으로
                  입문자부터 중급자까지 가장 먼저 추천되는 이름입니다.
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    대구경 돕소니안 반사망원경 라인업
                  </li>
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    스마트폰 연동 GoTo 자동 추적 마운트
                  </li>
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    구경 대비 우수한 가격 경쟁력
                  </li>
                </ul>
              </li>
              <li className="border border-(--line) p-5">
                <h3 className="text-3xl font-bold mb-3">Celestron</h3>
                <p className="text-(--ink-soft) break-keep">
                  슈미트-카세그레인(SCT) 광학계의 대명사이자, NexStar 시리즈로
                  컴퓨터 제어 관측 시대를 연 브랜드입니다. 60년 넘게 쌓아온 광학
                  설계 노하우가 전 제품에 반영되어 있습니다.
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    슈미트-카세그레인(SCT) 광학계 전문
                  </li>
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    NexStar 컴퓨터 제어 자동 탐색 시스템
                  </li>
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    딥스카이 촬영에 강한 중·고급 라인업
                  </li>
                </ul>
              </li>
              <li className="border border-(--line) p-5">
                <h3 className="text-3xl font-bold mb-3">Orion</h3>
                <p className="text-(--ink-soft) break-keep">
                  북미 아마추어 천문 커뮤니티에서 오랫동안 사랑받아온 스테디셀러
                  브랜드입니다. 초보자를 위한 구성부터 액세서리까지, 처음
                  시작하는 이들을 세심하게 배려한 제품군이 특징입니다.
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    입문자 친화적인 풀 패키지 구성
                  </li>
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    쌍안경 및 아이피스 액세서리 다양성
                  </li>
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    초보자 가이드가 함께 제공되는 매뉴얼
                  </li>
                </ul>
              </li>
              <li className="border border-(--line) p-5">
                <h3 className="text-3xl font-bold mb-3">Omegon</h3>
                <p className="text-(--ink-soft) break-keep">
                  유럽 감성의 디자인과 세심한 마감으로 알려진 브랜드입니다.
                  입문용부터 중급 촬영용까지 폭넓은 라인업을 합리적인 가격에
                  제공해, 유럽 스타일의 관측 경험을 찾는 분들에게 추천합니다.
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    유럽식 마감의 굴절·반사 광학계
                  </li>
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    입문용부터 중급 촬영용까지 폭넓은 스펙트럼
                  </li>
                  <li className="text-sm text-(--ink-soft) pl-4 relative before:w-3 before:h-px before:bg-(--ink-soft) before:absolute before:content-['']  before:block before:left-0 before:top-1/2 before:-translate-y-1/2">
                    합리적인 가격대의 정밀 액세서리
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* READY TO OBSERVE */}
      <section className="max-w-7xl mx-auto py-15">
        <p className="relative text-sm text-(--brass) mb-3.5 text-center">
          READY TO OBSERVE
        </p>
        <h2 className="text-3xl font-bold break-keep mt-3.5 mb-5.5 text-center">
          브랜드는 정했지만 모델 선택이 어려우신가요?
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
            브랜드·모델 상담 신청
          </Link>
        </div>
      </section>
    </>
  );
}
