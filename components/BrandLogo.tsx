import Image from 'next/image'
import React from 'react'

function BrandLogo() {
     const brands = [
    "/placeholder.svg?height=80&width=120&text=Brand+1",
    "/placeholder.svg?height=80&width=120&text=Brand+2",
    "/placeholder.svg?height=80&width=120&text=Brand+3",
    "/placeholder.svg?height=80&width=120&text=Brand+4",
    "/placeholder.svg?height=80&width=120&text=Brand+5",
    "/placeholder.svg?height=80&width=120&text=Brand+6",
  ]

  return (
    <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Trusted Brands</h2>
            <p className="text-gray-600">We partner with the world's leading brands</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={brand || "/placeholder.svg"}
                  alt={`Brand ${index + 1}`}
                  width={120}
                  height={80}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default BrandLogo