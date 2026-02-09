import { Suspense } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Loader from "../components/Loader";

const AuthLayout = () => {
  return (
    <main className="mx-auto h-dvh w-full max-w-md pt-20 max-md:px-4 md:pt-40">
      <Toaster
        position="top-center"
        closeButton
        richColors
        duration={3000}
        expand={true}
      />
      <section className="flex-1 pb-8">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
};

export default AuthLayout;
