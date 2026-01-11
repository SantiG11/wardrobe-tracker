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
type SortKey = "name" | "category" | "status" | "yearsOfUse";
type SortDirection = "asc" | "desc";

interface WardrobeFiltersProps {
  search: string;
  tagSearch: string;
  status: StatusFilter;
  category: CategoryFilter;
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSearchChange: (value: string) => void;
  onTagSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onCategoryChange: (value: CategoryFilter) => void;
  onSortKeyChange: (value: SortKey) => void;
  onSortDirectionChange: (value: SortDirection) => void;
  onClear: () => void;
}

export function WardrobeFilters({
  search,
  tagSearch,
  status,
  category,
  sortKey,
  sortDirection,
  onSearchChange,
  onTagSearchChange,
  onStatusChange,
  onCategoryChange,
  onSortKeyChange,
  onSortDirectionChange,
  onClear,
}: WardrobeFiltersProps) {
  return (
    <div className="rounded-lg border border-border bg-card/40 p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-7 md:h-9 text-sm "
        />
        <Input
          placeholder="Filter by tags (e.g. sporty, cotton)"
          value={tagSearch}
          onChange={(e) => onTagSearchChange(e.target.value)}
          className="h-7 md:h-9 text-sm "
        />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Select
          value={category}
          onValueChange={(value) => onCategoryChange(value as CategoryFilter)}
        >
          <SelectTrigger className="h-5 md:h-9 w-full text-xs" size="sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              All categories
            </SelectItem>
            {clothingCategories.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as StatusFilter)}
        >
          <SelectTrigger className="h-9 w-full text-xs py-1" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              All Status
            </SelectItem>
            <SelectItem value="clean" className="text-xs">
              Clean
            </SelectItem>
            <SelectItem value="dirty" className="text-xs">
              Dirty
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortKey}
          onValueChange={(value) => onSortKeyChange(value as SortKey)}
        >
          <SelectTrigger className="h-9 w-full text-xs" size="sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name" className="text-xs">
              Name
            </SelectItem>
            <SelectItem value="category" className="text-xs">
              Category
            </SelectItem>
            <SelectItem value="status" className="text-xs">
              Status
            </SelectItem>
            <SelectItem value="yearsOfUse" className="text-xs">
              Years of use
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortDirection}
          onValueChange={(value) =>
            onSortDirectionChange(value as SortDirection)
          }
        >
          <SelectTrigger className="h-9 w-full text-xs" size="sm">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc" className="text-xs">
              Asc
            </SelectItem>
            <SelectItem value="desc" className="text-xs">
              Desc
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="h-7 bg-accent mt-3  sm:col-span-2 md:col-span-3 lg:col-span-1 lg:justify-self-end lg:w-auto text-xs text-muted-foreground"
        onClick={onClear}
      >
        Reset filters
      </Button>
    </div>
  );
}
