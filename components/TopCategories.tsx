import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { useGetAllCategoryQuery } from "@/redux/fetchers/categoryApi/categoryApi";
import { Category } from "@/lib/Types";
import { Skeleton } from "./ui/skeleton";

function TopCategories() {
  const { isLoading, isError, data } = useGetAllCategoryQuery(undefined);
  const mainData = data?.data;

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="text-center p-4">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-5 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600">
              Explore our wide range of product categories
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-red-500">
              Failed to load categories. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 gap-6">
          {mainData?.map((category: Category) => (
            <Card
              key={category.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="text-center">
                <Image
                  src={category.icon || "/placeholder.svg"}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">{category.name}</h3>
                {/* <p className="text-sm text-gray-500">{category.count}</p> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopCategories;
