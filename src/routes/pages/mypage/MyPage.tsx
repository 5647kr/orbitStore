import { NavLink, Outlet, useLocation } from "react-router";
import Hero from "../../../components/Hero";

export default function MyPage() {
  const { pathname } = useLocation();

  let title = "대시보드";
  switch (pathname) {
    case "/mypage/order":
      title = "주문내역";
      break;
    case "/mypage/cart":
      title = "장바구니";
      break;
    case "/mypage/compare":
      title = "비교함";
      break;
    case "/mypage/inquiry":
      title = "1:1 문의내역";
      break;
    default:
      title = "대시보드";
  }
  return (
    <>
      <Hero title="마이페이지" subTitle="" />

      <section className="max-w-7xl p-5 mx-auto flex flex-col lg:flex-row gap-16 relative">
        <div className="flex-1 border border-(--line) sticky ">
          <nav>
            <div>
              <h2 className="p-5 text-xs text-(--muted) fraunces font-normal">
                MY ACTIVITY
              </h2>
              <ul>
                <li className="w-full flex">
                  <NavLink
                    to="/mypage"
                    end
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
                    }
                  >
                    대시보드
                  </NavLink>
                </li>
                <li className="w-full flex">
                  <NavLink
                    to="/mypage/order"
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
                    }
                  >
                    주문내역
                  </NavLink>
                </li>
                <li className="w-full flex">
                  <NavLink
                    to="/mypage/cart"
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
                    }
                  >
                    장바구니
                  </NavLink>
                </li>
                <li className="w-full flex">
                  <NavLink
                    to="/mypage/compare"
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
                    }
                  >
                    비교함
                  </NavLink>
                </li>
                <li className="w-full flex">
                  <NavLink
                    to="/mypage/inquiry"
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
                    }
                  >
                    1:1 문의내역
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="flex-3">
          <h2 className="text-lg font-bold mb-5">{title}</h2>
          <Outlet />
        </div>
      </section>
    </>
  );
}
