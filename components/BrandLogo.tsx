"use client";

import { useGetAllBrandQuery } from "@/redux/fetchers/brand/brandApi";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function BrandLogo() {
  const { data } = useGetAllBrandQuery();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Trusted Brands</h2>
          <p className="text-gray-600">
            We partner with the world's leading brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {data?.data?.map((brand, index) => (
            <Card
              key={index}
              className="flex flex-col items-center p-4 shadow-sm border rounded-lg hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center">
                <div className="w-24 h-24 relative overflow-hidden rounded-full">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name || `Brand ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 text-center font-medium">{brand.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandLogo;
