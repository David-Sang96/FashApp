import { Outlet } from "react-router";
import Footer from "../components/Footer";
import HeadingContainer from "../components/topbar/HeadingContainer";

const RootLayout = () => {
  return (
    <main className="flex min-h-dvh flex-col">
      <HeadingContainer />
      <section className="mx-auto w-full max-w-7xl flex-1 py-10">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default RootLayout;
