"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  stock: number;
  sku: string;
  brandId: string;
  categoryId: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

const sampleData: Product[] = [
  {
    id: "76dfe4f1-ce24-4a01-a462-a4aed217de16",
    name: "Wireless Bluetooth Headphones",
    description: "Noise-cancelling over-ear headphones with long battery life.",
    subcategory: "Headphones",
    price: 99.99,
    originalPrice: 129.99,
    stock: 50,
    sku: "WH-2025-BT",
    brandId: "1644fd47-1b43-4f6b-a3b0-153e4582f8e0",
    categoryId: "ad36bb72-e80e-42c4-b7b6-9ef2785746c2",
    images: [
      "https://res.cloudinary.com/de2ysphks/image/upload/v1755984325/03-25-24%20GMT%2B0600%20%28Bangladesh%20Standard%20Time%29-Screenshot%202025-08-23%20034557.png.png",
      "https://res.cloudinary.com/de2ysphks/image/upload/v1755984326/03-25-27%20GMT%2B0600%20%28Bangladesh%20Standard%20Time%29-Screenshot%202025-08-23%20034557.png.png",
      "https://res.cloudinary.com/de2ysphks/image/upload/v1755984327/03-25-28%20GMT%2B0600%20%28Bangladesh%20Standard%20Time%29-Screenshot%202025-08-23%20034557.png.png",
    ],
    rating: 4.5,
    reviewsCount: 128,
    badge: "Best Seller",
    inStock: true,
    createdAt: "2025-08-23T21:25:28.964Z",
    updatedAt: "2025-08-23T21:25:28.964Z",
  },
];

export default function ProductTable() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-semibold">{product.name}</TableCell>
              <TableCell>{product.subcategory}</TableCell>
              <TableCell>
                <span className="text-green-600 font-bold">
                  ${product.price}
                </span>{" "}
                <span className="line-through text-gray-400 text-sm">
                  ${product.originalPrice}
                </span>
              </TableCell>
              <TableCell>
                {product.inStock ? (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-600"
                  >
                    In Stock ({product.stock})
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </TableCell>
              <TableCell>
                {product.badge && (
                  <Badge variant="secondary">{product.badge}</Badge>
                )}
              </TableCell>
              <TableCell>
                ⭐ {product.rating} ({product.reviewsCount})
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Pencil className="h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer">
                      <Trash className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
