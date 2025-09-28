"use client";

import { useState, useEffect } from "react";
import { Filter, Grid, List, Star } from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import ProductTableRow from "../../../components/ProductTableRow";
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
import imageOne from "../../../assts/apple.jpg";
import imagetwo from "../../../assts/tv.png";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: any;
  hoverImage: any;
  rating: number;
  reviews: number;
  badge: string;
  category: string;
  colors: string[];
  features: string[];
  stock: number;
  sku: string;
}

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    "Electronics",
    "Fashion",
    "Sports",
    "Home",
    "Books",
    "Beauty",
  ];
  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG"];

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
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
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
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
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
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
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

  const ProductTableRowSkeleton = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-2 flex items-center gap-3">
          <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="lg:col-span-3 space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="lg:col-span-2 space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="lg:col-span-2">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="lg:col-span-3 flex gap-2">
          <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      originalPrice: 129.99,
      image: imageOne,
      hoverImage: imagetwo,
      rating: 4.5,
      reviews: 128,
      badge: "Best Seller",
      category: "Electronics",
      colors: ["#000000", "#FF6B6B", "#4ECDC4"],
      features: ["Noise Cancelling", "30h Battery", "Fast Charge"],
      stock: 45,
      sku: "WH-001",
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      price: 199.99,
      originalPrice: 249.99,
      image: imageOne,
      hoverImage: imagetwo,
      rating: 4.8,
      reviews: 89,
      badge: "New",
      category: "Electronics",
      colors: ["#2C3E50", "#E74C3C", "#3498DB"],
      features: ["Heart Rate", "GPS", "Waterproof"],
      stock: 32,
      sku: "SW-002",
    },
    {
      id: 3,
      name: "Premium Laptop Backpack",
      price: 49.99,
      originalPrice: 69.99,
      image: imageOne,
      hoverImage: imagetwo,
      rating: 4.3,
      reviews: 256,
      badge: "Sale",
      category: "Fashion",
      colors: ["#1A1A1A", "#8B4513", "#2F4F4F"],
      features: ["Waterproof", "Laptop Sleeve", "USB Charging"],
      stock: 78,
      sku: "BP-003",
    },
    {
      id: 4,
      name: "Bluetooth Speaker Pro",
      price: 79.99,
      originalPrice: 99.99,
      image: imageOne,
      hoverImage: imagetwo,
      rating: 4.6,
      reviews: 167,
      badge: "Popular",
      category: "Electronics",
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
      features: ["360° Sound", "24h Battery", "Party Mode"],
      stock: 56,
      sku: "SP-004",
    },
    {
      id: 5,
      name: "Running Shoes AirMax",
      price: 89.99,
      originalPrice: 119.99,
      image: imageOne,
      hoverImage: imagetwo,
      rating: 4.4,
      reviews: 203,
      badge: "Sale",
      category: "Sports",
      colors: ["#E74C3C", "#2C3E50", "#27AE60"],
      features: ["Air Cushion", "Breathable", "Lightweight"],
      stock: 23,
      sku: "SH-005",
    },
    {
      id: 6,
      name: "Smart Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      image: imageOne,
      hoverImage: imagetwo,
      rating: 4.7,
      reviews: 145,
      badge: "Popular",
      category: "Home",
      colors: ["#34495E", "#7F8C8D", "#16A085"],
      features: ["WiFi Connect", "Programmable", "Grinder"],
      stock: 67,
      sku: "CM-006",
    },
  ];

  if (loading) {
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
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse ml-1"></div>
                  </div>
                </div>
              </div>

              {/* Products Grid Skeleton */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                  {[...Array(8)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Table Header Skeleton */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="h-4 bg-gray-200 rounded animate-pulse"
                        style={{
                          gridColumn: `span ${
                            index === 0
                              ? 2
                              : index === 1
                              ? 3
                              : index === 2
                              ? 2
                              : index === 3
                              ? 2
                              : 3
                          }`,
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Table Rows Skeleton */}
                  {[...Array(6)].map((_, index) => (
                    <ProductTableRowSkeleton key={index} />
                  ))}
                </div>
              )}

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
                    {products.length}
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

                <div className="flex bg-gray-100 rounded-xl p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-lg transition-all duration-300"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-lg transition-all duration-300"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/Table */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Table Header */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100">
                  <div className="lg:col-span-2 font-semibold text-gray-700">
                    Product
                  </div>
                  <div className="lg:col-span-3 font-semibold text-gray-700">
                    Details
                  </div>
                  <div className="lg:col-span-2 font-semibold text-gray-700">
                    Info
                  </div>
                  <div className="lg:col-span-2 font-semibold text-gray-700">
                    Price
                  </div>
                  <div className="lg:col-span-3 font-semibold text-gray-700">
                    Actions
                  </div>
                </div>

                {/* Table Rows */}
                {products.map((product) => (
                  <ProductTableRow key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8 md:mt-12">
              <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-gray-100">
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                >
                  1
                </Button>
                <Button className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 border-0 shadow-lg">
                  2
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
