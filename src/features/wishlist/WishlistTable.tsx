import type { WishlistItem } from "@/types/wardrobe";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WishlistFormDialog } from "./WishlistFormDialog";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WishlistTableProps {
  items: WishlistItem[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onRowClick: (item: WishlistItem) => void;
}

export function WishlistTable({
  items,
  onDelete,
  onToggleStatus,
  onRowClick,
}: WishlistTableProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No wishlist items match your current filters.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto px-2 sm:px-0 rounded-lg border border-border bg-card/60">
      <div className="w-full">
        <Table>
          <TableCaption className="text-xs text-muted-foreground">
            Your wishlist items.
          </TableCaption>

          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="w-[30%]">Name</TableHead>
              <TableHead className="hidden sm:table-cell">Priority</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">Tags</TableHead>
              <TableHead className=" text-right sm:text-center">
                Est. price
              </TableHead>
              <TableHead className="w-[1%] text-center hidden sm:table-cell">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onRowClick(item)}
                className="border-border cursor-pointer hover:bg-muted/30"
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col max-w-[220px] truncate">
                    <span>{item.name}</span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 text-xs text-primary underline underline-offset-2 "
                      >
                        View link
                      </a>
                    )}
                  </div>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline" className="text-xs">
                    {item.priority}
                  </Badge>
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
                          item.status === "bought" ? "outline" : "secondary"
                        }
                        className="text-xs hover:cursor-pointer"
                      >
                        {item.status}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Change status</TooltipContent>
                  </Tooltip>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  {item.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-[11px] text-muted-foreground">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>

                <TableCell className="text-right sm:text-center">
                  <span className="text-xs text-foreground/80">
                    {item.estimatedPrice !== undefined
                      ? `$${item.estimatedPrice}`
                      : "—"}
                  </span>
                </TableCell>

                <TableCell className="text-right hidden sm:table-cell">
                  <div className="flex justify-end gap-2">
                    <span onClick={(e) => e.stopPropagation()}>
                      <WishlistFormDialog mode="edit" item={item} />
                    </span>
                    <span onClick={(e) => e.stopPropagation()}>
                      <ConfirmDeleteDialog
                        title="Delete wishlist item?"
                        description="This item will be permanently removed from your wishlist."
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
