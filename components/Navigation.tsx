import { Button } from "@/components/ui/button"
import { Menu, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  return (
    <nav className="bg-blue-900 text-white">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between">
          {/* Categories Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:bg-blue-800 px-3 md:px-6 py-4 h-auto text-sm md:text-base"
              >
                <Menu className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">CATEGORIES</span>
                <span className="sm:hidden">MENU</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>Electronics</DropdownMenuItem>
              <DropdownMenuItem>Computers</DropdownMenuItem>
              <DropdownMenuItem>Phones</DropdownMenuItem>
              <DropdownMenuItem>Accessories</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center ml-8 space-x-8">
            <Button variant="ghost" className="text-white hover:bg-white px-4 py-4 h-auto">
              HOME PAGES
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white px-4 py-4 h-auto">
              SHOP
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white px-4 py-4 h-auto">
              PAGES
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white px-4 py-4 h-auto">
              FEATURES
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white px-4 py-4 h-auto">
              MEGA MENU
            </Button>
          </div>

          {/* Right Side Links */}
          <div className="flex items-center space-x-2 md:space-x-6 text-xs md:text-sm">
            <span className="text-blue-300 hidden md:inline">FLASH DEALS</span>
            <span className="text-blue-300 hidden sm:inline">NEW ARRIVALS</span>
            <span className="text-yellow-400 font-semibold">SUPER SALE!</span>
            <span className="text-blue-300 hidden md:inline">OUTLET</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
