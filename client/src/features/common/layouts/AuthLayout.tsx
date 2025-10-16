import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="mx-auto h-dvh w-full max-w-md px-4 pt-20 md:pt-40">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
