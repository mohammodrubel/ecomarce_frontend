import { ArrowRight, Heart, Star } from 'lucide-react'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

function FeaturedProducts() {
    const featuredProducts = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            originalPrice: 129.99,
            image: "/placeholder.svg?height=300&width=300&text=Headphones",
            rating: 4.5,
            reviews: 128,
            badge: "Best Seller",
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
        },
    ]
    return (
        <section className="py-16 bg-gray-50">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
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
                                    <Badge className="absolute top-2 left-2">{product.badge}</Badge>
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
                                        <span className="text-sm text-gray-500 line-through">{product.price}</span>
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

export default FeaturedProducts