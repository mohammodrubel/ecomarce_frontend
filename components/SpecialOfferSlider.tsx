"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SpecialOffer } from "./SpecialOffer";
import {
  useGetAllSpecialOffersQuery,
} from "@/redux/fetchers/special-offer/specialOffer";

export function SpecialOfferSlider() {
  const { data, isLoading } = useGetAllSpecialOffersQuery(undefined);
  const offers = data?.data ?? [];

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading offers...</p>;
  }

  if (!offers.length) {
    return (
      <p className="text-center text-gray-500">No special offers found.</p>
    );
  }

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
          {offers.map((offer: any) => (
            <CarouselItem
              key={offer.id}
              className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-full"
            >
              <div className="p-1">
                <SpecialOffer offer={offer} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons - hidden on mobile, shown on md+ */}
        <CarouselPrevious className="left-1 bg-white text-black hover:bg-white hover:text-black hidden md:flex" />
        <CarouselNext className="right-1 bg-white text-black hover:bg-white hover:text-black hidden md:flex" />
      </Carousel>
    </div>
  );
}
