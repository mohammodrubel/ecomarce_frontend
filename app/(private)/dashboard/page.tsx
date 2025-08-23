"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "increase",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: "2,350",
      change: "+15.3%",
      changeType: "increase",
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: "1,234",
      change: "+8.2%",
      changeType: "increase",
      icon: Users,
    },
    {
      title: "Total Products",
      value: "567",
      change: "-2.1%",
      changeType: "decrease",
      icon: Package,
    },
  ];

  const salesData = [
    { name: "Jan", sales: 4000, orders: 240 },
    { name: "Feb", sales: 3000, orders: 198 },
    { name: "Mar", sales: 5000, orders: 300 },
    { name: "Apr", sales: 4500, orders: 278 },
    { name: "May", sales: 6000, orders: 389 },
    { name: "Jun", sales: 5500, orders: 349 },
  ];

  const categoryData = [
    { name: "Electronics", value: 400, color: "#0088FE" },
    { name: "Fashion", value: 300, color: "#00C49F" },
    { name: "Home", value: 200, color: "#FFBB28" },
    { name: "Sports", value: 100, color: "#FF8042" },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: "$299.99",
      status: "Completed",
      date: "2024-03-15",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      amount: "$149.99",
      status: "Processing",
      date: "2024-03-15",
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      amount: "$89.99",
      status: "Shipped",
      date: "2024-03-14",
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      amount: "$199.99",
      status: "Pending",
      date: "2024-03-14",
    },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 234, revenue: "$23,400" },
    { name: "Smart Watch", sales: 189, revenue: "$18,900" },
    { name: "Laptop Backpack", sales: 156, revenue: "$7,800" },
    { name: "Bluetooth Speaker", sales: 134, revenue: "$10,720" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span
                    className={
                      stat.changeType === "increase"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Sales Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                //   label={({ name, percent }) =>
                //     // `${name} ${(percent * 100).toFixed(0)}%`
                //   }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium">{order.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />
              Add Product
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <ShoppingCart className="h-6 w-6 mb-2" />
              View Orders
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              Manage Customers
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <TrendingUp className="h-6 w-6 mb-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
