"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  icon?: string;
  subcategories: string[];
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // 👇 Demo data instead of API
      const demoData: Category[] = [
        {
          id: "1",
          name: "Electronics",
          icon: "💻",
          subcategories: ["Laptop", "Mobile", "Tablet"],
          createdAt: new Date("2024-05-01").toISOString(),
        },
        {
          id: "2",
          name: "Clothing",
          icon: "👕",
          subcategories: ["Shirts", "Pants", "Shoes"],
          createdAt: new Date("2024-06-15").toISOString(),
        },
      ];
      // --- Uncomment when backend ready ---
      // const response = await fetch("/api/categories")
      // if (response.ok) {
      //   const data = await response.json()
      //   setCategories(data)
      //   return
      // }
      setCategories(demoData);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      // --- Demo delete ---
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });

      // --- Uncomment for API delete ---
      // const response = await fetch(`/api/categories/${id}`, {
      //   method: "DELETE",
      // })
      // if (response.ok) {
      //   toast({
      //     title: "Success",
      //     description: "Category deleted successfully",
      //   })
      //   fetchCategories()
      // }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some((sub) =>
        sub.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Categories</h1>
            <Link href="/categories/manage">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </Link>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                All Categories ({filteredCategories.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredCategories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    {categories.length === 0
                      ? "No categories yet"
                      : "No matching categories"}
                  </p>
                  {categories.length === 0 && (
                    <Link href="/categories/manage">
                      <Button>Create First Category</Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead>Subcategories</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell>
                          {category.icon ? (
                            <span className="text-lg">{category.icon}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {category.subcategories.length > 0 ? (
                              category.subcategories.map(
                                (subcategory, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {subcategory}
                                  </Badge>
                                )
                              )
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                None
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(category.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/categories/manage?edit=${category.id}`}
                            >
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteCategory(category.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
