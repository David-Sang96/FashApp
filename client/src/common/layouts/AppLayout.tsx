import { useMeQuery } from "@/store/api/authApi";
import { Outlet } from "react-router";
import TopAppBar from "../components/topbar/TopAppBar";

const AppLayout = () => {
  useMeQuery();

  return (
    <div className="3xl:w-[80%] mx-auto min-h-dvh">
      <TopAppBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
