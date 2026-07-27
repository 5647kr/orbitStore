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
  name: string;
  email: string;
  call: string;
  type: string;
}

interface Payment {
  buyer: {
    basicAddress: string;
    call: string;
    detailAddress: string;
    id: string;
    memo: string;
    name: string;
    postCode: string;
  };
  items: {
    aperture: string;
    apertureRatio: string;
    category: string;
    id: string;
    img: string;
    price: number;
    quantity: number;
    title: string;
  }[];
  totalPrice: number;
}

interface InsertPayment {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerBasicAddress: string;
  buyerDetailAddress: string;
  buyerCall: string;
  price: number;
  items: CartList[];
  memo: string;
  pg_tx_id: string | null;
  deliver: string;
  status: string;
}

interface Order extends InsertPayment {
  created_at: string;
}

interface Inquiry extends InsertInquiry {
  id: string;
  created_at: string;
  answer: string;
  inquiryId: string;
}
