"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useGetSingleSpecialOfferQuery } from "@/redux/fetchers/special-offer/specialOffer";

// 🟠 Countdown Hook
function useCountdown(validUntil?: string | null) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!validUntil) return;
    const endTime = new Date(validUntil).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [validUntil]);

  return timeLeft;
}

export function SpecialOffer() {
  const { data, isLoading } = useGetSingleSpecialOfferQuery(undefined);
  const offer = data?.data?.[0]; // single special offer
  const timeLeft = useCountdown(offer?.validUntil);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            <Skeleton className="h-6 w-40 bg-white/20" />
          </CardTitle>
          <Skeleton className="h-4 w-60 mt-2 bg-white/20" />
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Countdown Skeleton */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded bg-white/20" />
            ))}
          </div>

          {/* Product Skeleton */}
          <div className="bg-white/10 rounded-lg p-4 space-y-3">
            <Skeleton className="h-24 w-full rounded bg-white/20" />
            <Skeleton className="h-5 w-32 bg-white/20" />
            <Skeleton className="h-8 w-24 bg-white/20" />
            <Skeleton className="h-2 w-full bg-white/20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!offer) {
    return <p className="text-center text-gray-500">No special offer found.</p>;
  }

  return (
    <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{offer.title}</CardTitle>
        <p className="text-orange-100 text-sm">{offer.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Countdown Timer */}
        {offer.validUntil && (
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white/20 rounded p-2">
              <div className="text-lg font-bold">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-xs">Days</div>
            </div>
            <div className="bg-white/20 rounded p-2">
              <div className="text-lg font-bold">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-xs">Hours</div>
            </div>
            <div className="bg-white/20 rounded p-2">
              <div className="text-lg font-bold">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-xs">Min</div>
            </div>
            <div className="bg-white/20 rounded p-2">
              <div className="text-lg font-bold">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-xs">Sec</div>
            </div>
          </div>
        )}

        {/* Product */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="relative mb-3">
            <Image
              src={offer.image || offer.product?.images?.[0] || "/fallback.png"}
              alt={offer.product?.name || offer.title}
              width={200}
              height={120}
              className="w-full h-24 object-cover rounded"
            />
            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              {offer.discountPercentage ?? "10"}%
            </div>
          </div>

          <h3 className="font-semibold mb-2">{offer.product?.name}</h3>
          <div className="text-2xl font-bold mb-3">
            ${offer.price ?? "239.00"}
          </div>

          {/* Stock Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Available: {offer.available ?? 100}</span>
            </div>
            <Progress
              value={
                offer.sold ? (offer.sold / (offer.available || 100)) * 100 : 0
              }
              className="h-2 bg-white/20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
