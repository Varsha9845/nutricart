import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const topProducts = [
  { name: "Organic Nuts Mix", value: 428, fill: "var(--color-primary)" },
  { name: "Protein Powder", value: 320, fill: "var(--color-accent)" },
  { name: "Whole Grain", value: 267, fill: "var(--color-muted)" },
  { name: "Superfood", value: 215, fill: "var(--color-secondary)" },
]

const categoryData = [
  { category: "Proteins", revenue: 8900 },
  { category: "Superfoods", revenue: 6200 },
  { category: "Organic", revenue: 5400 },
  { category: "Supplements", revenue: 4100 },
]

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Top Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="var(--color-primary)"
                dataKey="value"
              >
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="category" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Bar dataKey="revenue" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground mb-2">Avg Order Value</p>
          <p className="text-2xl font-bold text-foreground">$39.85</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
          <p className="text-2xl font-bold text-primary">3.24%</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground mb-2">Customer Retention</p>
          <p className="text-2xl font-bold text-foreground">68.4%</p>
        </div>
      </div>
    </div>
  )
}
