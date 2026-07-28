import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layout/Default";

import Home from "./routes/pages/home/Home";

import Brand from "./routes/pages/brand/Brand";

import Product from "./routes/pages/product/Product";
import ProductDetail from "./routes/pages/product/ProductDetail";

import Compare from "./routes/pages/compare/Compare";

import Event from "./routes/pages/event/Event";
import EventDetail from "./routes/pages/event/Event.Detail";

import Faq from "./routes/pages/faq/Faq";

import Inquiry from "./routes/pages/inquiry/Inquiry";
import InquirySuccess from "./routes/pages/inquiry/InquirySuccess";

import Cart from "./routes/pages/cart/Cart";

import Checkout from "./routes/pages/checkout/Checkout";
import OrderSuccess from "./routes/pages/order/OrderSuccess";
import OrderFailed from "./routes/pages/order/OrderFailed";

import Guest from "./routes/pages/guest/Guest";
import GuestOrder from "./routes/pages/guest/GuestOrder";
import GuestInquiry from "./routes/pages/guest/GuestInquiry";

import MyPage from "./routes/pages/mypage/MyPage";
import MyPageOrder from "./routes/pages/mypage/page/MyPageOrder";
import MyPageCart from "./routes/pages/mypage/page/MyPageCart";
import MyPageCompare from "./routes/pages/mypage/page/MyPageCompare";
import MyPageInqury from "./routes/pages/mypage/page/MyPageInquiry";

import Signup from "./routes/pages/auth/Signup";
import Login from "./routes/pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Default,
    children: [
      { path: "/", Component: Home },
      // 브랜드
      { path: "/brand", Component: Brand },

      // 제품
      { path: "/product", Component: Product },
      { path: "/product/:id", Component: ProductDetail },

      // 비교
      { path: "/compare", Component: Compare },

      // 이벤트
      { path: "/event", Component: Event },
      { path: "/event/:id", Component: EventDetail },

      // faq
      { path: "/faq", Component: Faq },

      // 문의
      { path: "/inquiry", Component: Inquiry },
      { path: "/inquiry/success", Component: InquirySuccess },

      // 장바구니
      { path: "/cart", Component: Cart },

      // 결제
      { path: "/checkout", Component: Checkout },
      { path: "/order/success", Component: OrderSuccess },
      { path: "/order/failed", Component: OrderFailed },

      // 비회원
      { path: "/guest", Component: Guest },
      { path: "/guest/order", Component: GuestOrder },
      { path: "/guest/inquiry", Component: GuestInquiry },

      // 마이페이지
      {
        path: "/mypage",
        Component: MyPage,
        children: [
          { path: "/mypage/order", Component: MyPageOrder },
          { path: "/mypage/cart", Component: MyPageCart },
          { path: "/mypage/compare", Component: MyPageCompare },
          { path: "/mypage/inquiry", Component: MyPageInqury },
        ],
      },

      // auth(로그인, 회원기입)
      { path: "/signup", Component: Signup },
      { path: "/login", Component: Login },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
