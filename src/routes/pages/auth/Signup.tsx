import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { signupAuth } from "../../../api/auth";

export default function Signup() {
  const initForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    call: "",
  };
  const [signupForm, setSignupForm] = useState(initForm);
  const [signupError, setSignupError] = useState(initForm);
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((signupForm) => ({
      ...signupForm,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (signupForm.password && signupForm.confirmPassword) {
      if (signupForm.password !== signupForm.confirmPassword) {
        setSignupError((signupError) => ({
          ...signupError,
          confirmPassword: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setSignupError((signupError) => ({
          ...signupError,
          confirmPassword: "",
        }));
      }
    }
  }, [signupForm.confirmPassword]);

  const ToggleAgree = () => {
    setIsAgree((isAgree) => !isAgree);
  };

  const submitSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formError = {} as SignupForm;

      if (!isAgree) {
        window.alert("개인정보 수집 및 이용에 동의해주세요.");
        return;
      }

      if (!signupForm.name.trim()) formError.name = "이름을 입력해주세요.";
      if (!signupForm.email.trim()) formError.email = "이메일을 입력해주세요.";
      if (!signupForm.password.trim())
        formError.password = "이메일을 입력해주세요.";
      if (!signupForm.confirmPassword.trim())
        formError.confirmPassword = "비밀번호를 다시 한번 더 확인해주세요.";
      if (!signupForm.call.trim()) formError.call = "연락처를 입력해주세요.";

      if (Object.keys(formError).length > 0) {
        setSignupError(formError);
        return;
      }
      await signupAuth(signupForm);

      window.alert("회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl p-5 mx-auto flex justify-center items-center">
      <div className="border border-(--line) w-full max-w-110 p-12">
        <h2 className="fraunces text-2xl font-bold text-(--navy) text-center">
          ORBITSTORE
        </h2>

        <form
          onSubmit={(e) => submitSignup(e)}
          className="flex flex-col gap-5 mt-5"
        >
          {/* 이름 */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="name" className="text-(--ink-soft)">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="홍길동"
              value={signupForm.name}
              onChange={handleForm}
              autoComplete="off"
              required
              className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
            />
            {signupError.name && (
              <strong className="text-(--danger) text-xs">
                * {signupError.name}
              </strong>
            )}
          </div>

          {/* 이메일 */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-(--ink-soft)">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@orbitstore.com"
              value={signupForm.email}
              onChange={handleForm}
              autoComplete="off"
              required
              className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
            />
            {signupError.email && (
              <strong className="text-(--danger) text-xs">
                * {signupError.email}
              </strong>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="text-(--ink-soft)">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={signupForm.password}
              onChange={handleForm}
              autoComplete="off"
              required
              className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
            />
            {signupError.password && (
              <strong className="text-(--danger) text-xs">
                * {signupError.password}
              </strong>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-(--ink-soft)">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="비밀번호를 입력하세요"
              value={signupForm.confirmPassword}
              onChange={handleForm}
              autoComplete="off"
              required
              className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
            />
            {signupError.confirmPassword && (
              <strong className="text-(--danger) text-xs">
                * {signupError.confirmPassword}
              </strong>
            )}
          </div>

          {/* 연락처 */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="call" className="text-(--ink-soft)">
              연락처
            </label>
            <input
              type="text"
              id="call"
              name="call"
              placeholder="010-0000-0000"
              value={signupForm.call}
              onChange={handleForm}
              autoComplete="off"
              required
              className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
            />
            {signupError.call && (
              <strong className="text-(--danger) text-xs">
                * {signupError.call}
              </strong>
            )}
          </div>

          {/* 동의란 */}
          <div className="w-full flex gap-2">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={isAgree}
              onChange={ToggleAgree}
            />
            <label htmlFor="agree" className="text-(--ink-soft) text-xs">
              이용약관 및 개인정보처리방침에 동의합니다.
              <span className="text-(--brass)">*</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-(--bg) bg-(--brass) py-3 px-6 mt-5 hover:bg-(--brass-deep)"
          >
            회원가입
          </button>
        </form>

        <hr className="my-10 text-(--line)" />

        <span className="flex justify-center items-center gap-2 text-xs text-(--ink-soft)">
          이미 계정이 있으신가요?
          <Link to="/login" className="text-sm text-(--ink)">
            로그인
          </Link>
        </span>
      </div>
    </section>
  );
}
