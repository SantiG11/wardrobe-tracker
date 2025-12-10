import type { ClothingItem } from "@/types/wardrobe";
import { useLocalStorageState } from "./useLocalStorageState";

const STORAGE_KEY = "wardrobe-items";

const initialWardrobe: ClothingItem[] = [
  {
    id: "1",
    name: "Black T-Shirt",
    category: "tshirt",
    tags: ["basic", "cotton"],
    colors: ["#000000"],
    status: "clean",
    yearsOfUse: "one-to-three-years",
  },
  {
    id: "2",
    name: "Running Shorts",
    category: "shorts",
    tags: ["sporty"],
    colors: ["#1d4ed8"],
    status: "dirty",
    yearsOfUse: "less-than-a-year",
  },
];

export function useWardrobe() {
  const [items, setItems] = useLocalStorageState<ClothingItem[]>(
    STORAGE_KEY,
    initialWardrobe,
  );

  const addItem = (item: ClothingItem) => {
    setItems((prev) => [...prev, item]);
  };

  const updateItem = (id: string, patch: Partial<ClothingItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, addItem, updateItem, deleteItem };
}
