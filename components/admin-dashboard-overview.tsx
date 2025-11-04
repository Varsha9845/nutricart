import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react"

const salesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 221 },
  { month: "Mar", sales: 2000, orders: 229 },
  { month: "Apr", sales: 2780, orders: 200 },
  { month: "May", sales: 1890, orders: 229 },
  { month: "Jun", sales: 2390, orders: 200 },
]

const revenueData = [
  { week: "W1", revenue: 2400 },
  { week: "W2", revenue: 1398 },
  { week: "W3", revenue: 9800 },
  { week: "W4", revenue: 3908 },
]

export default function DashboardOverview() {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      positive: true,
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      positive: true,
    },
    {
      icon: Users,
      label: "Total Customers",
      value: "856",
      change: "+5.3%",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Avg Order Value",
      value: "$39.85",
      change: "+2.1%",
      positive: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className={`text-xs mt-4 ${stat.positive ? "text-primary" : "text-destructive"}`}>
                {stat.change} from last month
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales & Orders Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Sales & Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Legend />
              <Bar dataKey="sales" fill="var(--color-primary)" />
              <Bar dataKey="orders" fill="var(--color-accent)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
