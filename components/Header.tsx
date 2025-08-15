"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Search, ShoppingCart, User, Menu } from "lucide-react"
import Link from "next/link"

export function Header() {

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-4 focus:py-2 focus:z-50 focus:ring-2 focus:ring-blue-600"
        >
          Skip to content
        </a>

        {/* First Row - Logo and Icons */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {/* Mobile menu button - only visible on small screens */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm">
              <h1 className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                RocksMart
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hidden xs:inline-flex hover:bg-gray-100"
              aria-label="Wishlist"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-[1.2rem] w-[1.2rem] md:h-5 md:w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-blue-600 text-xs">
                  0
                </Badge>
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-100"
              aria-label="Shopping cart"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="h-[1.2rem] w-[1.2rem] md:h-5 md:w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-blue-600 text-xs">
                  0
                </Badge>
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hidden sm:inline-flex hover:bg-gray-100"
              aria-label="User account"
              asChild
            >
              <Link href="/account">
                <User className="h-[1.2rem] w-[1.2rem] md:h-5 md:w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-xs">
                  0
                </Badge>
              </Link>
            </Button>
          </div>
        </div>

        {/* Second Row - Search Bar */}
        <div className="mt-3 w-full">
          <form 
            role="search"
            className="flex w-full max-w-2xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault()
              // Add search functionality here
            }}
          >
            <Input 
              placeholder="Search products..." 
              className="rounded-r-none border-r-0 focus-visible:ring-2 focus-visible:ring-blue-600 flex-1"
              aria-label="Search products"
            />
            <Button 
              type="submit" 
              className="rounded-l-none bg-blue-600 hover:bg-blue-700 px-4 focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}