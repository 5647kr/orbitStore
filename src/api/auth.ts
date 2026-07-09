import { useAuthStore } from "../store/useAuthStore";
import supabase from "../supabase";

export async function signupAuth(signupForm: SignupForm) {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: signupForm.email,
    password: signupForm.password,
  });

  if (signupError) throw new Error("회원가입 실패");

  if (signupData.user) {
    const { error } = await supabase.from("profile").insert({
      id: signupData.user.id,
      name: signupForm.name,
      email: signupForm.email,
      type: "user",
      call: signupForm.call,
      address: "",
    });

    if (error) throw error;
  }
}

export async function loginAuth(loginForm: LoginForm) {
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

  if (loginError) throw new Error("로그인 실패");

  if (loginData.user) {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", loginData.user.id)
      .single();

    if (error) throw error;
    
    useAuthStore.getState().setLogin(data);
  }
}
