import ProductCard from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List } from "lucide-react";
import { useState, useMemo } from "react";
import { products as allProducts, getCategories } from "@/data/products";

const ProductShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const categories = getCategories();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "points":
        filtered.sort((a, b) => b.points - a.points);
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    return filtered;
  }, [searchTerm, sortBy]);

  const filterProductsByCategory = (category: string) => {
    const filtered = filteredAndSortedProducts.filter(product => 
      category === "All" || product.category === category
    );
    return filtered;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground">Earn points with every purchase and unlock exclusive rewards</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/50 backdrop-blur-sm rounded-2xl p-4 border">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {filteredAndSortedProducts.length} products
            </Badge>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-background text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="points">Most Points</option>
            </select>

            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6 bg-card/50 backdrop-blur-sm">
          {categories.map((category) => {
            const count = filterProductsByCategory(category).length;
            return (
              <TabsTrigger key={category} value={category} className="text-sm relative">
                {category}
                {count > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 text-xs">
                    {count}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => {
          const categoryProducts = filterProductsByCategory(category);
          return (
            <TabsContent key={category} value={category} className="animate-fade-in">
              {categoryProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {categoryProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard {...product} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ProductShowcase;