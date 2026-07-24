import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";

export default function MyPageAccount() {
  const { user } = useAuthStore();
  const initForm = { name: "", call: "", password: "" };
  const [updateForm, setUpdateForm] = useState(initForm);

  useEffect(() => {
    if (user) {
      setUpdateForm({
        name: user.name || "",
        call: user.call || "",
        password: "",
      });
    }
  }, [user]);

  const handleUpdateForm = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setUpdateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitUpdateForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(updateForm);
  };

  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={submitUpdateForm}>
      {/* 이름 */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-(--ink-soft)">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={updateForm.name}
          onChange={handleUpdateForm}
          autoComplete="off"
          className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
        />
      </div>
      {/* 이메일 */}
      <div className="w-full flex flex-col gap-2">
        <p className="text-(--ink-soft)">이메일</p>
        <div className="w-full border border-(--line) bg-(--surface) py-3 px-3.5">
          <p className="text-(--muted)">{user?.email}</p>
        </div>
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
          value={updateForm.call}
          onChange={handleUpdateForm}
          autoComplete="off"
          className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
        />
      </div>
      {/* 비밀번호 변경 */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="password" className="text-(--ink-soft)">
          비밀번호 변경
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="새 비밀번호 (변경 시에만 입력)"
          autoComplete="off"
          onChange={handleUpdateForm}
          className="w-full border border-(--line) focus:outline-(--brass) py-3 px-3.5"
        />
      </div>

      <button type="submit">저장하기</button>
    </form>
  );
}
