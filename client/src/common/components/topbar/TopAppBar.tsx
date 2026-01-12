import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useLogoutMutation } from "@/store/api/userApi";
import { useAppDispatch } from "@/store/hooks";
import { apiSlice } from "@/store/slices/api";
import { clearUserInfo } from "@/store/slices/auth";
import { ShoppingCart, User } from "lucide-react";
import { LuLogOut } from "react-icons/lu";
import { toast } from "sonner";
import CartSheet from "./CartSheet";
import { ModeToggler } from "./ModeToggler";
import SearchBox from "./SearchBox";

const TopAppBar = () => {
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logoutMutation(undefined).unwrap();
      dispatch(clearUserInfo());
      dispatch(apiSlice.util.resetApiState()); //Reset API cache on logout
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
    <section className="bg-primary px-4 py-3 text-white md:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 text-base md:gap-12">
        <h2 className="hidden text-2xl font-bold md:block">FASH.COM</h2>
        <SearchBox />
        <div className="flex items-center gap-3.5 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <ShoppingCart className="size-5 cursor-pointer md:size-6" />
            </SheetTrigger>
            <CartSheet />
          </Sheet>
          <User className="size-5 cursor-pointer md:size-6" />
          <ModeToggler />
          <LuLogOut
            className="size-5 cursor-pointer md:size-6"
            onClick={handleLogout}
          />
        </div>
      </div>
    </section>
  );
};

export default TopAppBar;
