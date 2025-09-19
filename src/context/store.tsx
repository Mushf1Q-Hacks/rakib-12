import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  qty: number;
};

type StoreState = {
  cart: CartItem[];
  favorites: Record<string, boolean>; // productId -> true
  selectedProduct: Product | null; // for detail dialog
  // actions
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  cartCount: number;
};

const StoreContext = createContext<StoreState | undefined>(undefined);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((c) => c.product.id !== productId));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const openProduct = (product: Product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);

  const cartCount = useMemo(() => cart.reduce((acc, c) => acc + c.qty, 0), [cart]);

  const value = useMemo(
    () => ({
      cart,
      favorites,
      selectedProduct,
      addToCart,
      removeFromCart,
      toggleFavorite,
      openProduct,
      closeProduct,
      cartCount,
    }),
    [cart, favorites, selectedProduct]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
