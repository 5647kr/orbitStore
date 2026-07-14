import { useAuthStore } from "../store/useAuthStore";
import supabase from "../supabase";

export async function signupAuth(signupForm: SignupForm) {
  const { data, error } = await supabase.auth.signUp({
    email: signupForm.email,
    password: signupForm.password,
    options: {
      data: {
        name: signupForm.name,
        call: signupForm.call,
        type: "user",
      },
    },
  });

  if (error) throw error;

  return data;
}

export async function loginAuth(loginForm: LoginForm) {
  const { data: { user }, error } = await supabase.auth
    .signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

  if (error) throw new Error("로그인 실패");

  if (user) {
    useAuthStore.getState().setLogin({
      id: user.id,
      name: user.user_metadata.name,
      call: user.user_metadata.call,
      email: user.user_metadata.email,
      type: user.user_metadata.type,
    });
  }
}

export async function logoutAuth() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    useAuthStore.getState().setLogin({
      id: user?.user_metadata.sub,
      name: user?.user_metadata.name,
      call: user?.user_metadata.call,
      email: user?.user_metadata.email,
      type: user?.user_metadata.type,
    });
  }
}
