"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
  icon?: string;
  subcategories: string[];
}

export default function Page() {
  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      fetchCategoryForEdit(editId);
    }
  }, [searchParams]);

  const fetchCategoryForEdit = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`);
      if (response.ok) {
        const category = await response.json();
        setEditingCategory(category);
        setCategoryName(category.name);
        setIcon(category.icon || "");
        setSubcategories(category.subcategories || []);
      }
    } catch (error) {
      console.error("Failed to fetch category for editing", error);
    }
  };

  // --- Subcategory handling ---
  const handleSubcategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubcategory(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addMultipleSubcategories();
    }
  };

  const addMultipleSubcategories = () => {
    if (!newSubcategory.trim()) return;

    const newItems = newSubcategory
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0 && !subcategories.includes(item));

    if (newItems.length > 0) {
      setSubcategories([...subcategories, ...newItems]);
    }
    setNewSubcategory("");
  };

  const removeSubcategory = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setIsLoading(true);

    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName.trim(),
          icon: icon.trim(),
          subcategories: subcategories,
        }),
      });

      if (response.ok) {
        setCategoryName("");
        setIcon("");
        setSubcategories([]);
        setNewSubcategory("");
        setEditingCategory(null);
        window.location.href = "/categories";
      } else {
        throw new Error(
          `Failed to ${editingCategory ? "update" : "create"} category`
        );
      }
    } catch (error) {
      console.error("Error submitting category", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {editingCategory ? "Edit Category" : "Create Category"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Name */}
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Category Name *</Label>
                  <Input
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                {/* Icon */}
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon (optional)</Label>
                  <Input
                    id="icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="Enter icon URL or emoji"
                  />
                </div>

                {/* Subcategories */}
                <div className="space-y-4">
                  <Label>Subcategories</Label>

                  <div className="flex gap-2">
                    <Input
                      value={newSubcategory}
                      onChange={handleSubcategoryInput}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter subcategories (comma separated)"
                    />
                    <Button
                      type="button"
                      onClick={addMultipleSubcategories}
                      disabled={!newSubcategory.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {subcategories.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">
                        Subcategories ({subcategories.length})
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {subcategories.map((subcategory, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {subcategory}
                            <button
                              type="button"
                              onClick={() => removeSubcategory(index)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading
                    ? editingCategory
                      ? "Updating..."
                      : "Creating..."
                    : editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
