import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Heart, Star } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Badge } from './ui/badge'

function NewArrivals() {
  const newArrivals = [
    {
      id: 5,
      name: "Gaming Mouse",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300&text=Gaming+Mouse",
      rating: 4.7,
      reviews: 45,
    },
    {
      id: 6,
      name: "Wireless Charger",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300&text=Charger",
      rating: 4.4,
      reviews: 78,
    },
    {
      id: 7,
      name: "Phone Case",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300&text=Phone+Case",
      rating: 4.2,
      reviews: 134,
    },
    {
      id: 8,
      name: "USB Cable",
      price: 12.99,
      image: "/placeholder.svg?height=300&width=300&text=USB+Cable",
      rating: 4.5,
      reviews: 89,
    },
  ]
  return (
    <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
              <p className="text-gray-600">Check out our latest products</p>
            </div>
            <Button variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
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
                      <span className="text-lg font-bold">{product.price}</span>
                    </div>
                    <Button className="w-full">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default NewArrivals