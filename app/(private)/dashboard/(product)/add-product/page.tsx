"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, Package, DollarSign, Star } from "lucide-react";
import { ImageUpload } from "@/components/ProductUploadForm";
import { RichTextEditor } from "@/components/Editor";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Brand, Category } from "@/lib/Types";
import { useGetAllCategoryQuery } from "@/redux/fetchers/categoryApi/categoryApi";
import { useGetAllBrandQuery } from "@/redux/fetchers/brand/brandApi";
import { useAddNewProductMutation } from "@/redux/fetchers/products/productsApi";
import { toast } from "sonner";

// ProductType enum from your schema
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

// DiscountType enum from your schema
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

interface CategoryOption {
  name: string;
  value: string;
  subcategories: string[];
}

interface BrandOption {
  name: string;
  value: string;
}

export default function ProductUploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetAllCategoryQuery(undefined);
  const { data: brandData, isLoading: isBrandLoading } =
    useGetAllBrandQuery(undefined);
  const [addNewProduct] = useAddNewProductMutation();

  const categories: CategoryOption[] =
    categoryData?.data?.map((item: Category) => ({
      name: item.name,
      value: item.id,
      subcategories: item.subcategories || [],
    })) || [];

  const brands: BrandOption[] =
    brandData?.data?.map((item: Brand) => ({
      name: item.name,
      value: item.id,
    })) || [];

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
    (cat) => cat.value === formData.categoryId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      return;
    }

    if (!formData.sku.trim()) {
      toast.error("SKU is required");
      return;
    }

    if (!formData.brandId) {
      toast.error("Brand is required");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Category is required");
      return;
    }

    if (!formData.subcategory.trim()) {
      toast.error("Subcategory is required");
      return;
    }

    if (images.length === 0) {
      toast.error("At least one product image is required");
      return;
    }

    // Validate discount dates
    if (formData.discountStart && formData.discountEnd) {
      const startDate = new Date(formData.discountStart);
      const endDate = new Date(formData.discountEnd);

      if (endDate <= startDate) {
        toast.error("Discount end date must be after start date");
        return;
      }
    }

    // Validate discount values
    if (formData.discountType && !formData.discountValue) {
      toast.error("Discount value is required when discount type is selected");
      return;
    }

    if (formData.discountValue) {
      const discountValue = parseFloat(formData.discountValue);
      if (discountValue <= 0) {
        toast.error("Discount value must be greater than 0");
        return;
      }

      if (
        formData.discountType === DiscountType.PERCENTAGE &&
        discountValue > 100
      ) {
        toast.error("Discount percentage cannot exceed 100%");
        return;
      }
    }

    setIsLoading(true);

    try {
      // Calculate final price based on discount
      const originalPrice = formData.originalPrice
        ? parseFloat(formData.originalPrice)
        : parseFloat(formData.price);

      let finalPrice = parseFloat(formData.price);

      // Apply discount if specified
      if (formData.discountType && formData.discountValue) {
        const discountValue = parseFloat(formData.discountValue);

        if (formData.discountType === DiscountType.FLAT) {
          finalPrice = originalPrice - discountValue;
          if (finalPrice < 0) finalPrice = 0;
        } else if (formData.discountType === DiscountType.PERCENTAGE) {
          finalPrice = originalPrice - (originalPrice * discountValue) / 100;
        }
      }

      const payload = new FormData();
      const productData = {
        name: formData.name,
        description: formData.description,
        price: finalPrice,
        originalPrice: originalPrice,
        discountType: formData.discountType || null,
        discountValue: formData.discountValue
          ? parseFloat(formData.discountValue)
          : null,
        discountStart: formData.discountStart
          ? new Date(formData.discountStart)
          : null,
        discountEnd: formData.discountEnd
          ? new Date(formData.discountEnd)
          : null,
        stock: parseInt(formData.stock) || 0,
        sku: formData.sku,
        brandId: formData.brandId,
        categoryId: formData.categoryId,
        subcategory: formData.subcategory,
        rating: parseFloat(formData.rating) || 0,
        reviewsCount: parseInt(formData.reviewsCount) || 0,
        badge: formData.badge || null,
        inStock: formData.inStock,
      };

      payload.append("data", JSON.stringify(productData));
      images.forEach((file) => payload.append("files", file));

      const response = await addNewProduct(payload).unwrap();

      if (response?.success) {
        toast.success(response.message || "Product uploaded successfully");
        setFormData({
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
        setImages([]);
      } else {
        toast.error(
          response?.error?.data?.message || "Failed to upload product"
        );
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(
        error?.data?.message || "Failed to upload product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Images *
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Upload at least one image (max 5). First image will be used as
              thumbnail.
            </p>
          </CardContent>
        </Card>

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
                  placeholder="Enter product name"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  placeholder="Product SKU"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Brand */}
              <div className="space-y-2">
                <Label>Brand *</Label>
                <Select
                  onValueChange={(val) => handleInputChange("brandId", val)}
                  value={formData.brandId}
                  disabled={isLoading || isBrandLoading}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isBrandLoading ? "Loading brands..." : "Select brand"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  onValueChange={(val) => {
                    handleInputChange("categoryId", val);
                    handleInputChange("subcategory", "");
                  }}
                  value={formData.categoryId}
                  disabled={isLoading || isCategoryLoading}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isCategoryLoading
                          ? "Loading categories..."
                          : "Select category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory */}
              <div className="space-y-2">
                <Label>Subcategory *</Label>
                <Select
                  onValueChange={(val) => handleInputChange("subcategory", val)}
                  value={formData.subcategory}
                  disabled={isLoading || !formData.categoryId}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        !formData.categoryId
                          ? "Select category first"
                          : "Select subcategory"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory?.subcategories.map((sub, idx) => (
                      <SelectItem key={idx} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <RichTextEditor
                onChange={(val) => handleInputChange("description", val)}
                placeholder="Start writing your product description..."
              />
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
                  required
                  disabled={isLoading}
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
                  disabled={isLoading}
                  placeholder="Same as price if empty"
                />
              </div>
              <div className="space-y-2">
                <Label>Stock Quantity *</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2 flex items-end">
                <div className="flex items-center space-x-2 w-full">
                  <Switch
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) =>
                      handleInputChange("inStock", checked)
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
              </div>
            </div>

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
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={DiscountType.FLAT}>
                        Flat Amount
                      </SelectItem>
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
                    disabled={isLoading || !formData.discountType}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews & Badge */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" /> Reviews & Badge
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <Input
                type="number"
                step="0.1"
                min={0}
                max={5}
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>Reviews Count</Label>
              <Input
                type="number"
                min={0}
                value={formData.reviewsCount}
                onChange={(e) =>
                  handleInputChange("reviewsCount", e.target.value)
                }
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>Badge</Label>
              <Select
                onValueChange={(val) =>
                  handleInputChange("badge", val as ProductType)
                }
                value={formData.badge}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a badge" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ProductType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0) + type.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.badge && (
                <div className="mt-2">
                  <Badge variant="secondary">{formData.badge}</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
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
              setImages([]);
            }}
            disabled={isLoading}
          >
            Reset Form
          </Button>
          <Button type="submit" disabled={isLoading} className="min-w-32">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Uploading...
              </>
            ) : (
              "Upload Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
