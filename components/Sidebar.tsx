"use client"

import { useState } from "react"
import { ChevronRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Category {
  name: string
  icon: string
  subcategories: string[]
}

const categories: Category[] = [
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
  // {
  //   name: "TV&AV",
  //   icon: "📺",
  //   subcategories: ["Smart TVs", "4K TVs", "OLED TVs", "QLED TVs", "AV Receivers", "Streaming Devices"],
  // },
  // {
  //   name: "Watches",
  //   icon: "⌚",
  //   subcategories: ["Smartwatches", "Fitness Trackers", "Luxury Watches", "Sports Watches", "Kids Watches"],
  // },
]

function DesktopSidebar() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <aside className="relative w-64 bg-white shadow-lg min-h-auto hidden lg:block rounded-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 px-2">Categories</h2>
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative"
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Button
              variant="ghost"
              className={`w-full justify-between text-left p-3 h-auto hover:bg-blue-50 transition-colors rounded-lg ${
                hoveredCategory === category.name ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3 text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-colors ${
                  hoveredCategory === category.name ? "text-blue-600" : "text-gray-400"
                }`}
              />
            </Button>

            {hoveredCategory === category.name && (
              <Card className="absolute left-full top-0 ml-1 w-64 shadow-xl border z-50 animate-in slide-in-from-left-2 duration-200 min-h-[300px]">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">{category.name}</h3>
                  <div className="space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Button
                        key={subcategory}
                        variant="ghost"
                        className="w-full justify-start text-left p-2 h-auto text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md"
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

function MobileSidebar() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="m-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Menu className="h-4 w-4 mr-2" />
            Categories
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-left">Categories</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(100%-60px)] pb-4">
            {categories.map((category) => (
              <Collapsible
                key={category.name}
                open={openCategory === category.name}
                onOpenChange={(isOpen) => setOpenCategory(isOpen ? category.name : null)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-left p-4 h-auto hover:bg-blue-50 border-b rounded-none"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        openCategory === category.name ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-gray-50 animate-in slide-in-from-top-2">
                  <div className="p-3 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Button
                        key={subcategory}
                        variant="ghost"
                        className="w-full justify-start text-left p-3 h-auto text-sm hover:bg-white hover:text-blue-600 transition-colors rounded-md"
                      >
                        {subcategory}
                      </Button>
                    ))}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm mt-2">
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