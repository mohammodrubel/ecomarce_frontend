export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export interface Product {
  id: string;
  name: string;
  description: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  stock: number;
  sku: string;
  brandId: string;
  categoryId: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  badge: string;
  inStock: boolean;
  createdAt: string; // could use Date if you parse it
  updatedAt: string;
  category: Category;
  brand: Brand;
}