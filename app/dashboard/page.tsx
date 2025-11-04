"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HealthProfileForm from "@/components/health-profile-form"
import { Button } from "@/components/ui/button"
import { Package, ChevronRight, MapPin, Calendar, User, Settings } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const router = useRouter()
  const { user, orders, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Profile Header */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome, {user.name}</h1>
              <p className="text-muted-foreground mt-1">{user.email}</p>
            </div>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Health Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Package className="w-6 h-6 text-primary" />
              Order History
            </h2>

            {orders.length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">Start shopping to place your first order</p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-primary/90">Browse Products</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card rounded-lg border border-border p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                            order.status === "delivered"
                              ? "bg-green-900/20 text-green-400"
                              : order.status === "shipped"
                                ? "bg-blue-900/20 text-blue-400"
                                : "bg-yellow-900/20 text-yellow-400"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 mb-4">
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <HealthProfileForm />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Account Settings</h2>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Email:</span> {user.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Account Type:</span>{" "}
                  {user.isAdmin ? "Admin" : "Regular User"}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Member Since:</span>{" "}
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
