import LoginPage from "@/features/auth/login/LoginPage";
import RegisterPage from "@/features/auth/register/RegisterPage";
import HomePage from "@/features/home/pages/HomePage";
import ProductDetailPage from "@/features/product-detail/pages/ProductDetailPage";
import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
