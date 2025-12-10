import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ClothingItem } from "@/types/wardrobe";

import { clothingCategoryLabelMap, yearsOfUseLabelMap } from "./clothingSchema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClothingFormDialog } from "./ClothingFormDialog";

interface WardrobeTableProps {
  items: ClothingItem[];
  onDelete: (id: string) => void;
}

export function WardrobeTable({ items, onDelete }: WardrobeTableProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No clothes yer. Add your first item to start tracking your wardrobe.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card/60">
      <Table>
        <TableCaption className="text-xs text-muted-foreground">
          Your wardrobe items.
        </TableCaption>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="w-[30%]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Years of use</TableHead>
            <TableHead>Colors</TableHead>
            <TableHead className="w-[1%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="border-border">
              <TableCell className="font-medium">{item.name}</TableCell>

              <TableCell className="font-medium">
                <span className="text-xs text-muted-foreground">
                  {clothingCategoryLabelMap[item.category]}
                </span>
              </TableCell>

              <TableCell>
                <Badge
                  variant={item.status === "clean" ? "outline" : "destructive"}
                  className="text-xs"
                >
                  {item.status === "clean" ? "Clean" : "Dirty"}
                </Badge>
              </TableCell>

              <TableCell>
                <span className="text-xs text-muted-foreground">
                  {yearsOfUseLabelMap[item.yearsOfUse]}
                </span>
              </TableCell>

              <TableCell>
                {item.colors.length > 0 ? (
                  <div className="flex items-center gap-1">
                    {item.colors.map((color) => (
                      <span
                        key={color}
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No colors
                  </span>
                )}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <ClothingFormDialog mode="edit" item={item} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
