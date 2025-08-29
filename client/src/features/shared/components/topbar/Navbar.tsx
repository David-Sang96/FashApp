import { MenuIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-secondary">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 py-4 ps-4">
        <div className="flex items-center gap-3">
          <MenuIcon />
          <div>Categories</div>
        </div>
        <ul className="flex flex-1 items-center justify-evenly">
          <li>T-shirts</li>
          <li>Hoodie</li>
          <li>Shirt</li>
          <li>Gym</li>
          <li>Shorts</li>
          <li>Jeans</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
