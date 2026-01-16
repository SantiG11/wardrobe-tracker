import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import type { ClothingItem } from "@/types/wardrobe";
import { createContext, useContext, type ReactNode } from "react";

const STORAGE_KEY = "wardrobe-items";

type WardrobeContextValue = {
  items: ClothingItem[];
  addItem: (item: ClothingItem) => void;
  updateItem: (id: string, patch: Partial<ClothingItem>) => void;
  deleteItem: (id: string) => void;
  toggleStatus: (id: string) => void;
};

const WardrobeContext = createContext<WardrobeContextValue | null>(null);

export function WardrobeProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorageState<ClothingItem[]>(
    STORAGE_KEY,
    [],
  );

  const addItem = (item: ClothingItem) => {
    setItems((prev) => [item, ...prev]);
  };

  const updateItem = (id: string, patch: Partial<ClothingItem>) => {
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
          ? { ...item, status: item.status === "clean" ? "dirty" : "clean" }
          : item,
      ),
    );
  };

  return (
    <WardrobeContext.Provider
      value={{ items, addItem, updateItem, deleteItem, toggleStatus }}
    >
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  const ctx = useContext(WardrobeContext);
  if (!ctx)
    throw new Error("useWardrobe must be used inside <WardrobeProvider>");
  return ctx;
}
