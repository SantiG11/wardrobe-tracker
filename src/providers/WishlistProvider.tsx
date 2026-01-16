import { createContext, useContext, type ReactNode } from "react";
import type { WishlistItem } from "@/types/wardrobe";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

const STORAGE_KEY = "whishlist-items";

type WishlistContextValue = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  updateItem: (id: string, patch: Partial<WishlistItem>) => void;
  deleteItem: (id: string) => void;
  toggleStatus: (id: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorageState<WishlistItem[]>(
    STORAGE_KEY,
    [],
  );

  const addItem = (item: WishlistItem) => {
    setItems((prev) => [item, ...prev]);
  };

  const updateItem = (id: string, patch: Partial<WishlistItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "pending" ? "bought" : "pending",
            }
          : item,
      ),
    );
  };

  return (
    <WishlistContext.Provider
      value={{ items, addItem, updateItem, deleteItem, toggleStatus }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
