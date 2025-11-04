import { Mail, Phone, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const customers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0101",
    orders: 5,
    totalSpent: "$249.95",
    joinDate: "2024-06-15",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0102",
    orders: 3,
    totalSpent: "$179.97",
    joinDate: "2024-08-20",
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1-555-0103",
    orders: 8,
    totalSpent: "$559.92",
    joinDate: "2024-03-10",
  },
  {
    id: "CUST-004",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1-555-0104",
    orders: 2,
    totalSpent: "$99.98",
    joinDate: "2024-11-05",
  },
]

export default function CustomersManagement() {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Orders</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Spent</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Joined</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm text-primary font-semibold">{customer.totalSpent}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{customer.joinDate}</td>
                  <td className="px-6 py-4 text-sm">
                    <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
