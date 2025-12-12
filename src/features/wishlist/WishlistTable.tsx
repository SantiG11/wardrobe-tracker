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

interface WishlistTableProps {
  items: WishlistItem[];
  onDelete: (id: string) => void;
}

export function WishlistTable({ items, onDelete }: WishlistTableProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No wishlist items match your current filters.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card/60">
      <Table>
        <TableCaption className="text-xs text-muted-foreground">
          Your wishlist items.
        </TableCaption>

        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="w-[30%]">Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Est. price</TableHead>
            <TableHead className="w-[1%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="border-border">
              {/* Name + optional link */}
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 text-xs text-primary underline underline-offset-2"
                    >
                      View link
                    </a>
                  )}
                </div>
              </TableCell>

              {/* Priority */}
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {item.priority}
                </Badge>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={item.status === "bought" ? "outline" : "secondary"}
                  className="text-xs"
                >
                  {item.status}
                </Badge>
              </TableCell>

              {/* Tags */}
              <TableCell>
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

              {/* Estimated price */}
              <TableCell className="text-right">
                <span className="text-xs text-foreground/80">
                  {item.estimatedPrice !== undefined
                    ? `$${item.estimatedPrice}`
                    : "—"}
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <WishlistFormDialog mode="edit" item={item} />
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
