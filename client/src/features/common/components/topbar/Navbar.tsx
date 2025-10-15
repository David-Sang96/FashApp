import { MenuIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-secondary text-white dark:text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 py-4 ps-4">
        <div className="flex items-center gap-3">
          <MenuIcon />
          <div>Categories</div>
        </div>
        <ul className="flex items-center justify-evenly gap-10">
          <li className="cursor-pointer">T-shirts</li>
          <li className="cursor-pointer">Hoodie</li>
          <li className="cursor-pointer">Shirt</li>
          <li className="cursor-pointer">Gym</li>
          <li className="cursor-pointer">Shorts</li>
          <li className="cursor-pointer">Jeans</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
