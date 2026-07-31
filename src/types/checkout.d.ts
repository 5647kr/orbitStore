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
  items: CheckoutItem[];
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
  items: CheckoutItem[];
  memo?: string;
  pg_tx_id: string | null;
  deliver: string;
  status: string;
}

interface ReadOrder extends CreateOrder {
  created_at: string;
}

interface CheckoutItem {
  id: string;
  img: string;
  title: string;
  price: number;
  category: string;
  aperture: string;
  apertureRatio: string;
  quantity: number;
}
