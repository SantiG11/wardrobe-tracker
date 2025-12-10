import { useMemo, useState } from "react";
import { useWardrobe } from "@/hooks/useWardrobe";
import { WardrobeTable } from "@/wardrobe/WardrobeTable";
import { WardrobeFilters } from "@/wardrobe/WardrobeFilters";
import { ClothingFormDialog } from "@/wardrobe/ClothingFormDialog";
import type {
  ClothingCategory,
  ClothingStatus,
  YearsOfUse,
} from "@/types/wardrobe";

type StatusFilter = "all" | ClothingStatus;
type CategoryFilter = "all" | ClothingCategory;
type SortKey = "name" | "category" | "status" | "yearsOfUse";
type SortDirection = "asc" | "desc";

const yearsOfUseOrder: Record<YearsOfUse, number> = {
  "less-than-a-year": 0,
  "one-to-three-years": 1,
  "more-than-three-years": 2,
};

function WardrobePage() {
  const { items, deleteItem } = useWardrobe();

  const [search, setSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
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

      if (categoryFilter !== "all" && item.category !== categoryFilter) {
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
        case "category":
          return dir * compareStrings(a.category, b.category);
        case "status":
          return dir * compareStrings(a.status, b.status);
        case "yearsOfUse":
          return (
            dir *
            (yearsOfUseOrder[a.yearsOfUse] - yearsOfUseOrder[b.yearsOfUse])
          );
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
    categoryFilter,
    sortKey,
    sortDirection,
  ]);

  const handleClearFilters = () => {
    setSearch("");
    setTagSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortKey("name");
    setSortDirection("asc");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Wardrobe</h1>
          <p className="text-sm text-muted-foreground">
            Track all your clothes in one place and filter them quickly.
          </p>
        </div>

        <ClothingFormDialog mode="create" />
      </div>

      <WardrobeFilters
        search={search}
        tagSearch={tagSearch}
        status={statusFilter}
        category={categoryFilter}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSearchChange={setSearch}
        onTagSearchChange={setTagSearch}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onSortKeyChange={setSortKey}
        onSortDirectionChange={setSortDirection}
        onClear={handleClearFilters}
      />

      <WardrobeTable items={filteredAndSortedItems} onDelete={deleteItem} />
    </div>
  );
}

export default WardrobePage;
