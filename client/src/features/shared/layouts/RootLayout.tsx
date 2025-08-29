import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";
import HeadingContainer from "../components/topbar/HeadingContainer";

const RootLayout = () => {
  return (
    <main className="flex min-h-screen flex-col text-white">
      <HeadingContainer />
      <section className="mx-auto w-full flex-1 py-10 xl:max-w-7xl">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default RootLayout;
