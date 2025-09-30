"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingCart, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Updated interface to match your actual data structure
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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Safe image handling with optional chaining
  const images = product?.images || [];
  const mainImage = images[0] || "/placeholder.svg";
  const hoverImage = images[1] || images[0] || "/placeholder.svg";

  // Calculate discount percentage safely
  const discountPercentage =
    product?.originalPrice > product?.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  // Stock status calculation with safe defaults
  const getStockStatus = () => {
    const stock = product?.stock || 0;
    const inStock = product?.inStock ?? true;

    if (stock === 0 || !inStock) {
      return {
        status: "out-of-stock",
        text: "Out of Stock",
        color: "text-red-600",
        bgColor: "bg-red-100",
        progress: 100,
        progressColor: "from-red-500 to-red-600",
      };
    } else if (stock <= 10) {
      const progress = Math.min(95, ((50 - stock) / 50) * 100);
      return {
        status: "low-stock",
        text: `Only ${stock} left`,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        progress,
        progressColor: "from-orange-400 to-orange-500",
      };
    } else {
      return {
        status: "in-stock",
        text: `In Stock`,
        color: "text-green-600",
        bgColor: "bg-green-100",
        progress: 72,
        progressColor: "from-green-400 to-blue-500",
      };
    }
  };

  const stockStatus = getStockStatus();

  // Safe product data with fallbacks
  const productName = product?.name || "Unnamed Product";
  const productPrice = product?.price || 0;
  const originalPrice = product?.originalPrice || productPrice;
  const productRating = product?.rating || 0;
  const reviewsCount = product?.reviewsCount || 0;
  const productBadge = product?.badge || "";
  const productId = product?.id || "";

  return (
    <Card
      className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/80 py-0 hover:from-gray-50 hover:to-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-0 relative">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Link href={`/product/${productId}`}>
            <div className="relative h-72 w-full cursor-pointer">
              {/* Main Image */}
              <Image
                src={mainImage}
                alt={productName}
                width={400}
                height={400}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  isHovered && images.length > 1
                    ? "opacity-0 scale-110"
                    : "opacity-100 scale-100"
                }`}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />

              {/* Hover Image (if available) */}
              {images.length > 1 && (
                <Image
                  src={hoverImage}
                  alt={productName}
                  width={400}
                  height={400}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              )}
            </div>
          </Link>

          {/* Badge */}
          {productBadge && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 border-0 text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-3 h-3 mr-1" />
              {productBadge}
            </Badge>
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 right-3 bg-green-500 border-0 text-white shadow-lg">
              {discountPercentage}% OFF
            </Badge>
          )}

          {/* Quick Actions */}
          <div
            className={`absolute top-12 right-3 flex flex-col gap-2 transition-all duration-500 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
          >
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 shadow-lg border-0 transition-all duration-300"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 shadow-lg border-0 transition-all duration-300"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              className={`w-full ${
                stockStatus.status === "out-of-stock"
                  ? "bg-gray-400 hover:bg-gray-400 text-white cursor-not-allowed"
                  : "bg-white text-black hover:bg-white/90 hover:scale-105"
              } transition-all duration-300 shadow-lg border-0`}
              disabled={stockStatus.status === "out-of-stock"}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {stockStatus.status === "out-of-stock"
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product?.category?.name && (
            <p className="text-xs text-gray-500 mb-1 capitalize">
              {product.category.name}
            </p>
          )}

          {/* Product Name */}
          <Link href={`/product/${productId}`}>
            <h3 className="font-semibold text-base mb-2 hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
              {productName}
            </h3>
          </Link>

          {/* Brand */}
          {product?.brand?.name && (
            <p className="text-sm text-gray-600 mb-2">{product.brand.name}</p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(productRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({reviewsCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${productPrice}
              </span>
              {originalPrice > productPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className={`font-medium ${stockStatus.color}`}>
                {stockStatus.text}
              </span>
            </div>
            {/* Progress Bar - Only show for low stock */}
            {stockStatus.status === "low-stock" && (
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full bg-gradient-to-r ${stockStatus.progressColor}`}
                  style={{ width: `${stockStatus.progress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0  border-transparent group-hover:border-blue-200 rounded-lg transition-all duration-500 pointer-events-none" />
      </CardContent>
    </Card>
  );
}
