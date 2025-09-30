import { ArrowRight } from "lucide-react";

import imagetwo from "../assts/tv.png";
import ProductCard, { Product } from "./ProductCard";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import imageOne from '../assts/apple.jpg'

function FeaturedProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
     const productsData = [
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
      setProducts(productsData);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="h-4 w-64 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 animate-pulse"
              >
                <div className="h-64 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Handpicked products just for you</p>
          </div>
          <Button variant="outline">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
