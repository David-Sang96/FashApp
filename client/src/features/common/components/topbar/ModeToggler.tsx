import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../ThemeProvider";

export function ModeToggler() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative size-8 cursor-pointer pt-[5px]">
          <Sun className="absolute size-5 transition-all md:size-6 dark:rotate-90 dark:opacity-0" />
          <Moon className="absolute size-5 rotate-90 opacity-0 transition-all md:size-6 dark:rotate-0 dark:opacity-100" />
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
