import { WishlistFormDialog } from "@/features/wishlist/WishlistFormDialog";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishList";
import type { WhishlistPriority } from "@/types/wardrobe";
import { useMemo, useState } from "react";
import { WishlistFilters } from "@/features/wishlist/WishlistFilters";

type StatusFilter = "all" | "pending" | "bought";
type PriorityFilter = "all" | WhishlistPriority;
type SortKey = "name" | "priority" | "status" | "estimatedPrice";
type SortDirection = "asc" | "desc";

const priorityOrder: Record<WhishlistPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

function WishlistPage() {
  const { items, deleteItem } = useWishlist();

  const [search, setSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const filteredAndSortedItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedTagSearch = tagSearch.trim().toLowerCase();

    const filtered = items.filter((item) => {
      if (
        normalizedSearch &&
        !item.name.toLowerCase().includes(normalizedSearch)
      ) {
        return false;
      }

      if (normalizedTagSearch) {
        const hasMatchingTag = item.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedTagSearch),
        );
        if (!hasMatchingTag) return false;
      }

      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }

      if (priorityFilter !== "all" && item.priority !== priorityFilter) {
        return false;
      }

      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const dir = sortDirection === "asc" ? 1 : -1;

      const compareStrings = (x: string, y: string) =>
        x.localeCompare(y, undefined, { sensitivity: "base" });

      switch (sortKey) {
        case "name":
          return dir * compareStrings(a.name, b.name);
        case "priority":
          return dir * (priorityOrder[a.priority] - priorityOrder[b.priority]);
        case "status":
          return dir * compareStrings(a.status, b.status);
        case "estimatedPrice": {
          const aPrice = a.estimatedPrice ?? Number.POSITIVE_INFINITY;
          const bPrice = b.estimatedPrice ?? Number.POSITIVE_INFINITY;
          return dir * (aPrice - bPrice);
        }
        default:
          return 0;
      }
    });
    return sorted;
  }, [
    items,
    search,
    tagSearch,
    statusFilter,
    priorityFilter,
    sortKey,
    sortDirection,
  ]);

  const handleClearFilters = () => {
    setSearch("");
    setTagSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setSortKey("name");
    setSortDirection("asc");
  };

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

      <WishlistFilters
        search={search}
        tagSearch={tagSearch}
        status={statusFilter}
        priority={priorityFilter}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSearchChange={setSearch}
        onTagSearchChange={setTagSearch}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onSortKeyChange={setSortKey}
        onSortDirectionChange={setSortDirection}
        onClear={handleClearFilters}
      />

      <div className="mt-4 space-y-2">
        {filteredAndSortedItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Your wishlist is empty for now.
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredAndSortedItems.map((item) => (
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
