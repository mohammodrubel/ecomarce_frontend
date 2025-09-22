"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get up to 50% off on selected items.",
    buttonText: "Shop Now",
    product: "Product 1",
  },
  {
    id: 2,
    title: "New Arrival",
    description: "Check out our latest products this season.",
    buttonText: "Explore",
    product: "Product 2",
  },
  {
    id: 3,
    title: "Limited Offer",
    description: "Only for today! Don’t miss this chance.",
    buttonText: "Grab Deal",
    product: "Product 3",
  },
];

export default function BannerTable() {
  return (
    <div className="w-[90%] mx-auto my-10">
      <Table>
        <TableCaption>A list of all your banners.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Button Text</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.map((banner) => (
            <TableRow key={banner.id}>
              <TableCell className="font-medium">{banner.id}</TableCell>
              <TableCell>{banner.title}</TableCell>
              <TableCell className="max-w-[250px] truncate">
                {banner.description}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{banner.buttonText}</Badge>
              </TableCell>
              <TableCell>{banner.product}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
