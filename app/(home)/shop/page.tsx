"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Grid, List, Star, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 1000])

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=300&width=300&text=Headphones",
      rating: 4.5,
      reviews: 128,
      badge: "Best Seller",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      originalPrice: 249.99,
      image: "/placeholder.svg?height=300&width=300&text=Smart+Watch",
      rating: 4.8,
      reviews: 89,
      badge: "New",
      category: "Electronics",
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 49.99,
      originalPrice: 69.99,
      image: "/placeholder.svg?height=300&width=300&text=Backpack",
      rating: 4.3,
      reviews: 256,
      badge: "Sale",
      category: "Fashion",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=300&width=300&text=Speaker",
      rating: 4.6,
      reviews: 167,
      badge: "Popular",
      category: "Electronics",
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=300&width=300&text=Shoes",
      rating: 4.4,
      reviews: 203,
      badge: "Sale",
      category: "Sports",
    },
    {
      id: 6,
      name: "Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      image: "/placeholder.svg?height=300&width=300&text=Coffee+Maker",
      rating: 4.7,
      reviews: 145,
      badge: "Popular",
      category: "Home",
    },
  ]

  const categories = ["Electronics", "Fashion", "Sports", "Home", "Books", "Beauty"]
  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG"]

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <label
                htmlFor={brand}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                <div className="flex mr-2">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                & Up
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-gray-600">Discover our complete collection of products</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="mt-8">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              <span className="text-sm text-gray-600">Showing {products.length} products</span>
            </div>

            <div className="flex items-center gap-4">
              <Select defaultValue="featured">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <Link href={`/product/${product.id}`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover rounded-t-lg"
                          />
                        </Link>
                        <Badge className="absolute top-2 left-2">{product.badge}</Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold mb-2 hover:text-primary">{product.name}</h3>
                        </Link>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold">${product.price}</span>
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        </div>
                        <Button className="w-full">Add to Cart</Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-4 p-4">
                      <div className="relative flex-shrink-0">
                        <Link href={`/product/${product.id}`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={150}
                            height={150}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </Link>
                        <Badge className="absolute top-2 left-2 text-xs">{product.badge}</Badge>
                      </div>
                      <div className="flex-1">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold mb-2 hover:text-primary">{product.name}</h3>
                        </Link>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Category: {product.category}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">${product.price}</span>
                            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button>Add to Cart</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">1</Button>
              <Button>2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}