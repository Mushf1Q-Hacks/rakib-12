import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import RatingSystem from "./RatingSystem";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/context/store";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  points: number;
  category: string;
  isFavorite?: boolean;
}

const ProductCard = ({ 
  id,
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviewCount, 
  points, 
  category,
  isFavorite = false 
}: ProductCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [userRating, setUserRating] = useState(0);
  const { toast } = useToast();
  const { addToCart, toggleFavorite, openProduct, favorites } = useStore();

  const isFav = favorites[id] ?? favorite;

  const handleAddToCart = () => {
    addToCart({ id, name, price, originalPrice, image, rating, reviewCount, points, category });
    toast({
      title: "Added to Cart!",
      description: `${name} has been added to your cart. +${points} loyalty points!`,
    });
  };

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
    toast({
      title: "Rating Submitted!",
      description: `Thank you for rating ${name} - ${newRating} stars!`,
    });
  };

  const handleQuickView = () => {
    openProduct({ id, name, price, originalPrice, image, rating, reviewCount, points, category });
    toast({
      title: "Quick View",
      description: `Viewing details for ${name}`,
    });
  };

  return (
    <Card className="group hover:shadow-premium transition-all duration-500 hover:-translate-y-2 bg-gradient-to-b from-card to-card/95 animate-fade-in relative overflow-hidden">
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none"></div>
      
      <CardContent className="p-0 relative z-10">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Action buttons overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button 
              size="sm" 
              variant="secondary" 
              className="backdrop-blur-sm bg-white/90 hover:bg-white"
              onClick={handleQuickView}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              className="backdrop-blur-sm bg-white/90 hover:bg-white"
              onClick={() => toggleFavorite(id)}
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {category}
          </Badge>
          
          {originalPrice && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white animate-pulse">
              SALE
            </Badge>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          {/* Rating system with user interaction */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <RatingSystem 
                rating={rating} 
                readonly 
                showCount 
                reviewCount={reviewCount}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Rate this:</span>
              <RatingSystem 
                rating={userRating} 
                onRatingChange={handleRatingChange}
                size="sm"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-card-foreground">${price}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
              )}
            </div>
            <Badge variant="outline" className="text-primary border-primary/20">
              +{points} pts
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;