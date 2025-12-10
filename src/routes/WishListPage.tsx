import { WishlistFormDialog } from "@/features/wishlist/WishlistFormDialog";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishList";

function WishlistPage() {
  const { items, deleteItem } = useWishlist();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
          <p className="text-sm text-muted-foreground">
            Manage the clothes you want to buy and track their status.
          </p>
        </div>

        <WishlistFormDialog mode="create" />
      </div>

      <div className="mt-4 space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Your wishlist is empty for now.
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-border bg-card/60 p-3 text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="font-medium">{item.name}</div>

                    <div className="text-xs text-muted-foreground space-y-0.5">
                      {item.estimatedPrice !== undefined && (
                        <div>Estimated price: ${item.estimatedPrice}</div>
                      )}
                      <div>
                        Priority: {item.priority} • Status: {item.status}
                      </div>
                      {item.tags.length > 0 && (
                        <div>Tags: {item.tags.join(", ")}</div>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary underline underline-offset-2"
                        >
                          View link
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <WishlistFormDialog mode="edit" item={item} />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
