"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Menu as MenuIcon } from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar } from './Sidebar';

type NavItem = {
  label: string;
  href?: string;
  subItems?: {
    label: string;
    href: string;
    description?: string;
  }[];
};

const NAV_ITEMS: NavItem[] = [
  { 
    label: "Home", 
    href: "/"
  },
  { 
    label: "Shop", 
    href: "/shop",
    subItems: [
      { label: "All Products", href: "/shop/all" },
      { label: "New Arrivals", href: "/shop/new" },
      { label: "Best Sellers", href: "/shop/bestsellers" },
    ]
  },
  { 
    label: "Categories", 
    subItems: [
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Clothing", href: "/categories/clothing" },
      { label: "Home & Garden", href: "/categories/home-garden" },
    ]
  },
  { 
    label: "Account",
    subItems: [
      { label: "My Profile", href: "/account/profile" },
      { label: "Order History", href: "/account/orders" },
      { label: "Addresses", href: "/account/addresses" },
    ]
  }
]

export function Navigation() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className="container mx-auto">
      <nav className="bg-blue-900 text-white" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Mobile Menu */}
          <div className="lg:hidden w-full">
            <div className="container mx-auto grid grid-cols-2 items-center justify-between px-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    <MenuIcon className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-blue-800 text-white border-none mt-2 rounded-md shadow-lg"
                  align="start"
                  sideOffset={8}
                >
                  {NAV_ITEMS.map((item) => (
                    item.subItems ? (
                      <DropdownMenuSub key={item.label}>
                        <DropdownMenuSubTrigger className="hover:bg-white/10 focus:bg-white/10 px-4 py-2">
                          {item.label}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="bg-blue-700 text-white border-none w-full rounded-md">
                          {item.subItems.map((subItem) => (
                            <DropdownMenuItem 
                              key={subItem.label}
                              className="hover:bg-white/10 focus:bg-white/10 px-4 py-2"
                              asChild
                            >
                              <Link href={subItem.href} className="w-full">
                                {subItem.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ) : (
                      <DropdownMenuItem 
                        key={item.label}
                        className="hover:bg-white/10 focus:bg-white/10 px-4 py-2"
                        asChild
                      >
                        <Link href={item.href || "#"} className="w-full">
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="ml-auto">
                <Sidebar />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_ITEMS.map((item) => (
              item.subItems ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`text-white px-3 py-2 h-auto text-sm xl:text-base hover:bg-white/10 rounded transition-colors ${
                        isActive(item.href || "") ? "bg-white/20" : ""
                      }`}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="bg-blue-800 text-white border-none min-w-[200px] mt-1 rounded-md shadow-lg"
                    align="start"
                  >
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem 
                        key={subItem.label}
                        className="hover:bg-white/10 focus:bg-white/10 px-4 py-2"
                        asChild
                      >
                        <Link href={subItem.href}>
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className={`text-white px-3 py-2 h-auto text-sm xl:text-base hover:bg-white/10 rounded transition-colors ${
                    isActive(item.href || "") ? "bg-white/20" : ""
                  }`}
                  aria-current={isActive(item.href || "") ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
    </div>
  )
}