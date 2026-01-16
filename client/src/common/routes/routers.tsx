import ForgetPasswordPage from "@/features/auth/ForgetPasswordPage";
import LoginPage from "@/features/auth/login/LoginPage";
import RegisterPage from "@/features/auth/register/RegisterPage";
import ResetPasswordPage from "@/features/auth/ResetPasswordPage";
import VerifyEmailPage from "@/features/auth/VerifyEmailPage";
import HomePage from "@/features/home/pages/HomePage";
import ProductDetailPage from "@/features/product-detail/pages/ProductDetailPage";
import ProfileHomePage from "@/features/profile/pages/ProfileHomePage";
import { createBrowserRouter } from "react-router";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/me",
            element: (
              <ProtectedRoute>
                <ProfileHomePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/product/:id",
            element: (
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: (
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            ),
          },
          {
            path: "/register",
            element: (
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            ),
          },
          {
            path: "/verify-email",
            element: (
              <AuthRoute>
                <VerifyEmailPage />
              </AuthRoute>
            ),
          },
          {
            path: "/forget-password",
            element: (
              <AuthRoute>
                <ForgetPasswordPage />
              </AuthRoute>
            ),
          },
          {
            path: "/reset-password",
            element: (
              <AuthRoute>
                <ResetPasswordPage />
              </AuthRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
