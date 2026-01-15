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
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface WardrobeTableProps {
  items: ClothingItem[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onRowClick: (item: ClothingItem) => void;
  selectedId?: string | null;
}

export function WardrobeTable({
  items,
  onDelete,
  onToggleStatus,
  onRowClick,
  selectedId,
}: WardrobeTableProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No clothes yet. Add your first item to start tracking your wardrobe.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto px-2 sm:px-0 rounded-lg border border-border bg-card/60">
      <div className="w-full">
        <Table>
          <TableCaption className="text-xs text-muted-foreground">
            Your wardrobe items.
          </TableCaption>
          <TableHeader>
            <TableRow className="border-border ">
              <TableHead className="w-[20%] font-heading">Name</TableHead>
              <TableHead className="text-right font-heading sm:text-left">
                Category
              </TableHead>
              <TableHead className="hidden font-heading sm:table-cell">
                Status
              </TableHead>
              <TableHead className="hidden font-heading sm:table-cell">
                Years of use
              </TableHead>
              <TableHead className="hidden font-heading sm:table-cell">
                Color
              </TableHead>
              <TableHead className="hidden font-heading sm:table-cell w-[1%] text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onRowClick(item)}
                className={cn(
                  "border-border cursor-pointer hover:bg-muted/30",
                  selectedId === item.id && "bg-muted/30",
                )}
              >
                <TableCell className="max-w-[220px] truncate font-medium">
                  {item.name}
                </TableCell>

                <TableCell className="font-medium text-right sm:text-left">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {clothingCategoryLabelMap[item.category]}
                  </span>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <Tooltip>
                    <TooltipTrigger
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStatus(item.id);
                      }}
                    >
                      <Badge
                        variant={
                          item.status === "clean" ? "outline" : "destructive"
                        }
                        className="text-xs hover:cursor-pointer"
                      >
                        {item.status === "clean" ? "Clean" : "Dirty"}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Change status</TooltipContent>
                  </Tooltip>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <span className="text-xs  md:text-sm text-muted-foreground">
                    {yearsOfUseLabelMap[item.yearsOfUse]}
                  </span>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
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

                <TableCell className="text-right hidden sm:table-cell">
                  <div className="flex justify-end gap-2">
                    <span onClick={(e) => e.stopPropagation()}>
                      <ClothingFormDialog mode="edit" item={item} />
                    </span>
                    <span onClick={(e) => e.stopPropagation()}>
                      <ConfirmDeleteDialog
                        title="Delete clothing item?"
                        description="This item will be permanently removed from your wardrobe."
                        onConfirm={() => onDelete(item.id)}
                        trigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-muted-foreground hover:text-destructive"
                          >
                            Delete
                          </Button>
                        }
                      />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
