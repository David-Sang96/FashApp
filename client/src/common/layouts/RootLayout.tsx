import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import HeadingContainer from "../components/topbar/HeadingContainer";

const RootLayout = () => {
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
