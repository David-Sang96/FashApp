import { SearchIcon } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        className="bg-primary-foreground text-secondary/80 w-full rounded-full py-2 ps-10 text-sm outline-0"
      />
      <SearchIcon className="text-secondary/60 absolute top-[9px] left-3 size-[17px]" />
    </div>
  );
};

export default SearchBox;
