import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { WhishlistPriority } from "@/types/wardrobe";
import { SelectTrigger } from "@radix-ui/react-select";
import { priorityOptions, statusOptions } from "./wishlistSchema";
import { Button } from "@/components/ui/button";

type StatusFilter = "all" | "pending" | "bought";
type PriorityFilter = "all" | WhishlistPriority;
type SortKey = "name" | "priority" | "status" | "estimatedPrice";
type SortDirection = "asc" | "desc";

interface WhishlistFiltersProps {
  search: string;
  tagSearch: string;
  status: StatusFilter;
  priority: PriorityFilter;
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSearchChange: (value: string) => void;
  onTagSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onPriorityChange: (value: PriorityFilter) => void;
  onSortKeyChange: (value: SortKey) => void;
  onSortDirectionChange: (value: SortDirection) => void;
  onClear: () => void;
}

export function WishlistFilters({
  search,
  tagSearch,
  status,
  priority,
  sortKey,
  sortDirection,
  onSearchChange,
  onTagSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortKeyChange,
  onSortDirectionChange,
  onClear,
}: WhishlistFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-3 text-sm md:gap-2">
      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 md:max-w-xs"
        />
        <Input
          placeholder="Filter by tags (e.g. shoes, casual)"
          value={tagSearch}
          onChange={(e) => onTagSearchChange(e.target.value)}
          className="h-9 md:max-w-xs"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={priority}
            onValueChange={(value) => onPriorityChange(value as PriorityFilter)}
          >
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              {priorityOptions.map((opt) => (
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
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={sortKey}
            onValueChange={(value) => onSortKeyChange(value as SortKey)}
          >
            <SelectTrigger className="h-9 w-[170px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="estimatedPrice">Estimated price</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortDirection}
            onValueChange={(value) =>
              onSortDirectionChange(value as SortDirection)
            }
          >
            <SelectTrigger className="h-9 w-[110px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
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
    </div>
  );
}
