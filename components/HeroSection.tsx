import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useGetAllSlidersQuery } from "@/redux/fetchers/slider/sliderApi";
import { Skeleton } from "./ui/skeleton";

function HeroSection() {
  const { data, isLoading } = useGetAllSlidersQuery(undefined);

  if (isLoading) {
    return (
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {[...Array(2)].map((_, idx) => (
            <CarouselItem key={idx} className="pl-4 md:basis-1/1 lg:basis-1/1">
              <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Side: Text Skeleton */}
                    <div className="space-y-4">
                      <Skeleton className="h-6 w-32" /> {/* Badge */}
                      <Skeleton className="h-10 w-3/4" /> {/* Title */}
                      <Skeleton className="h-20 w-full" /> {/* Description */}
                      <Skeleton className="h-12 w-40 rounded-lg" />{" "}
                      {/* Button */}
                    </div>

                    {/* Right Side: Image Skeleton */}
                    <div>
                      <Skeleton className="h-[300px] w-[300px] rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {data?.data?.map((slider: any) => (
          <CarouselItem
            key={slider.id}
            className="pl-4 md:basis-1/1 lg:basis-1/1"
          >
            <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-800 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Side: Text */}
                  <div className="text-white">
                    <Badge className="bg-red-600 hover:bg-red-700 mb-4">
                      FROM ${slider.product?.price ?? "N/A"}
                    </Badge>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                      {slider.title}
                    </h1>

                    <div
                      className="text-lg mb-8 text-gray-200 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: slider.description,
                      }}
                    />

                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                      {slider.buttonText ?? "Shop Now"}
                    </Button>
                  </div>

                  {/* Right Side: Image */}
                  <div className="relative">
                    <Image
                      src={slider.product?.images?.[0] || "/placeholder.png"}
                      alt={slider.product?.name || "Slider Image"}
                      width={600}
                      height={600}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default HeroSection;
