import { Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Organic Protein Powder",
    total: "$149.99",
    status: "Delivered",
    date: "2025-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Premium Superfood Blend",
    total: "$89.97",
    status: "Processing",
    date: "2025-01-18",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Organic Nuts & Seeds Mix",
    total: "$59.98",
    status: "Pending",
    date: "2025-01-19",
  },
  {
    id: "ORD-004",
    customer: "Sarah Williams",
    product: "Whey Protein Isolate",
    total: "$179.97",
    status: "Delivered",
    date: "2025-01-17",
  },
]

export default function OrdersManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-primary/10 text-primary"
      case "Processing":
        return "bg-yellow-500/10 text-yellow-600"
      case "Pending":
        return "bg-orange-500/10 text-orange-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.total}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
