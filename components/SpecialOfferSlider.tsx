import { SpecialOffer } from "./SpecialOffer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function SpecialOfferSlider() {
  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-1">
          {[1, 2, 3].map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-full"
            >
              <div className="p-1">
                <SpecialOffer />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons - hidden on mobile, shown on md+ */}
        <CarouselPrevious
          className="left-1 hidden md:flex"
          variant="default"
          size="default"
        />
        <CarouselNext
          className="right-1 hidden md:flex"
          variant="default"
          size="default"
        />
      </Carousel>
    </div>
  );
}
