import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { getUser } from "../../api/auth";

export default function Default() {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-(--white) text-(--navy)">
      <ScrollRestoration />

      <Header />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
