import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { getUser } from "../../api/auth/auth";

export default function Default() {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-(--white) text-(--navy)">
      <ScrollRestoration />

      <Toaster position="top-center" reverseOrder={false} />

      <Header />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
