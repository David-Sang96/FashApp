import { ShoppingCart, User } from "lucide-react";
import { MdDarkMode } from "react-icons/md";
import SearchBox from "./SearchBox";

const TopAppBar = () => {
  return (
    <section className="bg-primary py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-12 text-base">
        <h2 className="text-2xl font-bold">FASH.COM</h2>
        <SearchBox />
        <div className="flex items-center justify-center gap-4">
          <ShoppingCart className="cursor-pointer" />
          <User className="cursor-pointer" />
          <MdDarkMode className="cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default TopAppBar;
