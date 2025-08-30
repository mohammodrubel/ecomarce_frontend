"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { RichTextEditor } from "@/components/Editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useGetAllBrandQuery,
  useUpdateBrandImageMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  Brand,
} from "@/redux/fetchers/brand/brandApi";
import { toast } from "sonner";


function EditBrandModal({
  item,
  onSave,
}: {
  item: Brand;
  onSave: (updatedItem: Brand) => void;
}) {
  const [changeBrandImage] = useUpdateBrandImageMutation();
  const [updateBrandInformation] = useUpdateBrandMutation();

  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [isOpen, setIsOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle logo upload
  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        const updated:any = await changeBrandImage({
          id: item.id,
          data: formData,
        }).unwrap();

        toast.success(updated?.message);
        onSave(updated.data); // ✅ only pass Brand
      } catch (error) {
        console.error("Failed to update brand logo:", error);
      }
    }
  };

  // Handle info update
  const handleUpdate = async () => {
    const data = {
      name,
      description,
    };

    try {
      const updated: any = await updateBrandInformation({
        id: item.id,
        data,
      }).unwrap();

      toast.success(updated?.message);
      onSave(updated.data); 
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update brand:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="mr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Logo */}
          <div className="space-y-2">
            <Label>Brand Logo</Label>
            <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition">
              <Image
                src={item.logo}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg mb-4"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleLogoChange}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Change Logo
              </Button>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Brand Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter brand name"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              onChange={setDescription}
              placeholder="Start writing your brand description..."
            />
          </div>

          <Button className="w-full" onClick={handleUpdate}>
            Update Brand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ====================
// Main Page
// ====================
export default function Page() {
  const { data: brandsData, isLoading, error, refetch } = useGetAllBrandQuery();
  const [deleteBrand] = useDeleteBrandMutation();
  const [items, setItems] = useState<Brand[]>([]);

  useEffect(() => {
    if (brandsData?.data) {
      setItems(brandsData.data);
    }
  }, [brandsData]);

  const handleSave = (updatedItem: Brand) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    refetch();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBrand(id).unwrap();
      setItems((prev) => prev.filter((item) => item.id !== id));
      refetch();
    } catch (error) {
      console.error("Failed to delete brand:", error);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6">Error loading brands</div>;
  }

  return (
    <div className="p-6">
      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
              <TableCell>
                <EditBrandModal item={item} onSave={handleSave} />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                  className="ml-2"
                >
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
