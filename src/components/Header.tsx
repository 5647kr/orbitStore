import {
  LogOut,
  Menu,
  ShoppingCart,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, setLogout } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleUserMenu = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      window.alert("로그인이 필요합니다. 로그인페이지로 이동합니다.");
      navigate("/login");
    }
  };

  const productActive = pathname.includes("product");
  const eventActive = pathname.includes("event");
  const cartActive = pathname.includes("cart");

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
            <button
              type="button"
              className="flex border rounded-full border-(--line) w-9 h-9 justify-center items-center"
            >
              <UserRound stroke="var(--navy)" strokeWidth="1" size={16} />
            </button>
            {user && user.type === "admin" && (
              <button
                type="button"
                className="flex border rounded-full border-(--line) w-9 h-9 justify-center items-center"
              >
                <UserRoundCog stroke="var(--navy)" strokeWidth="1" size={16} />
              </button>
            )}
            <button
              type="button"
              className={`flex border rounded-full  w-9 h-9 justify-center items-center hover:border-(--ink) ${cartActive ? "border-(--ink)" : "border-(--line)"}`}
              onClick={handleUserMenu}
            >
              <ShoppingCart stroke="var(--navy)" strokeWidth="1" size={16} />
            </button>
            {/* 로그아웃 버튼 */}
            {isLoggedIn && (
              <button
                type="button"
                className="flex border rounded-full border-(--line) w-9 h-9 justify-center items-center hover:border-(--ink)"
                onClick={setLogout}
              >
                <LogOut stroke="var(--navy)" strokeWidth="1" size={16} />
              </button>
            )}

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
