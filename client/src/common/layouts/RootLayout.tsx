import { Toaster } from "@/components/ui/sonner";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <main className="flex flex-col">
      <ScrollRestoration />
      <section className="flex-1 pb-8">
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
