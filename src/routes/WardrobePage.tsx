import { useWardrobe } from "@/hooks/useWardrobe";
import type { ClothingCategory, ClothingStatus } from "@/types/wardrobe";
import { ClothingFormDialog } from "@/wardrobe/ClothingFormDialog";
import { WardrobeFilters } from "@/wardrobe/WardrobeFilters";
import { WardrobeTable } from "@/wardrobe/WardrobeTable";
import { useMemo, useState } from "react";

type StatusFilter = "all" | ClothingStatus;
type CategoryFilter = "all" | ClothingCategory;

function WardrobePage() {
  const { items, deleteItem } = useWardrobe();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (
        search.trim() &&
        !item.name.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }

      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [items, search, statusFilter, categoryFilter]);

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items:center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Wardrobe</h1>
          <p className="text-sm text-muted-foreground">
            This page will show your clothes table, filters, and forms.
          </p>
        </div>

        <ClothingFormDialog />
      </div>

      <WardrobeFilters
        search={search}
        status={statusFilter}
        category={categoryFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onClear={handleClearFilters}
      />

      <WardrobeTable items={filteredItems} onDelete={deleteItem} />
    </div>
  );
}

export default WardrobePage;
