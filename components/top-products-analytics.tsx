"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const topProducts = [
  { name: "Protein Powder", purchases: 2840, revenue: "$142,000" },
  { name: "Superfood Blend", purchases: 2100, revenue: "$83,900" },
  { name: "Nuts & Seeds", purchases: 1950, revenue: "$58,350" },
  { name: "Cereal", purchases: 1680, revenue: "$33,600" },
  { name: "Organic Tea", purchases: 1520, revenue: "$38,000" },
  { name: "Smoothie Mix", purchases: 1340, revenue: "$40,200" },
]

export default function TopProductsAnalytics() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Top Purchased Healthy Products</CardTitle>
        <CardDescription>Most popular items by customer purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "8px",
                color: "var(--color-foreground)",
              }}
            />
            <Bar dataKey="purchases" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
