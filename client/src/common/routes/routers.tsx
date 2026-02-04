import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectRoute";

// Authentication
const LoginPage = lazy(() => import("@/features/auth/login/LoginPage"));
const RegisterPage = lazy(
  () => import("@/features/auth/register/RegisterPage"),
);
const ForgetPasswordPage = lazy(
  () => import("@/features/auth/ForgetPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("@/features/auth/ResetPasswordPage"),
);
const VerifyEmailPage = lazy(() => import("@/features/auth/VerifyEmailPage"));
const ProfileHomePage = lazy(
  () => import("@/features/profile/pages/ProfileHomePage"),
);

// Normal
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const ProductsPage = lazy(
  () => import("@/features/products/pages/ProductsPage"),
);
const ProductDetailPage = lazy(
  () => import("@/features/products/pages/ProductDetailPage"),
);

const NotFound = lazy(() => import("../components/NotFound"));

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
            path: "/products",
            element: (
              <ProtectedRoute>
                <ProductsPage />
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
  { path: "*", element: <NotFound /> },
]);

export default router;
