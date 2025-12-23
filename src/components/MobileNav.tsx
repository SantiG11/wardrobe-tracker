import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import { useState } from "react";
import type { NavProps } from "@/types/navbar";
import { cn } from "@/lib/utils";

export default function MobileNav({ navLinks }: NavProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className=" m-1 text-sm flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.to ||
              (link.to !== "/" && location.pathname.startsWith(link.to));

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className={cn(
                  "rounded-full px-3 py-1 transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-muted",
                  isActive && "bg-muted text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
