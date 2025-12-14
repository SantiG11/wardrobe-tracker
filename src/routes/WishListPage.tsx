import { useMemo, useState } from "react";
import { WishlistFormDialog } from "@/features/wishlist/WishlistFormDialog";
import { WishlistFilters } from "@/features/wishlist/WishlistFilters";
import { WishlistTable } from "@/features/wishlist/WishlistTable";
import type { WhishlistPriority } from "@/types/wardrobe";
import { useWishlist } from "@/hooks/useWishList";

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
  const { items, deleteItem, toggleStatus } = useWishlist();

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
        const hasTag = item.tags.some((t) =>
          t.toLowerCase().includes(normalizedTagSearch),
        );
        if (!hasTag) return false;
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
            Track what you want to buy and keep it organized.
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

      <WishlistTable
        items={filteredAndSortedItems}
        onDelete={deleteItem}
        onToggleStatus={toggleStatus}
      />
    </div>
  );
}

export default WishlistPage;
