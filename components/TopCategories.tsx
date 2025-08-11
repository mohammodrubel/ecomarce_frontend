import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'

function TopCategories() {
     const categories = [
    { name: "Electronics", image: "/placeholder.svg?height=200&width=200&text=Electronics", count: "2,341 items" },
    { name: "Fashion", image: "/placeholder.svg?height=200&width=200&text=Fashion", count: "5,678 items" },
    { name: "Home & Garden", image: "/placeholder.svg?height=200&width=200&text=Home", count: "1,234 items" },
    { name: "Sports", image: "/placeholder.svg?height=200&width=200&text=Sports", count: "987 items" },
    { name: "Books", image: "/placeholder.svg?height=200&width=200&text=Books", count: "3,456 items" },
    { name: "Beauty", image: "/placeholder.svg?height=200&width=200&text=Beauty", count: "2,109 items" },
  ]
  return (
    <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600">Explore our wide range of product categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="mx-auto mb-4 rounded-full"
                    />
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
  )
}

export default TopCategories