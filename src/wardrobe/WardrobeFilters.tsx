import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { ClothingCategory, ClothingStatus } from "@/types/wardrobe";
import { clothingCategories } from "./clothingSchema";
import { Button } from "@/components/ui/button";

type StatusFilter = "all" | ClothingStatus;
type CategoryFilter = "all" | ClothingCategory;

interface WardrobeFiltersProps {
  search: string;
  status: StatusFilter;
  category: CategoryFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onCategoryChange: (value: CategoryFilter) => void;
  onClear: () => void;
}

export function WardrobeFilters({
  search,
  status,
  category,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onClear,
}: WardrobeFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-3 text-sm md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-xs">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={category}
          onValueChange={(value) => onCategoryChange(value as CategoryFilter)}
        >
          <SelectTrigger className="h-9 w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {clothingCategories.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as StatusFilter)}
        >
          <SelectTrigger className="h-9 w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="clean">Clean</SelectItem>
            <SelectItem value="dirty">Dirty</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          className="h-9 text-xs text-muted-foreground"
          onClick={onClear}
        >
          Reset filters
        </Button>
      </div>
    </div>
  );
}
