import Loader from "@/common/components/Loader";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { LayoutDashboard, Package, Settings, Users } from "lucide-react";
import { Link } from "react-router";
import { NavLink } from "./NavLink";
import { NavUser } from "./NavUser";

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { userInfo } = useAppSelector((s) => s.auth);

  if (!userInfo) return <Loader />;

  return (
    <Sidebar collapsible="icon" className="group border-border border-r">
      <SidebarContent className="overflow-auto px-3 py-4 md:overflow-hidden">
        <Link
          to={"/"}
          className="mb-8 flex items-center gap-2 px-2 transition-all duration-200 group-data-[collapsible=icon]:justify-center"
        >
          <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
            <span className="text-primary-foreground text-sm font-bold">
              {userInfo?.name[0]}
            </span>
          </div>
          <span className="text-foreground font-semibold group-data-[collapsible=icon]:hidden">
            {userInfo?.name}
          </span>
        </Link>

        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <NavLink
                  to={item.url}
                  className="hover:bg-accent hover:text-foreground text-muted-foreground flex items-center gap-3 rounded-2xl px-3 py-6 transition-colors"
                  activeClassName="bg-accent text-foreground font-medium "
                >
                  <item.icon className="size-5! shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
    </Sidebar>
  );
}
