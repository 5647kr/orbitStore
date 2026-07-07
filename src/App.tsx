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

const router = createBrowserRouter([
  {
    path: "/",
    Component: Default,
    children: [
      { path: "/", Component: Home },
      { path: "/brand", Component: Brand },
      { path: "/product", Component: Product },
      { path: "/product/:id", Component: ProductDetail },
      { path: "/compare", Component: Compare },
      { path: "/event", Component: Event },
      { path: "/event/:id", Component: EventDetail },
      { path: "/faq", Component: Faq },
      { path: "/inquiry", Component: Inquiry },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
