import Image from 'next/image'
import apple from '../assts/apple.jpg'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'


function HeroSection() {
  return (
    <Carousel className="w-full">
      <CarouselContent className=" -ml-4">
        {[...Array(3)].map((_, idx) => (
          <CarouselItem key={idx} className="pl-4 md:basis-1/1 lg:basis-1/1">
            {/* Your exact HeroSection JSX goes here unchanged */}
            <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-800 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-white">
                    <Badge className="bg-red-600 hover:bg-red-700 mb-4">FROM $1399</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                      MacBook Pro 14 and 16
                    </h1>
                    <p className="text-lg mb-8 text-gray-200 leading-relaxed">
                      Just trade in your eligible computer for credit toward a new one or recycle it for free. Its good for you
                      and the planet.*
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                      Buy Smart Phones
                    </Button>
                  </div>
                  <div className="relative">
                    <Image
                      src={apple}
                      alt="MacBook Pro showcase"
                      width={600}
                      height={600}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>

  )
}

export default HeroSection