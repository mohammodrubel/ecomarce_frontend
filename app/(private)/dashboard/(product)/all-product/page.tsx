"use client";

import { useState } from "react";
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
import { MoreHorizontal, Trash, Eye, Plus, Pencil } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/fetchers/products/productsApi";
import { Product } from "@/lib/Types";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function ProductTable() {
  const { isLoading, isError, data } = useGetAllProductsQuery(undefined);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const handleView = (product: Product) => {
    setViewingProduct(product);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    // Implement your delete logic here
    console.log("Deleting product:", productId);
    // dispatch(deleteProduct(productId)) etc.
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/dashboard/products/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

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
                      <DropdownMenuItem onClick={() => handleView(product)}>
                        <Eye className="h-4 w-4 mr-2" /> View
                      </DropdownMenuItem>

                      <Link href={`/dashboard/edit-product/${product.id}`}>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuItem
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600"
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Product Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Viewing details for {viewingProduct?.name}
            </DialogDescription>
          </DialogHeader>

          {viewingProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Images</h3>
                <div className="grid grid-cols-3 gap-2">
                  {viewingProduct.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`${viewingProduct.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <p className="font-semibold">{viewingProduct.name}</p>
                </div>

                <div>
                  <Label>Description</Label>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: viewingProduct.description,
                    }}
                    className="prose prose-sm max-w-none mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price</Label>
                    <p>${viewingProduct.price}</p>
                  </div>
                  <div>
                    <Label>Original Price</Label>
                    <p>${viewingProduct.originalPrice}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Stock</Label>
                    <p>{viewingProduct.stock}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p>
                      {viewingProduct.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>

                <div>
                  <Label>SKU</Label>
                  <p>{viewingProduct.sku}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Discount Type</Label>
                    <p>{viewingProduct.discountType}</p>
                  </div>
                  <div>
                    <Label>Discount Value</Label>
                    <p>{viewingProduct.discountValue}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <p>{viewingProduct.category?.name}</p>
                  </div>
                  <div>
                    <Label>Brand</Label>
                    <p>{viewingProduct.brand?.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Rating</Label>
                    <p>
                      {viewingProduct.rating} ⭐ ({viewingProduct.reviewsCount}{" "}
                      reviews)
                    </p>
                  </div>
                  <div>
                    <Label>Badge</Label>
                    <p>{viewingProduct.badge || "None"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
