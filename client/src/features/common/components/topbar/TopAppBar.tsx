import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, User } from "lucide-react";
import CartSheet from "./CartSheet";
import { ModeToggler } from "./ModeToggler";
import SearchBox from "./SearchBox";

const TopAppBar = () => {
  return (
    <section className="bg-primary py-3 ps-4 text-white md:py-6">
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
        </div>
      </div>
    </section>
  );
};

export default TopAppBar;
