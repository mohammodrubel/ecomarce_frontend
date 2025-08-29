"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";
import { RichTextEditor } from "@/components/Editor";

function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // handle input fields
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", {
      ...formData,
      file,
    });
    // 👉 send this data to your API
  };

  return (
    <div className="mx-auto p-6">
      <Card className="container mx-auto shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Photo */}
          <div className="space-y-2">
            <Label>Upload Photo</Label>
            <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition">
              {!preview ? (
                <>
                  <Upload className="text-muted-foreground mb-2 h-8 w-8" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to upload
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    id="photo"
                    onChange={handleFileChange}
                  />
                  <Label
                    htmlFor="photo"
                    className="mt-2 cursor-pointer text-sm text-primary underline"
                  >
                    Choose File
                  </Label>
                </>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg shadow"
                  />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              onChange={(val: string) => handleInputChange("description", val)}
              placeholder="Start writing your product description..."
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
