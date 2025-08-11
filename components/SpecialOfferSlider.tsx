
import { SpecialOffer } from "./SpecialOffer"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function SpecialOfferSlider() {
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                <CarouselItem>
                    <SpecialOffer />
                </CarouselItem>
                <CarouselItem>
                    <SpecialOffer />
                </CarouselItem>
                <CarouselItem>
                    <SpecialOffer />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious
                className="left-4 hidden md:flex"
                variant="default"
                size="lg"
            />
            <CarouselNext
                className="right-4 hidden md:flex"
                variant="default"
                size="lg"
            />
        </Carousel>
    )
}
