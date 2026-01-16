import { OverviewHero } from "@/components/OverviewHero";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWardrobe } from "@/providers/WardrobeProvider";
import { useWishlist } from "@/providers/WishlistProvider";

import { useMemo } from "react";
import { Link } from "react-router-dom";

const cardTitleStyles = "font-medium font-heading underline";

function OverviewPage() {
  const { items: wardrobeItems } = useWardrobe();
  const { items: wishlistItems } = useWishlist();

  const {
    totalClothes,
    cleanCount,
    dirtyCount,
    uniqueCategories,
    totalWishlist,
    pendingWishlist,
    boughtWishlist,
    totalEstimatedWishlist,
    highPriorityCount,
  } = useMemo(() => {
    const totalClothes = wardrobeItems.length;
    const cleanCount = wardrobeItems.filter((i) => i.status === "clean").length;
    const dirtyCount = wardrobeItems.filter((i) => i.status === "dirty").length;
    const uniqueCategories = new Set(wardrobeItems.map((i) => i.category)).size;

    const totalWishlist = wishlistItems.length;
    const pendingWishlist = wishlistItems.filter(
      (i) => i.status === "pending",
    ).length;
    const boughtWishlist = wishlistItems.filter(
      (i) => i.status === "bought",
    ).length;
    const totalEstimatedWishlist = wishlistItems.reduce(
      (sum, item) => sum + (item.estimatedPrice ?? 0),
      0,
    );
    const highPriorityCount = wishlistItems.filter(
      (i) => i.priority === "high",
    ).length;

    return {
      totalClothes,
      cleanCount,
      dirtyCount,
      uniqueCategories,
      totalWishlist,
      pendingWishlist,
      boughtWishlist,
      totalEstimatedWishlist,
      highPriorityCount,
    };
  }, [wardrobeItems, wishlistItems]);

  return (
    <div className="space-y-4">
      <OverviewHero />

      <PageHeader
        title="Overview"
        description="Quick stats about your wardrobe and wishlist."
      />

      <section className="space-y-3">
        <Link to="/wardrobe">
          <h2 className="text-sm py-2 font-heading inline-block hover:underline font-semibold text-muted-foreground uppercase tracking-wide">
            Wardrobe
          </h2>
        </Link>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="gap-3">
            <CardHeader>
              <CardTitle className={cardTitleStyles}>Total clothes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{totalClothes}</div>
            </CardContent>
          </Card>

          <Card className="gap-3">
            <CardHeader>
              <CardTitle className={cardTitleStyles}>Clean vs dirty</CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <div>
                <span className="text-muted-foreground font-semibold">
                  Clean:{" "}
                </span>
                <span className="font-semibold">{cleanCount}</span>
              </div>
              <div>
                <span className="text-muted-foreground font-semibold">
                  Dirty:{" "}
                </span>
                <span className="font-semibold">{dirtyCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-3">
            <CardHeader>
              <CardTitle className={cardTitleStyles}>Categories used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{uniqueCategories}</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <Link to="/wishlist">
          <h2 className="text-sm inline-block hover:underline py-2 font-semibold text-muted-foreground uppercase tracking-wide">
            Wishlist
          </h2>
        </Link>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="gap-3">
            <CardHeader>
              <CardTitle className={cardTitleStyles}>Wishlist items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{totalWishlist}</div>
            </CardContent>
          </Card>

          <Card className="gap-3">
            <CardHeader>
              <CardTitle className={cardTitleStyles}>
                Pending vs bought
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg font-semibold flex flex-col justify-">
              <div>
                <span className="text-muted-foreground ">Pending: </span>
                <span className="font-semibold">{pendingWishlist}</span>
              </div>
              <div>
                <span className="text-muted-foreground ">Bought: </span>
                <span className="font-semibold">{boughtWishlist}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-3">
            <CardHeader>
              <CardTitle className={cardTitleStyles}>
                High priority items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{highPriorityCount}</div>
            </CardContent>
          </Card>

          <Card className="gap-3">
            <CardHeader>
              <CardTitle className={cardTitleStyles}>
                Total estimated cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                ${totalEstimatedWishlist.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default OverviewPage;
