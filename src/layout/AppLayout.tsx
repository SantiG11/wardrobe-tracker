import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

const navLinks = [
  { to: "/", label: "Overview" },
  { to: "/wardrobe", label: "Wardrobe" },
  { to: "/wishlist", label: "Wishlist" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              Virtual Wardrobe
            </span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              MVP
            </span>
          </div>

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
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-10 pt-6">{children}</main>
    </div>
  );
}
