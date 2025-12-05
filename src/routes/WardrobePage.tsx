import { useWardrobe } from "@/hooks/useWardrobe";

function WardrobePage() {
  const { items } = useWardrobe();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Wardrobe</h1>
      <p className="text-sm text-muted-foreground">
        This page will show your clothes table, filters, and forms.
      </p>

      <div className="mt-4 space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No clothes yet. You&apos;ll add your first item soon.
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-border bg-card/60 p-3 text-sm"
              >
                <div className="font-medium">{item.name}</div>

                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>
                    {item.category} • {item.status}
                  </span>

                  {/* Color swatches (temporary preview) */}
                  {item.colors.length > 0 ? (
                    <div className="flex items-center gap-1">
                      {item.colors.map((color) => (
                        <span
                          key={color}
                          className="h-3 w-3 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span>No colors</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WardrobePage;
