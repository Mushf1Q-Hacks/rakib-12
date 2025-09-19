import { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "@/components/layout/Navbar";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import { StoreProvider } from "@/context/store";
import GlobalStyles from "@/theme/GlobalStyles";

const queryClient = new QueryClient();

const App = () => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering the theme provider on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StoreProvider>
          <TooltipProvider>
            <GlobalStyles />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
              <ProductDetailDialog />
            </BrowserRouter>
          </TooltipProvider>
        </StoreProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
