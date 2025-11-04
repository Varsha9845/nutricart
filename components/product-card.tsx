"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviewCount: number
  nutritionScore: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
      {/* Image Area */}
      <div className="relative h-48 bg-gradient-to-br from-secondary to-background flex items-center justify-center overflow-hidden">
        <div className="text-5xl">{product.image}</div>
        <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.nutritionScore}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">${product.price}</span>
          </div>
        </div>

        {/* Button */}
        <Button className="w-full bg-primary hover:bg-primary/90 gap-2" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
