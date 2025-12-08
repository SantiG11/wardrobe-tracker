import type { ClothingCategory, YearsOfUse } from "@/types/wardrobe";
import { z } from "zod";

export const yearsOfUseOptions: { value: YearsOfUse; label: string }[] = [
  { value: "-1 year", label: "Less than a year" },
  { value: "1-3 years", label: "1 to 3 years" },
  { value: "+3 years", label: "More than 3 years" },
];

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
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["clean", "dirty"]),
  yearsOfUse: z.enum(["-1 year", "1-3 years", "+3 years"] as const),
  tagsText: z.string().optional(),
  color: z.string().min(1).default("#000000"),
  notes: z.string().optional(),
});

export type ClothingFormValues = z.infer<typeof clothingFormSchema>;
