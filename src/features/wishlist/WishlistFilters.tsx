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
    <div className="rounded-lg border border-border bg-card/40 p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9"
        />
        <Input
          placeholder="Filter by tags..."
          value={tagSearch}
          onChange={(e) => onTagSearchChange(e.target.value)}
          className="h-9 "
        />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Select
          value={priority}
          onValueChange={(value) => onPriorityChange(value as PriorityFilter)}
        >
          <SelectTrigger className="h-9 w-full">
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
          <SelectTrigger className="h-9 w-full">
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

        <Select
          value={sortKey}
          onValueChange={(value) => onSortKeyChange(value as SortKey)}
        >
          <SelectTrigger className="h-9 w-full">
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
          <SelectTrigger className="h-9 w-full">
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
        className="h-9 w-full sm:col-span-2 md:col-span-3 lg:col-span-1 lg:justify-self-end lg:w-auto text-xs text-muted-foreground"
        onClick={onClear}
      >
        Reset filters
      </Button>
    </div>
  );
}
