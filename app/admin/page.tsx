"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import AdminSidebar from "@/components/admin-sidebar"
import DashboardOverview from "@/components/admin-dashboard-overview"
import OrdersManagement from "@/components/admin-orders"
import CustomersManagement from "@/components/admin-customers"
import ProductsManagement from "@/components/admin-products"
import AnalyticsDashboard from "@/components/admin-analytics"
import { Lock } from "lucide-react"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!user || !user.isAdmin) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <div className="p-3 bg-destructive/10 rounded-full">
                <Lock className="w-8 h-8 text-destructive" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
            <p className="text-muted-foreground">
              You do not have permission to access the admin dashboard. Only administrators can view this page.
            </p>
            <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary/90">
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-8">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground capitalize">{activeTab.replace("-", " ")}</h1>
              <p className="text-muted-foreground">Manage your store operations</p>
            </div>

            {/* Content Area */}
            {activeTab === "overview" && <DashboardOverview />}
            {activeTab === "orders" && <OrdersManagement />}
            {activeTab === "customers" && <CustomersManagement />}
            {activeTab === "products" && <ProductsManagement />}
            {activeTab === "analytics" && <AnalyticsDashboard />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
