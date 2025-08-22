"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import tv from '../assts/tv.png'
import Image from "next/image"

export function SpecialOffer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 21,
    minutes: 27,
    seconds: 42,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Special Offer</CardTitle>
        <p className="text-orange-100 text-sm">Limited stock, buy before they run out!</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white/20 rounded p-2">
            <div className="text-lg font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
            <div className="text-xs">Days</div>
          </div>
          <div className="bg-white/20 rounded p-2">
            <div className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
            <div className="text-xs">Hours</div>
          </div>
          <div className="bg-white/20 rounded p-2">
            <div className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
            <div className="text-xs">Min</div>
          </div>
          <div className="bg-white/20 rounded p-2">
            <div className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
            <div className="text-xs">Sec</div>
          </div>
        </div>

        {/* Product */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="relative mb-3">
            <Image
              src={tv}
              alt="65 UHD 4K Smart TV"
              width={200}
              height={120}
              className="w-full h-24 object-cover rounded"
            />
            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">4%</div>
          </div>

          <h3 className="font-semibold mb-2">65 UHD 4K Smart TV</h3>
          <div className="text-2xl font-bold mb-3">$239.00</div>

          {/* Stock Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sold: 0</span>
              <span>Available: 100</span>
            </div>
            <Progress value={0} className="h-2 bg-white/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
