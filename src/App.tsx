import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layout/Default";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Default,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
