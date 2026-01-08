import { Outlet } from "react-router";
import { Toaster } from "sonner";

const AuthLayout = () => {
  return (
    <main className="mx-auto h-dvh w-full max-w-md pt-20 max-md:px-4 md:pt-40">
      <Toaster
        position="top-center"
        closeButton
        richColors
        duration={2000}
        expand={true}
      />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
