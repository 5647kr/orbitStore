interface Product {
  id: string;
  img: string;
  created_at: string;
  title: string;
  aperture: string;
  apertureRatio: string;
  focalLength: string;
  tubeWeight: number;
  mountWeight: number;
  goto: string;
  price: number;
  category: string;
  brand: string;
  amount: number;
  desc: string;
}

interface Faq {
  id: string;
  title: string;
  desc: string;
  category: string;
}

interface InsertInquiry {
  category: string;
  name: string;
  call: string;
  email: string;
  order: string;
  title: string;
  desc: string;
}

interface CartList {
  id: string;
  img: string;
  title: string;
  price: number;
  category: string;
  aperture: string;
  apertureRatio: string;
  quantity: number;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  call: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface User {
  id: string;
  created_at: string;
  name: string;
  email: string;
  call: string;
  address: string;
  type: "user" | "admin";
}
