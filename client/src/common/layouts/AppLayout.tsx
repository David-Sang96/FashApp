import { useMeQuery } from "@/store/api/authApi";
import { Outlet } from "react-router";

const AppLayout = () => {
  useMeQuery();

  return (
    <div className="3xl:w-[80%] mx-auto">
      <Outlet />
    </div>
  );
};

export default AppLayout;
