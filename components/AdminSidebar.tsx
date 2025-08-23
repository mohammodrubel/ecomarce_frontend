"use client";

import type * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Globe,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    items: [
      { title: "All Orders", url: "/admin/orders" },
      { title: "Pending Orders", url: "/admin/orders/pending" },
      { title: "Shipped Orders", url: "/admin/orders/shipped" },
    ],
  },
  {
    title: "Products",
    icon: Package,
    items: [
      { title: "All Products", url: "/admin/products" },
      { title: "Add Product", url: "/admin/products/add" },
    ],
  },
  {
    title: "Category", // ← new section
    icon: Package,
    items: [
      { title: "All Categories", url: "/dashboard/all-categories" },
      { title: "Add Category", url: "/dashboard/add-categories" },
    ],
  },
  {
    title: "Brand", // ← new section
    icon: Package,
    items: [
      { title: "All Brands", url: "/admin/brands" },
      { title: "Add Brand", url: "/admin/brands/add" },
    ],
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "Marketing",
    icon: TrendingUp,
    items: [
      { title: "Coupons", url: "/admin/coupons" },
      { title: "Reviews", url: "/admin/reviews" },
      { title: "Content Management", url: "/admin/content" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    items: [
      { title: "Sales Report", url: "/admin/reports/sales" },
      { title: "Traffic Report", url: "/admin/reports/traffic" },
      { title: "Product Report", url: "/admin/reports/products" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { title: "General", url: "/admin/settings" },
      { title: "Shipping", url: "/admin/settings/shipping" },
      { title: "Tax Settings", url: "/admin/settings/tax" },
      { title: "Payment Gateway", url: "/admin/settings/payment" },
      { title: "User Roles", url: "/admin/settings/roles" },
    ],
  },
];


export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Globe className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">ShopHub Admin</span>
            <span className="truncate text-xs">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (item.items) {
                  return (
                    <Collapsible
                      key={item.title}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                >
                                  <Link href={subItem.url}>
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
