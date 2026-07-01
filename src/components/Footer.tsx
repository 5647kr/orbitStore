import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t border-(--line) bg-(--surface)">
      <div className="max-w-7xl py-5 px-4 mx-auto flex flex-col lg:flex-row">
        <div className="w-full py-5 px-4">
          <h2 className="fraunces text-2xl font-bold text-(--navy) mb-3.5">
            ORBITSTORE
          </h2>
          <p className="ibm text-(--ink-soft) break-keep">
            정밀 광학의 기준. 1998년부터 별을 관측하는 이들의 곁에서, 오차 없는
            렌즈와 거울을 만듭니다.
          </p>
        </div>

        {/* SHOP */}
        <div className="w-full py-5 px-4">
          <h3 className="text-(--muted) text-xs font-semibold mb-4">SHOP</h3>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link to="/product" className="text-(--ink-soft) text-sm">
                전체 제품
              </Link>
            </li>
            <li>
              <Link to="/product" className="text-(--ink-soft) text-sm">
                굴절 망원경
              </Link>
            </li>
            <li>
              <Link to="/product" className="text-(--ink-soft) text-sm">
                반사 망원경
              </Link>
            </li>
            <li>
              <Link to="/product" className="text-(--ink-soft) text-sm">
                돕소니안
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="w-full py-5 px-4">
          <h3 className="text-(--muted) text-xs font-semibold mb-4">COMPANY</h3>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link to="/brand" className="text-(--ink-soft) text-sm">
                브랜드
              </Link>
            </li>
            <li>
              <Link to="/event" className="text-(--ink-soft) text-sm">
                이벤트
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-(--ink-soft) text-sm">
                자주 묻는 질문
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-(--ink-soft) text-sm">
                1:1 문의
              </Link>
            </li>
          </ul>
        </div>

        {/* 고객센터 */}
        <div className="w-full py-5 px-4">
          <h3 className="text-(--muted) text-xs font-semibold mb-4">
            고객센터
          </h3>
          <ul className="flex flex-col gap-2.5">
            <li className="text-(--ink-soft) text-sm">1544-0198</li>
            <li className="text-(--ink-soft) text-sm">
              운영 시간: 평일 09:00~18:00
            </li>
            <li className="text-(--ink-soft) text-sm">토, 일, 공휴일 휴무</li>
            <li className="text-(--ink-soft) text-sm">
              support@orbitstore.com
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl p-4 mx-auto flex border-t border-(--line) justify-between">
        <p className="text-(--muted) text-xs">
          © 2023 ORBITSTORE. All rights reserved.
        </p>
        <p className="text-(--muted) text-xs">
          사업자등록번호 214-88-00000 대표:은하단
        </p>
      </div>
    </footer>
  );
}
