import { useAppSelector } from "@/store/hooks";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { userInfo, isCheckingAuth } = useAppSelector((s) => s.auth);

  if (isCheckingAuth) {
    return <Loader />;
  }

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
