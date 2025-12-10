import { useWishlist } from "@/hooks/useWishList";
import type { WishlistItem } from "@/types/wardrobe";
import {
  priorityOptions,
  statusOptions,
  wishlistFormSchema,
  type WishlistFormValues,
} from "./wishlistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@radix-ui/react-dialog";
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

type Mode = "create" | "edit";
interface WishlistFormDialogProps {
  mode: Mode;
  item?: WishlistItem;
}

export function WishlistFormDialog({ mode, item }: WishlistFormDialogProps) {
  const { addItem, updateItem } = useWishlist();
  const [open, setOpen] = useState(false);

  const form = useForm<WishlistFormValues, any, WishlistFormValues>({
    resolver: zodResolver(wishlistFormSchema),
    defaultValues: {
      name: item?.name ?? "",
      link: item?.link ?? "",
      estimatedPrice: item?.estimatedPrice,
      tagsText: item?.tags.join(", ") ?? "",
      priority: item?.priority ?? "medium",
      status: item?.status ?? "pending",
    },
  });

  const title = mode === "create" ? "Add wishlist item" : "Edit wishlist item";
  const triggerLabel = mode === "create" ? "Add item" : "Edit";

  const onSubmit = (values: WishlistFormValues) => {
    const tags =
      values.tagsText
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [];

    const baseData: Omit<WishlistItem, "id"> = {
      name: values.name,
      link: values.link,
      estimatedPrice: values.estimatedPrice,
      tags,
      priority: values.priority,
      status: values.status,
    };

    if (mode === "create") {
      addItem({
        id: crypto.randomUUID(),
        ...baseData,
      });
    } else if (mode === "edit" && item) {
      updateItem(item.id, baseData);
    }

    form.reset();
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen && mode === "edit" && item) {
      form.reset({
        name: item.name,
        link: item.link ?? "",
        estimatedPrice: item.estimatedPrice,
        tagsText: item.tags.join(", "),
        priority: item.priority,
        status: item.status,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant={mode === "create" ? "default" : "ghost"}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
