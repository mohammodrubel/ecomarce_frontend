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
import { useGetAllProductsQuery } from "@/redux/fetchers/products/productsApi";
import { Product } from "@/lib/Types";





export default function ProductTable() {
  const {isLoading,isError,data} = useGetAllProductsQuery(undefined)
  return (
    <div className="container mx-auto">
      <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subcategory</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Badge</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((product: Product) => (
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
                <TableCell>{product?.category?.name}</TableCell>
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
    </div>
  );
}
