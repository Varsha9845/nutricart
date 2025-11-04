"use client"

import { Heart, Leaf, Zap, TrendingUp } from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Heart-Healthy",
    description: "All products contain beneficial nutrients for cardiovascular health",
  },
  {
    icon: Leaf,
    title: "Organic & Sustainable",
    description: "Eco-friendly sourcing with zero compromise on quality",
  },
  {
    icon: Zap,
    title: "Energy Boosting",
    description: "Natural energy and vitality through nutrient-dense foods",
  },
  {
    icon: TrendingUp,
    title: "Performance Driven",
    description: "Scientifically formulated for optimal nutrition delivery",
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose NutriCart</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to delivering the highest quality nutrition products backed by science and customer
            satisfaction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="bg-white p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                <div className="mb-4 p-3 bg-secondary rounded-lg w-fit">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
