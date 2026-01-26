import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useLogoutMutation } from "@/store/api/authApi";
import { ShoppingCart, User } from "lucide-react";
import { FcSettings } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import CartSheet from "./CartSheet";
import { ModeToggler } from "./ModeToggler";
import SearchBox from "./SearchBox";

const TopAppBar = () => {
  const [logoutMutation] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation(undefined).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  /* 
    Advantage of resetApiState()
    Prevents stale data
    Avoids auth bugs
    Makes logout truly “clean”
    Saves you from edge-case nightmares

    Most production apps do one of these on logout:
   ✔ resetApiState()
   ✔ full page reload
   ✔ store rehydration reset
  */

  return (
    <section className="bg-primary px-4 py-3 text-white md:px-6 md:py-5">
      <div className="flex items-center justify-between gap-8 text-base md:gap-12">
        <Link to={"/"} className="hidden text-2xl font-bold md:block">
          FASH.COM
        </Link>
        <SearchBox />
        <div className="flex items-center gap-3 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <ShoppingCart className="size-5 cursor-pointer md:size-6" />
            </SheetTrigger>
            <CartSheet />
          </Sheet>
          <ModeToggler />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User className="size-6 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate("/me")}>
                  <FcSettings className="mr-2 size-4" />
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout}>
                  <FiLogOut className="mr-2 size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
};

export default TopAppBar;
