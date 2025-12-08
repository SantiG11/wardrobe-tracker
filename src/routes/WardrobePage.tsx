import { useWardrobe } from "@/hooks/useWardrobe";
import { ClothingFormDialog } from "@/wardrobe/ClothingFormDialog";
import { WardrobeTable } from "@/wardrobe/WardrobeTable";

function WardrobePage() {
  const { items, deleteItem } = useWardrobe();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Wardrobe</h1>
          <p className="text-sm text-muted-foreground">
            This page will show your clothes table, filters, and forms.
          </p>
        </div>

        <ClothingFormDialog />
      </div>

      <WardrobeTable items={items} onDelete={deleteItem} />
    </div>
  );
}

export default WardrobePage;
