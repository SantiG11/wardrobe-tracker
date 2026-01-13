import { ClothingFormDialog } from "@/features/wardrobe/ClothingFormDialog";
import { WishlistFormDialog } from "@/features/wishlist/WishlistFormDialog";

export function OverviewHero() {
  return (
    <div className="space-y-4 my-32   flex flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Virtual Wardrobe
      </h1>

      <p className="max-w-2xl text-center font-semibold text-sm text-muted-foreground">
        Organize your clothes, track what you own, and plan future purchases in
        one simple place.
      </p>

      <div className="flex flex-wrap gap-3 pt-1">
        <ClothingFormDialog mode="create" text="Add Wardrobe item" />
        <WishlistFormDialog mode="create" text="Add Wishlist item" />
      </div>
    </div>
  );
}
