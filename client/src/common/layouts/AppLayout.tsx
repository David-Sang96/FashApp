import { useMeQuery } from "@/store/api/authApi";
import { Outlet } from "react-router";

const AppLayout = () => {
  useMeQuery();

  return <Outlet />;
};

export default AppLayout;
