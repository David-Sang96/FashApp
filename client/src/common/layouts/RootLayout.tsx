import { Toaster } from "@/components/ui/sonner";
import { useMeQuery } from "@/store/api/userApi";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Footer from "../components/Footer";
import HeadingContainer from "../components/topbar/HeadingContainer";

const RootLayout = () => {
  useMeQuery(); //  runs once per app load to restore user
  const navigate = useNavigate();
  const forceLogin = useAppSelector((store) => store.auth.forceLogin);

  useEffect(() => {
    if (forceLogin) {
      navigate("/login");
    }
  }, [forceLogin, navigate]);

  return (
    <main className="flex h-dvh flex-col">
      <HeadingContainer />
      <section className="mx-auto w-full max-w-7xl flex-1 px-2 py-10">
        <Outlet />
      </section>
      <Footer />
      <Toaster
        position="top-center"
        closeButton
        richColors
        duration={2000}
        expand={true}
      />
    </main>
  );
};

export default RootLayout;
