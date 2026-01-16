import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import HeadingContainer from "../components/topbar/HeadingContainer";

const RootLayout = () => {
  return (
    <main className="3xl:w-[80%] flex h-dvh flex-col">
      <HeadingContainer />
      <section className="flex-1 px-4 pt-4 pb-10">
        <Outlet />
      </section>
      <Footer />
      <Toaster
        position="top-center"
        closeButton
        richColors
        duration={3000}
        expand={true}
      />
    </main>
  );
};

export default RootLayout;
