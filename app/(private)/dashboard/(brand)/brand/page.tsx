"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Item {
  id: string;
  logo: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const data: Item[] = [
  {
    id: "5741847f-9aa8-46c8-83e7-818ae660f992",
    logo: "https://res.cloudinary.com/de2ysphks/image/upload/v1756394808/21-26-46%20GMT%2B0600%20%28Bangladesh%20Standard%20Time%29-led-light.png.png",
    name: "electoron",
    description: "descriptiondescriptiondescription",
    createdAt: "2025-08-28T15:26:48.494Z",
    updatedAt: "2025-08-28T15:26:48.494Z",
  },
];

export default function Page() {
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
          {data.map((item) => (
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
                <Button size="sm" variant="outline" className="mr-2">
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
