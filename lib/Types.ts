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
  discountType?: string;
  discountValue?: number;
  discountStart?: string; // ISO string
  discountEnd?: string; // ISO string
  stock: number;
  sku: string;
  brandId: string;
  categoryId: string;
  images: string[];
  rating?: number;
  reviewsCount?: number;
  badge?:
    | "HOT"
    | "NEW"
    | "UPCOMING"
    | "SALE"
    | "FEATURED"
    | "LIMITED"
    | "BESTSELLER"
    | "TRENDING"
    | "EXCLUSIVE";
  inStock: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  category: {
    id: string;
    name: string;
    icon: string;
    subcategories: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  brand: {
    id: string;
    logo: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}
export type BrandInfo = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
};

export type BrandResponse = {
  success: boolean;
  message: string;
  data?: BrandInfo;
};