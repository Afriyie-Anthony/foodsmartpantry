"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, ShoppingBasket, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-700 dark:text-gray-300"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col bg-white dark:bg-gray-950"
      >
        <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white"
            onClick={() => setOpen(false)}
          >
            <ShoppingBasket className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            <span>FreshTrack</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-700 dark:text-gray-300"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-gray-700 dark:text-gray-300"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
        </div>
        <nav className="flex flex-col gap-4 mt-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-500 py-2",
                pathname === route.href
                  ? "text-emerald-600 dark:text-emerald-500 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
