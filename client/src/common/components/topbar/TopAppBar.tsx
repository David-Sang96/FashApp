/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useDebounce } from "@/hooks/useDebounce";
import { useLogoutMutation } from "@/store/api/authApi";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FcSettings } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { Link, useMatch, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import CartSheet from "./CartSheet";
import { ModeToggler } from "./ModeToggler";

const TopAppBar = () => {
  const [logoutMutation] = useLogoutMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearch = useDebounce(searchText.trim(), 500);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const productsPage = useMatch("/products");

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchText((prev) => (prev !== urlSearch ? urlSearch : prev));
  }, [searchParams]);

  useEffect(() => {
    const current = searchParams.get("search") || "";
    if (current === debouncedSearch) return;

    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    setSearchParams(params, { replace: true });
  }, [debouncedSearch]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((v) => !v);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation(undefined).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <section className="bg-primary sticky top-0 z-50 border-b px-4 py-3 text-white backdrop-blur md:px-5 lg:py-4">
      <div className="grid grid-cols-[auto_1fr_auto] items-center">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link to="/" className="hidden items-center lg:flex">
            <span className="font-serif text-2xl tracking-tight italic">
              FASH
            </span>
          </Link>
        </div>

        {/* CENTER NAV – LOCKED */}
        <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 gap-8 text-sm font-medium tracking-wide lg:flex">
          {[
            { name: "Shop", path: "/" },
            { name: "Products", path: "/products" },
            { name: "About", path: "/" },
          ].map((link) => (
            <motion.div
              key={link.name}
              className="relative cursor-pointer"
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={{
                rest: {},
                hover: {},
              }}
            >
              <Link to={link.path} className="text-[15px]">
                {link.name}
              </Link>
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-white"
                variants={{
                  rest: { width: 0 },
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </nav>

        {/* RIGHT ACTIONS – FREE TO GROW */}
        <div className="flex items-center justify-end gap-3 md:gap-4">
          {/* SEARCH (OVERLAY, NO LAYOUT WIDTH) */}
          {productsPage && (
            <div className="relative">
              {!searchOpen && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center"
                >
                  <Search className="size-5" />
                </button>
              )}

              {searchOpen && (
                <div
                  ref={wrapperRef}
                  className="absolute top-1/2 right-0 z-50 w-48 -translate-y-1/2 lg:w-xs"
                >
                  <Input
                    autoFocus
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search products..."
                    className="h-9 w-full rounded-2xl bg-white py-4 pr-8 text-sm text-black placeholder:text-sm placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/50"
                  />

                  {searchText && (
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchText("");
                      }}
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                    >
                      <X className="size-4 text-black dark:text-white" />
                      <span className="sr-only">Close search</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CART */}
          <Sheet>
            <SheetTrigger asChild>
              <ShoppingCart className="size-5 cursor-pointer" />
            </SheetTrigger>
            <CartSheet />
          </Sheet>

          <ModeToggler />

          {/* USER */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User className="size-[22px] cursor-pointer" />
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
                <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                  <RiAdminLine className="mr-2 size-4" />
                  Admin
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
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

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="bg-primary overflow-hidden lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.nav
              className="flex flex-col gap-4 px-4 py-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05, // delay between each item
                  },
                },
                hidden: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1, // reverse on close
                  },
                },
              }}
            >
              {[
                { name: "Shop", to: "/" },
                { name: "Products", to: "/products" },
                { name: "About", to: "/about" },
              ].map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -20 },
                  }}
                >
                  <Link
                    to={item.to}
                    className="hover:text-accent text-sm font-medium text-white"
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TopAppBar;
