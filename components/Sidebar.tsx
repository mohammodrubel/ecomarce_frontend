"use client"

import { useState } from "react"
import { ChevronRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const categories = [
  {
    name: "Accessories",
    icon: "🎧",
    subcategories: ["Headphones", "Earbuds", "Cables", "Chargers", "Cases", "Screen Protectors"],
  },
  {
    name: "Laptop",
    icon: "💻",
    subcategories: ["Gaming Laptops", "Business Laptops", "Ultrabooks", "2-in-1 Laptops", "Chromebooks"],
  },
  {
    name: "LED Signage",
    icon: "📺",
    subcategories: ["Indoor LED", "Outdoor LED", "Digital Billboards", "LED Strips", "Smart Displays"],
  },
  {
    name: "Mobile",
    icon: "📱",
    subcategories: ["Smartphones", "Feature Phones", "Rugged Phones", "Gaming Phones", "Foldable Phones"],
  },
  {
    name: "Monitors",
    icon: "🖥️",
    subcategories: ["Gaming Monitors", "4K Monitors", "Ultrawide", "Professional", "Portable"],
  },
  {
    name: "Projectors",
    icon: "📽️",
    subcategories: ["Home Theater", "Business", "Portable", "4K Projectors", "Smart Projectors"],
  },
  {
    name: "Sound Devices",
    icon: "🔊",
    subcategories: ["Speakers", "Soundbars", "Home Audio", "Professional Audio", "Bluetooth Speakers"],
  },
  {
    name: "Tablets",
    icon: "📱",
    subcategories: ["iPad", "Android Tablets", "Windows Tablets", "Drawing Tablets", "Kids Tablets"],
  },
  {
    name: "TV&AV",
    icon: "📺",
    subcategories: ["Smart TVs", "4K TVs", "OLED TVs", "QLED TVs", "AV Receivers", "Streaming Devices"],
  },
  {
    name: "Watches",
    icon: "⌚",
    subcategories: ["Smartwatches", "Fitness Trackers", "Luxury Watches", "Sports Watches", "Kids Watches"],
  },
]

// Desktop Sidebar Component
function DesktopSidebar() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <aside className="relative w-64 bg-white shadow  min-h-auto hidden lg:block">
      <div className="p-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Button
              variant="ghost"
              className={`w-full justify-between text-left p-3 h-auto hover:bg-blue-50 transition-colors ${
                hoveredCategory === category.name ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-colors ${
                  hoveredCategory === category.name ? "text-blue-600" : "text-gray-400"
                }`}
              />
            </Button>

            {/* Desktop Submenu */}
            {hoveredCategory === category.name && (
              <Card className="absolute left-full top-0 ml-2 w-64 shadow-lg border z-50 animate-in slide-in-from-left-2 duration-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">{category.name}</h3>
                  <div className="space-y-1">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <Button
                        key={subIndex}
                        variant="ghost"
                        className="w-full justify-start text-left p-2 h-auto text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {subcategory}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      View All {category.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}

// Mobile Sidebar Component
function MobileSidebar() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="m-4 bg-gray-300 w-full">
            <Menu className="h-4 w-4 mr-2" />
            Categories
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Categories</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-full pb-20">
            {categories.map((category, index) => (
              <Collapsible
                key={index}
                open={openCategory === category.name}
                onOpenChange={(isOpen) => setOpenCategory(isOpen ? category.name : null)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-left p-4 h-auto hover:bg-blue-50 border-b"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${openCategory === category.name ? "rotate-90" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-gray-50">
                  <div className="p-4 space-y-2">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <Button
                        key={subIndex}
                        variant="ghost"
                        className="w-full justify-start text-left p-3 h-auto text-sm hover:bg-white hover:text-blue-600 transition-colors"
                      >
                        {subcategory}
                      </Button>
                    ))}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm mt-3">
                      View All {category.name}
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}
