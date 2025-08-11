import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import apple from '../assts/apple.jpg'

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <Badge className="bg-red-600 hover:bg-red-700 mb-4">FROM $1399</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">MacBook Pro 14 and 16</h1>
            <p className="text-lg mb-8 text-gray-200 leading-relaxed">
              Just trade in your eligible computer for credit toward a new one or recycle it for free. Its good for you
              and the planet.*
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">Buy Smart Phones</Button>
          </div>
          <div className="relative">
            <Image
              src={apple}
              alt="MacBook Pro showcase"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full opacity-50" />
        <div className="w-2 h-2 bg-white rounded-full" />
        <div className="w-2 h-2 bg-white rounded-full opacity-50" />
      </div>
    </div>
  )
}
