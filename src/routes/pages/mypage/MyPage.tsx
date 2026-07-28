import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import Hero from "../../../components/Hero";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function MyPage() {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  let title = "회원 정보";
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
      title = "회원 정보";
  }

  useEffect(() => {
    if (isLoggedIn) return;

    if (!isLoggedIn) {
      toast.error("로그인이 필요합니다. 홈페이지로 이동합니다.", {
        id: "auth-logout",
        duration: 3000,
      });

      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <>
      <Hero title="마이페이지" subTitle="마이페이지에 오신것을 환영합니다." />

      <section className="max-w-7xl p-5 mx-auto flex flex-col lg:flex-row gap-16 relative">
        <div className="flex-1 border border-(--line) sticky ">
          <nav>
            <div>
              <h2 className="p-5 text-xs text-(--muted) fraunces font-normal hidden lg:block">
                MY ACTIVITY
              </h2>
              <ul className="flex flex-row lg:flex-col">
                <li className="w-full flex">
                  <NavLink
                    to="/mypage/order"
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-b-2 border-l-0 lg:border-b-0 lg:border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
                    }
                  >
                    주문내역
                  </NavLink>
                </li>
                <li className="w-full flex">
                  <NavLink
                    to="/mypage/cart"
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-b-2 border-l-0 lg:border-b-0 lg:border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
                    }
                  >
                    장바구니
                  </NavLink>
                </li>
                <li className="w-full flex">
                  <NavLink
                    to="/mypage/compare"
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-b-2 border-l-0 lg:border-b-0 lg:border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
                    }
                  >
                    비교함
                  </NavLink>
                </li>
                <li className="w-full flex">
                  <NavLink
                    to="/mypage/inquiry"
                    className={({ isActive }) =>
                      `px-5 py-5 text-sm border-b-2 border-l-0 lg:border-b-0 lg:border-l-2 w-full ${isActive ? "text-(--navy) font-bold bg-(--surface) border-(--brass)" : "text-(--ink-soft) font-normal bg-(--bg) border-(--bg)"}`
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
