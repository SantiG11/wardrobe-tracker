import MobileNav from "@/components/MobileNav";
import NavBar from "@/components/NavBar";
import useIsMobile from "@/hooks/isMobile";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const navLinks = [
  { to: "/", label: "Overview" },
  { to: "/wardrobe", label: "Wardrobe" },
  { to: "/wishlist", label: "Wishlist" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="w-full bg-background text-foreground">
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
          {isMobile ? (
            <MobileNav navLinks={navLinks} />
          ) : (
            <NavBar navLinks={navLinks} />
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-10 pt-5 sm:px-6 sm:pt-6">
        {children}
      </main>
    </div>
  );
}
