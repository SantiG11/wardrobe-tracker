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

const estimatedPriceSchema = z
  .string()
  .optional()
  .refine(
    (v) => {
      if (v === undefined) return true;
      const trimmed = v.trim();
      if (trimmed === "") return true;
      const n = Number(trimmed);
      return Number.isFinite(n) && n >= 0;
    },
    { message: "Must be a non-negative number" },
  );

export const wishlistFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Max 40 characters"),
  link: z.union([z.string().url("Must be a valid URL"), z.literal("")]),
  estimatedPrice: estimatedPriceSchema,
  tagsText: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "bought"]),
});

export type WishlistFormValues = z.infer<typeof wishlistFormSchema>;
