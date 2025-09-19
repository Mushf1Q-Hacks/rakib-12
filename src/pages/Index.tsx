import UserProfile from "@/components/UserProfile";
import ProductShowcase from "@/components/ProductShowcase";
import DiscountedProducts from "@/components/DiscountedProducts";
import { Badge } from "@/components/ui/badge";
import { Bell, Gift, TrendingUp, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              Product Show Case
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Your premium rewards destination
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white p-0 flex items-center justify-center text-xs animate-pulse">
                3
              </Badge>
            </div>
          </div>
        </header>

        {/* User Profile */}
        <div className="animate-slide-up">
          <UserProfile />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-card hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-2xl font-bold text-primary">+320 Points</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-card hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-xl">
                <Gift className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Rewards</p>
                <p className="text-2xl font-bold text-accent">8 Offers</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-card hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Savings</p>
                <p className="text-2xl font-bold text-green-600">$248</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Section */}
        <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <DiscountedProducts />
        </section>

        {/* Product Showcase */}
        <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <ProductShowcase />
        </section>
      </div>
    </div>
  );
};

export default Index;
