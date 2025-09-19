import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RatingSystem from "./RatingSystem";
import { useStore } from "@/context/store";

const ProductDetailDialog = () => {
  const { selectedProduct, closeProduct, addToCart } = useStore();

  const open = !!selectedProduct;
  const p = selectedProduct;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeProduct()}>
      <DialogContent className="max-w-2xl">
        {!!p && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded" />
              <Badge className="absolute top-3 left-3">{p.category}</Badge>
              {p.originalPrice && (
                <Badge className="absolute top-3 right-3 bg-red-500 text-white">SALE</Badge>
              )}
            </div>
            <div className="space-y-3">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{p.name}</DialogTitle>
              </DialogHeader>
              <RatingSystem rating={p.rating} readonly showCount reviewCount={p.reviewCount} />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">${p.salePrice ?? p.price}</span>
                {p.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">${p.originalPrice}</span>
                )}
                <Badge variant="outline" className="ml-2">+{p.points} pts</Badge>
              </div>
              {typeof p.stock === "number" && (
                <div className="text-sm text-muted-foreground">Stock: {p.stock}</div>
              )}
              <div className="pt-2">
                <Button className="w-full" onClick={() => addToCart(p)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
