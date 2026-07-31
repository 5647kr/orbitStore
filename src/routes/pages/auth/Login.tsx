import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { loginAuth } from "../../../api/auth/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((loginForm) => ({
      ...loginForm,
      [e.target.name]: e.target.value,
    }));
  };

  const submitLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginAuth(loginForm);

      navigate(redirectUrl, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="max-w-7xl p-5 mx-auto flex justify-center items-center">
      <div className="border border-(--line) w-full max-w-110 p-12">
        <h2 className="fraunces text-2xl font-bold text-(--navy) text-center">
          ORBITSTORE
        </h2>

        <form onSubmit={submitLogin} className="flex flex-col gap-5 mt-5">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-(--ink-soft)">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@orbitstore.com"
              value={loginForm.email}
              onChange={handleForm}
              autoComplete="off"
              required
              className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="text-(--ink-soft)">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={loginForm.password}
              onChange={handleForm}
              autoComplete="off"
              required
              className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
            />
          </div>

          <button
            type="submit"
            className="w-full text-(--bg) bg-(--brass) py-3 px-6 mt-5 hover:bg-(--brass-deep)"
          >
            로그인
          </button>
        </form>

        <hr className="my-10 text-(--line)" />

        <span className="flex justify-center items-center gap-2 text-xs text-(--ink-soft)">
          아직 계정이 없으신가요?
          <Link to="/signup" className="text-sm text-(--ink)">
            회원가입
          </Link>
        </span>
      </div>
    </section>
  );
}
