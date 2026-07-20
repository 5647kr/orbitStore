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
import Cart from "./routes/pages/cart/Cart";
import Checkout from "./routes/pages/checkout/Checkout";
import Signup from "./routes/pages/auth/Signup";
import Login from "./routes/pages/auth/Login";
import MyPage from "./routes/pages/mypage/MyPage";
import Order from "./routes/pages/mypage/page/MyPageOrder";
import MyPageOrder from "./routes/pages/mypage/page/MyPageOrder";
import MyPageCart from "./routes/pages/mypage/page/MyPageCart";
import MyPageCompare from "./routes/pages/mypage/page/MyPageCompare";
import MyPageInqury from "./routes/pages/mypage/page/MyPageInquiry";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Default,
    children: [
      { path: "/", Component: Home },
      { path: "/brand", Component: Brand },
      { path: "/signup", Component: Signup },
      { path: "/login", Component: Login },
      { path: "/product", Component: Product },
      { path: "/product/:id", Component: ProductDetail },
      { path: "/compare", Component: Compare },
      { path: "/event", Component: Event },
      { path: "/event/:id", Component: EventDetail },
      { path: "/faq", Component: Faq },
      { path: "/inquiry", Component: Inquiry },
      { path: "/cart", Component: Cart },
      { path: "/checkout", Component: Checkout },
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
