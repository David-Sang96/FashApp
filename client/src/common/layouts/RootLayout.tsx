import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../components/Footer";
import PageSkeleton from "./PageSkeleton";

const RootLayout = () => {
  return (
    <main className="flex flex-col">
      <ScrollRestoration />
      <section className="flex-1 pb-8">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
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
