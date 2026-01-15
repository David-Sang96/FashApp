import LoginPage from "@/features/auth/login/LoginPage";
import RegisterPage from "@/features/auth/register/RegisterPage";
import VerifyEmailPage from "@/features/auth/VerifyEmailPage";
import HomePage from "@/features/home/pages/HomePage";
import ProductDetailPage from "@/features/product-detail/pages/ProductDetailPage";
import ProfileHomePage from "@/features/profile/pages/ProfileHomePage";
import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "./ProtectRoute";

const router = createBrowserRouter([
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
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/verify-email", element: <VerifyEmailPage /> },
    ],
  },
]);

export default router;
