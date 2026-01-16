import { useAppSelector } from "@/store/hooks";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import Loader from "../components/Loader";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { userInfo, isCheckingAuth } = useAppSelector((s) => s.auth);

  if (isCheckingAuth) {
    return <Loader />;
  }

  if (userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
