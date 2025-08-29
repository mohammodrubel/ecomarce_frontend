"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, DollarSign, Star, UndoIcon } from "lucide-react";
import { RichTextEditor } from "@/components/Editor";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/fetchers/products/productsApi";
import { useGetAllCategoryQuery } from "@/redux/fetchers/categoryApi/categoryApi";
import { useGetAllBrandQuery } from "@/redux/fetchers/brand/brandApi";

enum ProductType {
  HOT = "HOT",
  NEW = "NEW",
  UPCOMING = "UPCOMING",
  SALE = "SALE",
  FEATURED = "FEATURED",
  LIMITED = "LIMITED",
  TRENDING = "TRENDING",
  EXCLUSIVE = "EXCLUSIVE",
}

enum DiscountType {
  FLAT = "FLAT",
  PERCENTAGE = "PERCENTAGE",
}

interface FormData {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  discountType: DiscountType | "";
  discountValue: string;
  discountStart: string;
  discountEnd: string;
  stock: string;
  sku: string;
  brandId: string;
  categoryId: string;
  subcategory: string;
  rating: string;
  reviewsCount: string;
  badge: ProductType | "";
  inStock: boolean;
}

export default function EditProductPage() {
  const params = useParams();
  const { data } = useGetSingleProductQuery(params.id);
  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const { data: brandData } = useGetAllBrandQuery(undefined);

  const categories = categoryData?.data || [];
  const brands = brandData?.data || [];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    discountType: "",
    discountValue: "",
    discountStart: "",
    discountEnd: "",
    stock: "",
    sku: "",
    brandId: "",
    categoryId: "",
    subcategory: "",
    rating: "",
    reviewsCount: "",
    badge: "",
    inStock: true,
  });

useEffect(() => {
  if (data?.data) {
    setFormData({
      name: data?.data.name || "",
      description: data?.data.description || "",
      price: data?.data.price?.toString() || "",
      originalPrice: data?.data.originalPrice?.toString() || "",
      discountType: data?.data.discountType || "",
      discountValue: data?.data.discountValue?.toString() || "",
      discountStart: data?.data.discountStart
        ? data?.data.discountStart.split("T")[0]
        : "",
      discountEnd: data?.data.discountEnd ? data.data.discountEnd : "",
      stock: data?.data.stock?.toString() || "",
      sku: data?.data.sku || "",
      brandId: data?.data.brandId || "",
      categoryId: data?.data.categoryId || "",
      // ✅ force to string, never undefined/null
      subcategory: data?.data.subcategory ?? "",
      rating: data?.data.rating?.toString() || "",
      reviewsCount: data?.data.reviewsCount?.toString() || "",
      badge: data?.data.badge || "",
      inStock: data?.data.inStock ?? true,
    });
  }
}, [data]);
  const handleInputChange = useCallback(
    (
      field: keyof FormData,
      value: string | boolean | DiscountType | ProductType
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const selectedCategory = categories.find(
    (cat: any) => cat.id === formData.categoryId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Product name is required");
    if (!formData.price || parseFloat(formData.price) <= 0)
      return toast.error("Valid price is required");

    // Submit logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Brand */}
              <div className="space-y-2">
                <Label>Brand *</Label>
                <Select
                  value={formData.brandId}
                  onValueChange={(val) => handleInputChange("brandId", val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand: any) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(val) => {
                    handleInputChange("categoryId", val);
                    handleInputChange("subcategory", "");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory */}
              <div className="space-y-2">
                <Label>Subcategory *</Label>
                <Select
                  value={formData.subcategory} // controlled only
                  onValueChange={(val) => handleInputChange("subcategory", val)}
                  disabled={!formData.categoryId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory?.subcategories?.map(
                      (sub: string, idx: number) => (
                        <SelectItem key={idx} value={sub}>
                          {sub}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" /> Pricing & Inventory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Original Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    handleInputChange("originalPrice", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Stock Quantity *</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Discount Section */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-4">Discount Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Discount Type</Label>
              <Select
                onValueChange={(val) =>
                  handleInputChange("discountType", val as DiscountType)
                }
                value={formData.discountType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DiscountType.FLAT}>Flat Amount</SelectItem>
                  <SelectItem value={DiscountType.PERCENTAGE}>
                    Percentage
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Discount Value</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.discountValue}
                onChange={(e) =>
                  handleInputChange("discountValue", e.target.value)
                }
                placeholder={
                  formData.discountType === DiscountType.PERCENTAGE
                    ? "0-100%"
                    : "Amount"
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Discount Start Date</Label>
              <Input
                type="date"
                value={formData.discountStart}
                onChange={(e) =>
                  handleInputChange("discountStart", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Discount End Date</Label>
              <Input
                type="date"
                value={formData.discountEnd}
                onChange={(e) =>
                  handleInputChange("discountEnd", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button type="submit" className="min-w-32">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
