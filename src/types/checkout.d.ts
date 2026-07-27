// PortOne form
interface CheckoutForm {
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

// supabase Order 테이블
interface CreateOrder {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerBasicAddress: string;
  buyerDetailAddress: string;
  buyerCall: string;
  price: number;
  items: CartList[];
  memo?: string;
  pg_tx_id: string | null;
  deliver: string;
  status: string;
}
