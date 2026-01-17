import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  wishlistFormSchema,
  priorityOptions,
  statusOptions,
  type WishlistFormValues,
} from "./wishlistSchema";

import type { WishlistItem } from "@/types/wardrobe";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWishlist } from "@/providers/WishlistProvider";

type Mode = "create" | "edit";

interface WishlistFormDialogProps {
  mode: Mode;
  item?: WishlistItem;
  text?: string;
}

export function WishlistFormDialog({
  mode,
  item,
  text,
}: WishlistFormDialogProps) {
  const { addItem, updateItem } = useWishlist();
  const [open, setOpen] = useState(false);

  const form = useForm<WishlistFormValues>({
    resolver: zodResolver(wishlistFormSchema),
    defaultValues: {
      name: item?.name ?? "",
      link: item?.link ?? "",
      estimatedPrice:
        item?.estimatedPrice !== undefined ? String(item.estimatedPrice) : "",
      priority: item?.priority ?? "medium",
      status: item?.status ?? "pending",
      tagsText: item?.tags.join(", ") ?? "",
    },
  });

  const title = mode === "create" ? "Add wishlist item" : "Edit wishlist item";
  const triggerLabel = mode === "create" ? "Add item" : "Edit";

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    // Sync form with item each time you open in edit mode
    if (nextOpen && mode === "edit" && item) {
      form.reset({
        name: item.name,
        link: item.link ?? "",
        estimatedPrice:
          item.estimatedPrice !== undefined ? String(item.estimatedPrice) : "",
        priority: item.priority,
        status: item.status,
        tagsText: item.tags.join(", "),
      });
    }

    // Optional: if opening create, ensure it’s clean
    if (nextOpen && mode === "create") {
      form.reset({
        name: "",
        link: "",
        estimatedPrice: "",
        priority: "medium",
        status: "pending",
        tagsText: "",
      });
    }
  };

  const onSubmit = (values: WishlistFormValues) => {
    const tags =
      values.tagsText
        ?.split(",")
        .map((t) => t.trim())
        .filter(Boolean) ?? [];

    const parsedPrice = (() => {
      const raw = values.estimatedPrice?.trim();
      if (!raw) return undefined;
      const n = Number(raw);
      return Number.isFinite(n) ? n : undefined;
    })();

    const baseData: Omit<WishlistItem, "id"> = {
      name: values.name,
      link: values.link || undefined,
      estimatedPrice: parsedPrice,
      tags,
      priority: values.priority,
      status: values.status,
    };

    if (mode === "create") {
      addItem({ id: crypto.randomUUID(), ...baseData });
    } else if (mode === "edit" && item) {
      updateItem(item.id, baseData);
    }

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full sm:w-auto"
          variant={mode === "create" ? "default" : "ghost"}
        >
          {text ? text : triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold">{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="White sneakers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estimated price */}
            <FormField
              control={form.control}
              name="estimatedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated price (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="120"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tagsText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="shoes, casual, running" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="submit" size="sm">
                {mode === "create" ? "Save item" : "Save changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
