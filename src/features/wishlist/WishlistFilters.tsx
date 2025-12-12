import { priorityOptions, statusOptions } from "./wishlistSchema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { WhishlistPriority } from "@/types/wardrobe";

type StatusFilter = "all" | "pending" | "bought";
type PriorityFilter = "all" | WhishlistPriority;
type SortKey = "name" | "priority" | "status" | "estimatedPrice";
type SortDirection = "asc" | "desc";

interface WishlistFiltersProps {
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

export function WishlistFilters(props: WishlistFiltersProps) {
  const {
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
  } = props;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-3 text-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col w-full max-w-[320px] gap-2">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 md:max-w-xs"
        />
        <Input
          placeholder="Filter by tags..."
          value={tagSearch}
          onChange={(e) => onTagSearchChange(e.target.value)}
          className="h-9 md:max-w-xs"
        />
      </div>

      {/* Row 2: filters + sorting + reset */}
      <div className="flex flex-wrap items-center justify-end gap-2 ">
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
        </div>
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
