import {
  ClipboardCheck,
  LogIn,
  LogOut,
  Menu,
  ShoppingCart,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export default function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, setLogout } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const productActive = pathname.includes("product");
  const eventActive = pathname.includes("event");
  const cartActive = pathname === "/cart";
  const myPageActive = pathname.includes("mypage");
  const guestActive = pathname.includes("guest");

  return (
    <header className="relative border-b border-(--line) bg-(--bg) z-30 h-19.5">
      <div className="flex justify-between items-center w-full max-w-7xl h-19.5 px-4 mx-auto">
        <h1>
          <Link to="/" className="fraunces text-2xl font-bold text-(--navy)">
            ORBITSTORE
          </Link>
        </h1>

        <nav
          className={`absolute top-17 left-0 z-20 w-full lg:static lg:flex lg:justify-center bg-(--bg) lg:items-center ${isMenuOpen ? "block" : "hidden"}`}
        >
          <ul className="lg:flex lg:gap-px">
            <li className="border-b border-(--line) lg:border-b-0 p-5 lg:p-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2.5 px-5 text-(--navy) text-sm lg:border-b-2 border-(--bg) hover:border-(--brass) ${isActive ? "border-l-2 lg:border-b-2 lg:border-l-0 border-(--brass)" : "border-l-0 border-b-0"}`
                }
              >
                홈
              </NavLink>
            </li>
            <li className="border-b border-(--line) lg:border-b-0 p-5 lg:p-0">
              <NavLink
                to="/brand"
                className={({ isActive }) =>
                  `py-2.5 px-5 text-(--navy) text-sm lg:border-b-2 border-(--bg) hover:border-(--brass) ${isActive ? "border-l-2 lg:border-b-2 lg:border-l-0 border-(--brass)" : "border-l-0 border-b-0"}`
                }
              >
                브랜드
              </NavLink>
            </li>
            <li className="border-b border-(--line) lg:border-b-0 p-5 lg:p-0">
              <NavLink
                to="/product"
                className={`py-2.5 px-5 text-(--navy) text-sm lg:border-b-2 border-(--bg) hover:border-(--brass) ${productActive ? "border-l-2 lg:border-b-2 lg:border-l-0 border-(--brass)" : "border-b-0"}`}
              >
                제품
              </NavLink>
            </li>
            <li className="border-b border-(--line) lg:border-b-0 p-5 lg:p-0">
              <NavLink
                to="/compare"
                className={({ isActive }) =>
                  `py-2.5 px-5 text-(--navy) text-sm lg:border-b-2 border-(--bg) hover:border-(--brass) ${isActive ? "border-l-2 lg:border-b-2 lg:border-l-0 border-(--brass)" : "border-l-0 border-b-0"}`
                }
              >
                비교
              </NavLink>
            </li>
            <li className="border-b border-(--line) lg:border-b-0 p-5 lg:p-0">
              <NavLink
                to="/event"
                className={`py-2.5 px-5 text-(--navy) text-sm lg:border-b-2 border-(--bg) hover:border-(--brass) ${eventActive ? "border-l-2 lg:border-b-2 lg:border-l-0 border-(--brass)" : "border-b-0"}`}
              >
                이벤트
              </NavLink>
            </li>
            <li className="border-b border-(--line) lg:border-b-0 p-5 lg:p-0">
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `py-2.5 px-5 text-(--navy) text-sm lg:border-b-2 border-(--bg) hover:border-(--brass) ${isActive ? "border-l-2 lg:border-b-2 lg:border-l-0 border-(--brass)" : "border-l-0 border-b-0"}`
                }
              >
                FAQ
              </NavLink>
            </li>
            <li className="border-b border-(--line) lg:border-b-0 p-5 lg:p-0">
              <NavLink
                to="/inquiry"
                className={({ isActive }) =>
                  `py-2.5 px-5 text-(--navy) text-sm lg:border-b-2 border-(--bg) hover:border-(--brass) ${isActive ? "border-l-2 lg:border-b-2 lg:border-l-0 border-(--brass)" : "border-l-0 border-b-0"}`
                }
              >
                문의하기
              </NavLink>
            </li>
          </ul>
        </nav>

        <div>
          {/* pc용 버튼 */}
          <div className="flex gap-3.5">
            {isLoggedIn ? (
              <>
                {user && user.type === "admin" && (
                  <button
                    type="button"
                    className="flex border rounded-full border-(--line) w-9 h-9 justify-center items-center hover:border-(--ink)"
                  >
                    <UserRoundCog
                      stroke="var(--navy)"
                      strokeWidth="1"
                      size={16}
                    />
                  </button>
                )}
                <Link
                  to="/mypage/order"
                  className={`flex border rounded-full w-9 h-9 justify-center items-center hover:border-(--ink) ${myPageActive ? "border-(--ink)" : "border-(--line)"}`}
                >
                  <UserRound stroke="var(--navy)" strokeWidth="1" size={16} />
                </Link>
                <button
                  type="button"
                  className="flex border rounded-full border-(--line) w-9 h-9 justify-center items-center hover:border-(--ink)"
                  onClick={setLogout}
                >
                  <LogOut stroke="var(--navy)" strokeWidth="1" size={16} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex border rounded-full border-(--line) w-9 h-9 justify-center items-center hover:border-(--ink)"
                >
                  <LogIn stroke="var(--navy)" strokeWidth="1" size={16} />
                </Link>
                <Link
                  to="/guest"
                  className={`flex border rounded-full w-9 h-9 justify-center items-center hover:border-(--ink) ${guestActive ? "border-(--ink)" : "border-(--line)"}`}
                >
                  <ClipboardCheck
                    stroke="var(--navy)"
                    strokeWidth="1"
                    size={16}
                  />
                </Link>
              </>
            )}
            {/* 장바구니 */}
            <Link
              to="/cart"
              className={`border rounded-full w-9 aspect-square flex justify-center items-center hover:border-(--ink) ${cartActive ? "border-(--ink)" : "border-(--line)"}`}
            >
              <ShoppingCart stroke="var(--navy)" strokeWidth="1" size={16} />
            </Link>

            {/* 모바일용 햄버거 버튼 */}
            <button
              type="button"
              onClick={toggleMenu}
              className="flex border rounded-full border-(--line) w-9 h-9 justify-center items-center lg:hidden"
            >
              <Menu stroke="var(--navy)" strokeWidth="1" size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
