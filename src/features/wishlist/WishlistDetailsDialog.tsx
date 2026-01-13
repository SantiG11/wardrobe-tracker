import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WishlistFormDialog } from "./WishlistFormDialog";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import type { WishlistItem } from "@/types/wardrobe";
import { Badge } from "@/components/ui/badge";

interface WishlistDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: WishlistItem | null;

  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function WishlistDetailsDialog({
  open,
  onOpenChange,
  item,
  onToggleStatus,
  onDelete,
}: WishlistDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {!item ? (
          <div className="text-sm text-muted-foreground">No item selected.</div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3 my-5">
                <div className="space-y-1">
                  <DialogTitle className="text-lg font-bold">
                    {item.name}
                  </DialogTitle>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {item.priority} • {item.status}
                    {item.estimatedPrice !== undefined
                      ? ` • $${item.estimatedPrice}`
                      : ""}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5 text-sm">
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Link
                </div>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-primary underline underline-offset-2"
                  >
                    Open product page
                  </a>
                ) : (
                  <p className="text-xs text-muted-foreground">No link</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Tags
                </div>
                {item.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No tags</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
                onClick={() => onToggleStatus(item.id)}
              >
                {item.status === "pending" ? "Mark bought" : "Mark pending"}
              </Button>
              <span>
                <WishlistFormDialog mode="edit" item={item} />
              </span>

              <ConfirmDeleteDialog
                title="Delete wishlist item?"
                description="This item will be permanently removed from your wishlist."
                onConfirm={() => {
                  onDelete(item.id);
                  onOpenChange(false);
                }}
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-muted-foreground hover:text-destructive"
                  >
                    Delete
                  </Button>
                }
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
