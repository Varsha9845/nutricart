"use client"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import Link from "next/link"

const featuredProducts = [
  {
    id: 1,
    name: "Organic Protein Powder",
    price: 49.99,
    image: "🥤",
    rating: 4.8,
    reviews: 120,
    nutritionScore: "A+",
    description: "Plant-based protein with 25g per serving",
  },
  {
    id: 2,
    name: "Premium Superfood Blend",
    price: 39.99,
    image: "🌿",
    rating: 4.9,
    reviews: 89,
    nutritionScore: "A+",
    description: "Antioxidant-rich blend of 15 superfoods",
  },
  {
    id: 3,
    name: "Organic Nuts & Seeds Mix",
    price: 29.99,
    image: "🥜",
    rating: 4.7,
    reviews: 156,
    nutritionScore: "A",
    description: "Raw, organic selection of premium nuts and seeds",
  },
  {
    id: 4,
    name: "Whole Grain Cereal",
    price: 19.99,
    image: "🌾",
    rating: 4.6,
    reviews: 94,
    nutritionScore: "A",
    description: "High-fiber whole grain cereal with no added sugar",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked nutritious products to elevate your wellness journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
