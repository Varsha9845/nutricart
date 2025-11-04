"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Image from "next/image"

const calorieData = [
  { day: "Mon", calories: 2100, target: 2000 },
  { day: "Tue", calories: 1950, target: 2000 },
  { day: "Wed", calories: 2250, target: 2000 },
  { day: "Thu", calories: 1800, target: 2000 },
  { day: "Fri", calories: 2050, target: 2000 },
  { day: "Sat", calories: 2400, target: 2000 },
  { day: "Sun", calories: 1900, target: 2000 },
]

export default function CalorieTrend() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Your Calorie Trend</CardTitle>
        <CardDescription>Weekly calorie intake vs daily target</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={calorieData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "8px",
                  color: "var(--color-foreground)",
                }}
              />
              <Line
                type="monotone"
                dataKey="calories"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: "var(--color-primary)", r: 4 }}
                name="Actual Intake"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "var(--color-secondary)", r: 4 }}
                name="Daily Target"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.jpg"
              alt="Healthy nutrition and diet foods"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
