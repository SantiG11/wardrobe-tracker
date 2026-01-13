import type { ClothingItem } from "@/types/wardrobe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClothingFormDialog } from "./ClothingFormDialog";

interface ClothingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ClothingItem | null;

  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ClothingDetailsDialog({
  open,
  onOpenChange,
  item,
  onToggleStatus,
  onDelete,
}: ClothingDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg ">
        {!item ? (
          <div className="text-sm text-muted-foreground">No item selected.</div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3 my-3">
                <div className="space-y-1">
                  <DialogTitle className="text-left text-lg font-bold">
                    {item.name}
                  </DialogTitle>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {item.category} • {item.status} • {item.yearsOfUse}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5 text-sm">
              {/* Colors */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Color
                </div>

                {item.colors.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {item.colors.map((c) => (
                      <div key={c} className="flex items-center gap-2">
                        <span
                          className="h-4 w-4 rounded-full border border-border"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                        <span className="text-xs text-muted-foreground">
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No colors</p>
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

              {"notes" in item && item.notes ? (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Notes
                  </div>
                  <p className="text-sm">{item.notes}</p>
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2 ">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
                onClick={() => onToggleStatus(item.id)}
              >
                {item.status === "clean" ? "Mark dirty" : "Mark clean"}
              </Button>
              <span>
                <ClothingFormDialog mode="edit" item={item} />
              </span>

              <ConfirmDeleteDialog
                title="Delete clothing item?"
                description="This item will be permanently removed from your wardrobe."
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
