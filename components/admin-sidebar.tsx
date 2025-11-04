"use client"
import { LayoutDashboard, ShoppingBag, Users, Package, BarChart3, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const { logout } = useAuth()
  const router = useRouter()

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "customers", label: "Customers", icon: Users },
    { id: "products", label: "Products", icon: Package },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <aside className="w-full md:w-64 bg-card border-r border-border p-4 md:p-6 md:sticky md:top-16 h-fit">
      <div className="space-y-6">
        {/* Admin Title */}
        <div className="md:block hidden">
          <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Store Management</p>
        </div>

        {/* Menu Items */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap md:whitespace-normal transition-colors ${
                  activeTab === item.id ? "bg-primary text-white" : "text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
