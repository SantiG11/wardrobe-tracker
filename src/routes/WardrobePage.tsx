import { useMemo, useState } from "react";

import { WardrobeTable } from "@/features/wardrobe/WardrobeTable";
import { WardrobeFilters } from "@/features/wardrobe/WardrobeFilters";
import { ClothingFormDialog } from "@/features/wardrobe/ClothingFormDialog";
import type {
  ClothingCategory,
  ClothingStatus,
  YearsOfUse,
} from "@/types/wardrobe";
import { PageHeader } from "@/components/PageHeader";
import { ClothingDetailsDialog } from "@/features/wardrobe/ClothingDetailsDialog";
import { Button } from "@/components/ui/button";
import { useWardrobe } from "@/providers/WardrobeProvider";

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
  const { items, deleteItem, toggleStatus } = useWardrobe();

  const [search, setSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectedItem = useMemo(
    () => items.find((i) => i.id === selectedId) ?? null,
    [items, selectedId],
  );

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
      <PageHeader
        title="Wardrobe"
        description="Manage your clothes, tags, and status."
        right={<ClothingFormDialog mode="create" />}
      />

      <div className="sm:hidden">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          {filtersOpen ? "Hide filters" : "Show filters"}
        </Button>

        {filtersOpen ? (
          <div className="mt-3">
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
          </div>
        ) : null}
      </div>

      <div className="hidden sm:block">
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
      </div>

      <WardrobeTable
        items={filteredAndSortedItems}
        onDelete={deleteItem}
        onToggleStatus={toggleStatus}
        onRowClick={(item) => {
          setSelectedId(item.id);
          setDetailsOpen(true);
        }}
      />
      <ClothingDetailsDialog
        open={detailsOpen}
        item={selectedItem}
        onOpenChange={(open) => {
          setDetailsOpen(open);
          if (!open) setSelectedId(null);
        }}
        onToggleStatus={toggleStatus}
        onDelete={deleteItem}
      />
    </div>
  );
}

export default WardrobePage;
