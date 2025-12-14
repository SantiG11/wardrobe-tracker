import type { WishlistItem } from "@/types/wardrobe";
import { useLocalStorageState } from "./useLocalStorageState";

const STORAGE_KEY = "whishlist-items";

const initialWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "White Sneakers",
    link: "https://example.com/white-sneakers",
    estimatedPrice: 120,
    tags: ["shoes", "casual"],
    priority: "high",
    status: "pending",
  },
  {
    id: "2",
    name: "Denim Jacket",
    estimatedPrice: 80,
    tags: ["jacket"],
    priority: "medium",
    status: "pending",
  },
];

export function useWishlist() {
  const [items, setItems] = useLocalStorageState<WishlistItem[]>(
    STORAGE_KEY,
    initialWishlist,
  );

  const addItem = (item: WishlistItem) => {
    setItems((prev) => [...prev, item]);
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

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    toggleStatus,
  };
}
