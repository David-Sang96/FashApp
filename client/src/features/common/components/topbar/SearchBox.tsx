import { SearchIcon } from "lucide-react";

const SearchBox = () => {
  return (
    <form className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        className="bg-primary-foreground w-full rounded-full py-2 ps-10 text-sm text-black outline-0 placeholder:text-black/40"
      />
      <SearchIcon className="absolute top-[9px] left-3 size-[17px] text-black/60" />
    </form>
  );
};

export default SearchBox;
