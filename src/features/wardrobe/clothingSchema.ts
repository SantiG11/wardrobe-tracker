import type { ClothingCategory, YearsOfUse } from "@/types/wardrobe";
import { z } from "zod";

export const yearsOfUseLabelMap: Record<YearsOfUse, string> = {
  "less-than-a-year": "Less than a year",
  "one-to-three-years": "1 to 3 years",
  "more-than-three-years": "More than 3 years",
};

export const clothingCategoryLabelMap: Record<ClothingCategory, string> = {
  tshirt: "T-Shirt",
  shirt: "Shirt",
  pants: "Pants",
  shorts: "Shorts",
  jacket: "Jacket",
  shoes: "Shoes",
  accessory: "Accessory",
  other: "Other",
};

export const clothingCategories: { value: ClothingCategory; label: string }[] =
  [
    { value: "tshirt", label: "T-Shirt" },
    { value: "shirt", label: "Shirt" },
    { value: "pants", label: "Pants" },
    { value: "shorts", label: "Shorts" },
    { value: "jacket", label: "Jacket" },
    { value: "shoes", label: "Shoes" },
    { value: "accessory", label: "Accessory" },
    { value: "other", label: "Other" },
  ];

export const clothingFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Max 40 characters"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["clean", "dirty"]),
  yearsOfUse: z.enum([
    "less-than-a-year",
    "one-to-three-years",
    "more-than-three-years",
  ] as const),
  tagsText: z.string().optional(),
  color: z.string().min(1, "Color is required"),
  notes: z.string().optional(),
});

export type ClothingFormValues = z.infer<typeof clothingFormSchema>;
