"use client";

import { useState } from "react";
import { Filter, Star } from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetAllProductsQuery } from "@/redux/fetchers/products/productsApi";

export interface Product {
  id: string;
  name: string;
  description: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountType: string | null;
  discountValue: number | null;
  discountStart: string | null;
  discountEnd: string | null;
  stock: number;
  sku: string;
  brandId: string;
  categoryId: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  badge: string;
  inStock: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    icon: string;
    subcategories: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  brand?: {
    id: string;
    logo: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function ShopPage() {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  const mainData = data?.data || [];
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Extract unique categories and brands from actual data
  const categories = [
    ...new Set(
      mainData.map((product) => product.category?.name).filter(Boolean)
    ),
  ] as string[];
  const brands = [
    ...new Set(mainData.map((product) => product.brand?.name).filter(Boolean)),
  ] as string[];

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4 text-lg">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:text-primary cursor-pointer transition-colors"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-lg">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span> ৳ {priceRange[0]}</span>
            <span> ৳ {priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-lg">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <label
                htmlFor={brand}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:text-primary cursor-pointer transition-colors"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-lg">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <label
                htmlFor={`rating-${rating}`}
                className="flex items-center text-sm hover:text-primary cursor-pointer transition-colors"
              >
                <div className="flex mr-2">
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                & Up
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FilterSidebarSkeleton = () => (
    <div className="space-y-6">
      <div>
        <div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex justify-between">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div>
        <div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[...Array(rating)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 bg-gray-200 rounded-sm mx-0.5 animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductCardSkeleton = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse">
      <div className="relative">
        <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-4 w-16 bg-gray-200 rounded-full absolute top-2 left-2"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 bg-gray-200 rounded-sm mx-0.5"
              ></div>
            ))}
          </div>
          <div className="h-3 w-8 bg-gray-200 rounded ml-1"></div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Handle error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Failed to load products
          </h2>
          <p className="text-gray-600 mb-4">
            There was an error loading the products. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Show skeleton loading while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Desktop Filters Skeleton */}
            <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-24 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <FilterSidebarSkeleton />
              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1">
              {/* Toolbar Skeleton */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="lg:hidden h-9 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* Products Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>

              {/* Pagination Skeleton */}
              <div className="flex justify-center mt-8 md:mt-12">
                <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-gray-100">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="h-9 w-16 bg-gray-200 rounded-xl animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl font-bold">Filters</h2>
              </div>
              <FilterSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden bg-white border-gray-200 hover:bg-gray-50"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <div className="mt-8">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  Showing{" "}
                  <span className="text-blue-600 font-bold">
                    {mainData.length}
                  </span>{" "}
                  products
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {mainData.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  There are no products available at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                {mainData.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
