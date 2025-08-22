import React from 'react'
import { Card, CardContent } from './ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'

function CustomerTestimonials() {
      const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing quality products and fast shipping! Highly recommend this store.",
      image: "/placeholder.svg?height=60&width=60&text=Sarah",
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Great customer service and competitive prices. My go-to online store.",
      image: "/placeholder.svg?height=60&width=60&text=Mike",
    },
    {
      name: "Emily Davis",
      rating: 4,
      comment: "Love the variety of products available. Easy to navigate website.",
      image: "/placeholder.svg?height=60&width=60&text=Emily",
    },
  ]
  return (
     <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Dont just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-semibold">{testimonial.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default CustomerTestimonials