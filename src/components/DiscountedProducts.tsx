import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import RatingSystem from "./RatingSystem";
import { products } from "@/data/products";
import { useStore } from "@/context/store";

const DiscountedProducts = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const discountedProducts = products.filter((p) => typeof p.discount === "number" && typeof p.salePrice === "number");
  const { addToCart, openProduct } = useStore();

  return (
    <div className="space-y-6">
      {/* Flash Sale Header */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-6 w-6 text-yellow-300 animate-pulse" />
                <h2 className="text-2xl font-bold">Flash Sale</h2>
              </div>
              <p className="text-white/90">Limited time offers - Don't miss out!</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Ends in:</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-lg px-2 py-1 backdrop-blur-sm">
                  <span className="text-lg font-mono font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <div className="text-xs opacity-80">HR</div>
                </div>
                <span className="text-lg">:</span>
                <div className="bg-white/20 rounded-lg px-2 py-1 backdrop-blur-sm">
                  <span className="text-lg font-mono font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <div className="text-xs opacity-80">MIN</div>
                </div>
                <span className="text-lg">:</span>
                <div className="bg-white/20 rounded-lg px-2 py-1 backdrop-blur-sm">
                  <span className="text-lg font-mono font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <div className="text-xs opacity-80">SEC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discounted Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {discountedProducts.map((product, index) => (
          <Card 
            key={product.id} 
            className="group hover:shadow-premium transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-card/95 border-2 border-red-100 relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Discount Badge */}
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-red-500 text-white animate-pulse-glow">
                -{product.discount}%
              </Badge>
            </div>
            
            {/* Stock Badge */}
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                Only {product.stock} left!
              </Badge>
            </div>

            <CardContent className="p-0">
              <div className="relative overflow-hidden" onClick={() => openProduct(product)}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <RatingSystem 
                  rating={product.rating} 
                  readonly 
                  showCount 
                  reviewCount={product.reviewCount}
                />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-500">
                        ${product.salePrice}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-primary">
                      +{product.points} pts
                    </Badge>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => addToCart(product)}>
                  Grab Deal Now!
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscountedProducts;