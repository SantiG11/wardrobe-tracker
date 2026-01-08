import type { WhishlistPriority } from "@/types/wardrobe";
import z from "zod";

export const priorityOptions: { value: WhishlistPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "bought", label: "Bought" },
];

const estimatedPriceSchema = z.preprocess((value) => {
  if (value === "" || value === undefined || value === null) return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}, z.number().nonnegative().optional());

export const wishlistFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Max 40 characters"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  estimatedPrice: estimatedPriceSchema,
  tagsText: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  status: z.enum(["pending", "bought"]).default("pending"),
});

export type WishlistFormValues = z.infer<typeof wishlistFormSchema>;
