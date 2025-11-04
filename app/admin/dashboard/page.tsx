"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Users, ShoppingBag, TrendingUp, DollarSign, Search, Filter } from "lucide-react"
import CalorieTrend from "@/components/calorie-trend"
import TopProductsAnalytics from "@/components/top-products-analytics"

const dashboardData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 221 },
  { month: "Mar", sales: 2000, orders: 229 },
  { month: "Apr", sales: 2780, orders: 200 },
  { month: "May", sales: 1890, orders: 229 },
  { month: "Jun", sales: 2390, orders: 200 },
]

const customerData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    orders: 5,
    spent: "$249.95",
    status: "Active",
    lastPurchase: "2 days ago",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    orders: 3,
    spent: "$149.97",
    status: "Active",
    lastPurchase: "1 week ago",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    orders: 8,
    spent: "$599.92",
    status: "VIP",
    lastPurchase: "3 days ago",
  },
]

export default function AdminDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to NutriCart CRM - Manage customers and monitor business metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-border p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">$45,231</p>
            <p className="text-sm text-green-600">+12% from last month</p>
          </div>

          <div className="bg-white rounded-lg border border-border p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">Total Orders</span>
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">1,543</p>
            <p className="text-sm text-green-600">+8% from last month</p>
          </div>

          <div className="bg-white rounded-lg border border-border p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">Total Customers</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">892</p>
            <p className="text-sm text-green-600">+15% from last month</p>
          </div>

          <div className="bg-white rounded-lg border border-border p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">Avg Order Value</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">$156</p>
            <p className="text-sm text-green-600">+3% from last month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Monthly Orders</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <TopProductsAnalytics />
          <CalorieTrend />
        </div>

        {/* Customer Management */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">Customer Management</h3>
            <div className="flex gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Customer Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Spent</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Last Purchase</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((customer) => (
                  <tr
                    key={customer.id}
                    className={`border-b border-border hover:bg-secondary/50 cursor-pointer ${
                      selectedCustomer === customer.id ? "bg-secondary/50" : ""
                    }`}
                    onClick={() => setSelectedCustomer(customer.id)}
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">{customer.name}</p>
                        <p className="text-muted-foreground text-xs">{customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-foreground">{customer.orders}</td>
                    <td className="py-4 px-4 font-semibold text-primary">{customer.spent}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          customer.status === "VIP" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{customer.lastPurchase}</td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer Details */}
          {selectedCustomer && (
            <div className="bg-secondary/30 rounded-lg p-4 border border-border space-y-3">
              <h4 className="font-semibold text-foreground">Customer Details</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Lifetime Value</p>
                  <p className="text-xl font-bold text-primary">$599.92</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Order Value</p>
                  <p className="text-xl font-bold text-primary">$75</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Frequency</p>
                  <p className="text-xl font-bold text-primary">Every 2 weeks</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
