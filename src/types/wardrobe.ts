export type ClothingStatus = "clean" | "dirty";

export type ClothingCategory =
  | "tshirt"
  | "shirt"
  | "pants"
  | "shorts"
  | "jacket"
  | "shoes"
  | "accessory"
  | "other";

export type YearsOfUse = "-1 year" | "1-3 years" | "+ 3 years";

export type HexColor = string;

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  tags: string[];
  colors: HexColor[];
  status: ClothingStatus;
  yearsOfUse: YearsOfUse;
  notes?: string;
}

export type WhishlistPriority = "low" | "medium" | "high";

export interface WishlistItem {
  id: string;
  name: string;
  link?: string;
  estimatedPrice?: number;
  tags: string[];
  priority: WhishlistPriority;
  status: "pending" | "bought";
}
