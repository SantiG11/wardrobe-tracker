import { useWishlist } from "@/hooks/useWishList";

function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
      <p className="text-sm text-muted-foreground">
        This page will show your wishlist items and their status.
      </p>

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
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>

                  {item.estimatedPrice && (
                    <span className="text-xs text-foreground/80">
                      ${item.estimatedPrice}
                    </span>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  {item.priority} • {item.status}
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
