import type { NavProps } from "@/types/navbar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function NavBar({ navLinks }: NavProps) {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-4 text-sm">
      {navLinks.map((link) => {
        const isActive =
          location.pathname === link.to ||
          (link.to !== "/" && location.pathname.startsWith(link.to));

        return (
          <Link
            key={link.to}
            to={link.to}
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
  );
}
