
"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminTheme } from "@/context/AdminThemeContext";

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useAdminTheme();

  let IconToDisplay = Laptop;
  if (theme === 'light') IconToDisplay = Sun;
  else if (theme === 'dark') IconToDisplay = Moon;
  // If theme is 'system', resolvedTheme shows what system is currently using.
  // But button icon should reflect the *setting*. So Laptop for system.
  // Or, show Sun/Moon based on resolvedTheme and highlight "System" differently.
  // Let's use resolvedTheme for the icon for clarity of current display.
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          {resolvedTheme === 'dark' ? 
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" /> : 
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          }
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
