interface SignupForm {
  name: string;
  email: string;
  password: string;
  call: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  call: string;
  type: string;
}
