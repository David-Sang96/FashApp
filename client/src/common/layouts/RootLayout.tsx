import { Toaster } from "@/components/ui/sonner";
import { useMeQuery } from "@/store/api/authApi";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import HeadingContainer from "../components/topbar/HeadingContainer";

const RootLayout = () => {
  // restore session silently
  useMeQuery(); //  runs once per app load to restore user
  // const navigate = useNavigate();
  // const forceLogin = useAppSelector((store) => store.auth.forceLogin);

  // useEffect(() => {
  //   if (forceLogin) {
  //     navigate("/login");
  //   }
  // }, [forceLogin, navigate]);

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
