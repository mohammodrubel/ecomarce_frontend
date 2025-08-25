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

interface FormData {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  stock: string;
  sku: string;
  brandId: string;
  categoryId: string;
  subcategory: string;
  rating: string;
  reviewsCount: string;
  badge: string;
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
    (field: keyof FormData, value: string | boolean) => {
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

    if (images.length === 0) {
      toast.error("At least one product image is required");
      return;
    }

    setIsLoading(true);

    try {
      const payload = new FormData();
      const productData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        originalPrice:
          parseFloat(formData.originalPrice) || parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        rating: parseFloat(formData.rating) || 0,
        reviewsCount: parseInt(formData.reviewsCount) || 0,
      };

      payload.append("data", JSON.stringify(productData));
      images.forEach((file) => payload.append("files", file));

      const response = await addNewProduct(payload).unwrap();

      if (response?.success) {
        toast.success(response.message || "Product uploaded successfully");

        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          originalPrice: "",
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
                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  placeholder="Product SKU"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Brand</Label>
                <Select
                  onValueChange={(val) => handleInputChange("brandId", val)}
                  value={formData.brandId}
                  disabled={isLoading || isBrandLoading}
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

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  onValueChange={(val) => {
                    handleInputChange("categoryId", val);
                    handleInputChange("subcategory", "");
                  }}
                  value={formData.categoryId}
                  disabled={isLoading || isCategoryLoading}
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

              
                <div className="space-y-2">
                  <Label>Subcategory</Label>
                  <Select
                    onValueChange={(val) =>
                      handleInputChange("subcategory", val)
                    }
                    value={formData.subcategory}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory?.subcategories.map((sub,idx) => (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                />
              </div>
              <div className="space-y-2">
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.inStock}
                onCheckedChange={(val) => handleInputChange("inStock", val)}
                disabled={isLoading}
              />
              <Label>Product is in stock</Label>
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
              <Input
                value={formData.badge}
                onChange={(e) => handleInputChange("badge", e.target.value)}
                placeholder="e.g., New, Sale"
                disabled={isLoading}
              />
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
