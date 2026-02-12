import { useMeQuery } from "@/store/api/authApi";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router";

const AppLayout = () => {
  useMeQuery();

  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const key = "scroll-" + location.key;
    if (navigationType === "POP") {
      const saved = sessionStorage.getItem(key);
      if (saved) {
        window.scrollTo(0, Number(saved));
      }
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };
  }, [location, navigationType]);

  return (
    <div className="3xl:w-[80%] mx-auto">
      <Outlet />
    </div>
  );
};

export default AppLayout;
