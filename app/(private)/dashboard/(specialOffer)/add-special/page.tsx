"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, ImageIcon, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAllProductsQuery } from "@/redux/fetchers/products/productsApi";
import { useAddSpecialOfferMutation } from "@/redux/fetchers/special-offer/specialOffer";

export default function AddSpecialOffer() {
  const [title, setTitle] = useState("");
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [validFrom, setValidFrom] = useState<Date | null>(null);
  const [validUntil, setValidUntil] = useState<Date | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data: products } = useGetAllProductsQuery(undefined);
  const [AddSpecialOfferData] = useAddSpecialOfferMutation()

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // --- Image Upload ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !productId || !validFrom || !imageFile) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: title.trim(),
        description: description.trim() || null,
        productId,
        validFrom: validFrom.toISOString(),
        validUntil: validUntil ? validUntil.toISOString() : null,
        isActive: true,
      })
    );

    if (imageFile) formData.append("file", imageFile);

    try {
      // Example API call (replace with your actual API)
      // const response = await addNewSpecialOffer(formData).unwrap();
      // if (response.success) {
      //   toast.success(response.message);
      //   router.push("/dashboard/special-offers");
      // }

      const res =await AddSpecialOfferData(formData)
      console.log(res)
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create Special Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Offer Image *</Label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-40 w-full object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={triggerFileInput}
                      className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:border-primary"
                    >
                      <ImageIcon className="h-10 w-10 mx-auto" />
                      <p>Click to upload an image</p>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Product */}
                <div className="space-y-2">
                  <Label htmlFor="product">Product *</Label>
                  <select
                    id="product"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">-- Select Product --</option>
                    {products?.data?.map((prod: any) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Valid From */}
                <div className="space-y-2">
                  <Label>Valid From *</Label>
                  <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                    <CalendarIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                    <DatePicker
                      selected={validFrom}
                      onChange={(date) => setValidFrom(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full bg-transparent outline-none"
                      placeholderText="Select start date and time"
                      required
                    />
                  </div>
                </div>

                {/* Valid Until */}
                <div className="space-y-2">
                  <Label>Valid Until</Label>
                  <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                    <CalendarIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                    <DatePicker
                      selected={validUntil}
                      onChange={(date) => setValidUntil(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full bg-transparent outline-none"
                      placeholderText="Select end date (optional)"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full mt-4">
                  Create Special Offer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
