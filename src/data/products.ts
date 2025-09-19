export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  points: number;
  category: "Electronics" | "Fashion" | "Beauty" | "Food & Drink" | string;
  // Discount-specific fields (optional)
  discount?: number; // percentage e.g., 55
  salePrice?: number;
  stock?: number;
};

export const products: Product[] = [
  // Featured/general products
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 156,
    points: 150,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Organic Coffee Blend",
    price: 24,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 89,
    points: 25,
    category: "Food & Drink",
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 203,
    points: 100,
    category: "Electronics",
  },
  {
    id: "4",
    name: "Luxury Skincare Set",
    price: 89,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 67,
    points: 45,
    category: "Beauty",
  },
  {
    id: "5",
    name: "Designer Backpack",
    price: 149,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 134,
    points: 75,
    category: "Fashion",
  },
  {
    id: "6",
    name: "Smart Home Speaker",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=300&fit=crop",
    rating: 4.4,
    reviewCount: 98,
    points: 40,
    category: "Electronics",
  },

  // Discounted products (flash sale)
  {
    id: "d1",
    name: "Premium Wireless Earbuds Pro",
    price: 89,
    salePrice: 89,
    originalPrice: 199,
    discount: 55,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 234,
    stock: 12,
    points: 90,
    category: "Electronics",
  },
  {
    id: "d2",
    name: "Smart Home Bundle",
    price: 149,
    salePrice: 149,
    originalPrice: 299,
    discount: 50,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 156,
    stock: 8,
    points: 150,
    category: "Electronics",
  },
  {
    id: "d3",
    name: "Designer Sunglasses",
    price: 48,
    salePrice: 48,
    originalPrice: 120,
    discount: 60,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 89,
    stock: 15,
    points: 50,
    category: "Fashion",
  },
];

export const getCategories = (): string[] => {
  const base = new Set<string>(["All"]);
  for (const p of products) base.add(p.category);
  return Array.from(base);
};
