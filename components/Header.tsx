"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, ShoppingCart, User, Menu } from "lucide-react"
import { Sidebar } from "./Sidebar"

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-2 md:px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-blue-600">RocksMart</h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full">
              <Select defaultValue="all">
                <SelectTrigger className="w-20 lg:w-32 rounded-r-none border-r-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ALL</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="computers">Computers</SelectItem>
                  <SelectItem value="phones">Phones</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Input placeholder="Search for products" className="rounded-none border-x-0" />
              </div>
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Icons */}
            <div className="flex items-center space-x-1 md:space-x-2">
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                <Badge className="absolute -top-2 -right-2 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center bg-blue-600 text-xs">
                  0
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                <Badge className="absolute -top-2 -right-2 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center bg-blue-600 text-xs">
                  0
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-4 w-4 md:h-5 md:w-5" />
                <Badge className="absolute -top-2 -right-2 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-xs">
                  0
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3">
          <div className="flex items-center">
            {/* Mobile Sidebar Trigger - Now properly integrated */}
            <Sidebar />
            <div className="relative flex-1 ml-2">
              <Input placeholder="Search for products" className="rounded-r-none border-r-0" />
            </div>
            <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}