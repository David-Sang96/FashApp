import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/features/admin/components/AppSidebar";
import { useAppSelector } from "@/store/hooks";
import { Suspense } from "react";
import { Navigate, Outlet, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";
import Loader from "../components/Loader";

const AdminLayout = () => {
  const { userInfo, isCheckingAuth } = useAppSelector((store) => store.auth);

  if (isCheckingAuth) return <Loader />;

  if (userInfo?.role !== "admin") return <Navigate to="/" replace />;

  return (
    <SidebarProvider>
      <TooltipProvider>
        <Toaster
          position="top-center"
          closeButton
          richColors
          duration={3000}
          expand={true}
        />
        <ScrollRestoration />
        <div className="flex min-h-dvh w-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <header className="border-border bg-card flex h-14 items-center gap-4 border-b px-4 lg:h-16">
              <SidebarTrigger />
              <div className="flex-1" />
            </header>
            <main className="flex-1 overflow-auto p-6">
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default AdminLayout;
