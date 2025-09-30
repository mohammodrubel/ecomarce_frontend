"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingCart, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: number | string;
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

export default function ProductCard({ product }: { product: Product }) {
  const [hoveredProduct, setHoveredProduct] = useState<number>();

  // Calculate progress bar values based on stock
  const calculateProgress = () => {
    if (product.stock === 0) {
      return {
        soldPercentage: 100,
        availablePercentage: 0,
        progressColor: "from-red-500 to-red-600",
        soldTextColor: "text-red-600",
        availableTextColor: "text-red-500",
        soldText: "Sold Out",
        availableText: "0%",
      };
    } else if (product.stock <= 10) {
      const soldPercentage = Math.min(
        95,
        Math.round(((50 - product.stock) / 50) * 100)
      );
      return {
        soldPercentage,
        availablePercentage: 100 - soldPercentage,
        progressColor: "from-orange-400 to-orange-500",
        soldTextColor: "text-orange-600",
        availableTextColor: "text-orange-500",
        soldText: `Sold: ${soldPercentage}%`,
        availableText: `Low Stock`,
      };
    } else {
      const soldPercentage = 72; // Default value
      return {
        soldPercentage,
        availablePercentage: 28,
        progressColor: "from-green-400 to-blue-500",
        soldTextColor: "text-green-600",
        availableTextColor: "text-blue-500",
        soldText: `Sold: ${soldPercentage}%`,
        availableText: `Available: ${product.stock}`,
      };
    }
  };

  const progressData = calculateProgress();

  return (
    <Card
      className="group relative overflow-hidden bg-gradient-to-br from-white py-0 to-gray-50/80 hover:from-gray-50 hover:to-white border-0 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-0 relative">
        {/* Image Container with Advanced Hover Effects */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Link href={`/product/${product.id}`}>
            <div className="relative h-80 w-full">
              {/* Main Image */}
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  hoveredProduct === product.id
                    ? "opacity-0 scale-110 rotate-2"
                    : "opacity-100 scale-100 rotate-0"
                }`}
              />

              {/* Hover Image */}
              <Image
                src={product.hoverImage || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  hoveredProduct === product.id
                    ? "opacity-100 scale-100 -rotate-2"
                    : "opacity-0 scale-90 rotate-0"
                }`}
              />
            </div>
          </Link>

          {/* Badge with Animation */}
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 border-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-3 h-3 mr-1" />
            {product.badge}
          </Badge>

          {/* Quick Actions */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-500 ${
              hoveredProduct === product.id
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

          {/* Color Options */}
          <div
            className={`absolute bottom-3 left-3 flex gap-2 transition-all duration-500 ${
              hoveredProduct === product.id
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
          
          </div>

          {/* Add to Cart Button Slide Up */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500 ${
              hoveredProduct === product.id
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              className={`w-full ${
                product.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-white text-black hover:bg-white/90 hover:scale-105"
              } transition-all duration-300 shadow-lg border-0`}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="text-xs font-medium bg-green-100 text-green-600 px-2 py-1 rounded-full">
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
                OFF
              </span>
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-lg transition-all duration-500 pointer-events-none" />
      </CardContent>
    </Card>
  );
}
