import { ShoppingCart, Heart, Sparkles, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/context/store";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const { cart, cartCount, removeFromCart, favorites } = useStore();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <span className="text-lg font-semibold">LoyaltyHub</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleTheme()}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <div className="relative">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-pink-500 text-white p-0 flex items-center justify-center text-xs">
              {Object.values(favorites).filter(Boolean).length}
            </Badge>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                ) : (
                  cart.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3 border rounded-lg p-2">
                      <img src={product.image} alt={product.name} className="h-12 w-12 rounded object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-medium line-clamp-1">{product.name}</div>
                        <div className="text-xs text-muted-foreground">x{qty} • ${product.price}</div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFromCart(product.id)}>Remove</Button>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
