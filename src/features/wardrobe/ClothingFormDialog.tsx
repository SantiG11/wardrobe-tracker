import { useWardrobe } from "@/hooks/useWardrobe";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  clothingCategories,
  clothingFormSchema,
  yearsOfUseLabelMap,
  type ClothingFormValues,
} from "./clothingSchema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import type { ClothingItem } from "@/types/wardrobe";
import { useState } from "react";

type Mode = "create" | "edit";

interface ClothingFormDialogProps {
  mode: Mode;
  item?: ClothingItem;
  text?: string;
}

export function ClothingFormDialog({
  mode,
  item,
  text,
}: ClothingFormDialogProps) {
  const { addItem, updateItem } = useWardrobe();
  const [open, setOpen] = useState(false);

  const form = useForm<ClothingFormValues, any, ClothingFormValues>({
    resolver: zodResolver(clothingFormSchema),
    defaultValues: {
      name: item?.name ?? "",
      category: item?.category ?? "",
      status: item?.status ?? "clean",
      yearsOfUse: item?.yearsOfUse ?? "less-than-a-year",
      tagsText: item?.tags.join(", ") ?? "",
      color: item?.colors[0] ?? "#000000",
      notes: item?.notes ?? "",
    },
  });

  const title = mode === "create" ? "Add clothing item" : "Edit clothing item";
  const triggerLabel = mode === "create" ? "Add clothing" : "Edit";

  const onSubmit = (values: ClothingFormValues) => {
    const tags =
      values.tagsText
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [];

    const baseData = {
      name: values.name,
      category: values.category,
      status: values.status,
      yearsOfUse: values.yearsOfUse,
      tags,
      colors: [values.color],
      notes: values.notes,
    };

    if (mode === "create") {
      addItem({
        id: crypto.randomUUID(),
        ...baseData,
        category: values.category as any,
      });
    } else if (mode === "edit" && item) {
      updateItem(item.id, { ...baseData, category: values.category as any });
    }

    form.reset();
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen && mode === "edit" && item) {
      form.reset({
        name: item.name,
        category: item.category,
        status: item.status,
        yearsOfUse: item.yearsOfUse,
        tagsText: item.tags.join(", "),
        color: item.colors[0] ?? "#000000",
        notes: item.notes ?? "",
      });
    }
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
                    <Input placeholder="Black T-Shirt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {clothingCategories.map((opt) => (
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
                        <SelectItem value="clean">Clean</SelectItem>
                        <SelectItem value="dirty">Dirty</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Years of use */}
            <FormField
              control={form.control}
              name="yearsOfUse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of use</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of use" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(yearsOfUseLabelMap).map(
                          ([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ),
                        )}
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
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="sporty, cotton, brand new" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input type="color" className="h-9 w-12 p-1" {...field} />
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        className="font-mono text-xs"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special care, brand, etc."
                      rows={3}
                      {...field}
                    />
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
