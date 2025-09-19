import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingSystemProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  reviewCount?: number;
}

const RatingSystem = ({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = "md",
  showCount = false,
  reviewCount = 0
}: RatingSystemProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-6 w-6"
  };

  const handleClick = (newRating: number) => {
    if (readonly) return;
    setCurrentRating(newRating);
    onRatingChange?.(newRating);
  };

  const handleMouseEnter = (starIndex: number) => {
    if (readonly) return;
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const displayRating = hoverRating || currentRating;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const starIndex = index + 1;
          const isFilled = starIndex <= displayRating;
          
          return (
            <button
              key={index}
              onClick={() => handleClick(starIndex)}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={cn(
                "transition-all duration-200",
                !readonly && "hover:scale-110 cursor-pointer",
                readonly && "cursor-default"
              )}
            >
              <Star 
                className={cn(
                  sizeClasses[size],
                  "transition-colors duration-200",
                  isFilled 
                    ? "fill-amber-400 text-amber-400" 
                    : "text-muted-foreground hover:text-amber-300"
                )} 
              />
            </button>
          );
        })}
      </div>
      {showCount && reviewCount > 0 && (
        <span className="text-sm text-muted-foreground ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default RatingSystem;