"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

// ⏳ Countdown Hook
function useCountdown(validUntil?: string | null) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
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

        setTimeLeft({ days, hours, minutes, seconds, expired: false });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [validUntil]);

  return timeLeft;
}

// 🟠 Special Offer Card
export function SpecialOffer({ offer }: { offer: any }) {
  const timeLeft = useCountdown(offer?.validUntil);

  if (!offer) {
    return (
      <Card className="p-6 text-center">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-24 w-full rounded" />
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{offer.title}</CardTitle>
        <p className="text-orange-100 text-sm">
          {offer.description?.slice(0, 30)}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Countdown */}
        {offer.validUntil && !timeLeft.expired ? (
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
        ) : (
          <div className="text-center text-lg font-semibold bg-white/20 p-2 rounded">
            Offer Ended
          </div>
        )}

        {/* Product Info */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="relative w-[150] mx-auto aspect-square mb-3">
            <Image
              src={offer.product?.images?.[0] || "/fallback.png"}
              alt={offer.product?.name || offer.title}
              width={150}
              height={150}
              className="object-contain rounded"
            />
          </div>
          <h3 className="font-semibold mb-2">{offer.product?.name}</h3>
          <div className="text-2xl font-bold mb-3">
            ${offer.price ?? "239.00"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
