"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductCard from "@/components/product-card"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { getPersonalizedRecommendations } from "@/lib/ai-recommendations"
import Link from "next/link"
const allProducts = [
  {
    id: 1,
    name: "Organic Protein Powder",
    price: 49.99,
    image: "🥤",
    rating: 4.8,
    reviewCount: 120,
    nutritionScore: "A+",
    description: "Plant-based protein with 25g per serving",
    category: "proteins",
  },
  {
    id: 2,
    name: "Premium Superfood Blend",
    price: 39.99,
    image: "🌿",
    rating: 4.9,
    reviewCount: 89,
    nutritionScore: "A+",
    description: "Antioxidant-rich blend of 15 superfoods",
    category: "superfoods",
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
    category: "organic",
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
    category: "organic",
  },
  {
    id: 5,
    name: "Whey Protein Isolate",
    price: 59.99,
    image: "🥛",
    rating: 4.9,
    reviews: 210,
    nutritionScore: "A+",
    description: "Pure whey protein isolate with 30g protein per serving",
    category: "proteins",
  },
  {
    id: 6,
    name: "Goji Berry Powder",
    price: 34.99,
    image: "🫐",
    rating: 4.8,
    reviews: 67,
    nutritionScore: "A+",
    description: "Freeze-dried goji berries packed with antioxidants",
    category: "superfoods",
  },
  {
    id: 7,
    name: "Coconut Oil",
    price: 24.99,
    image: "🥥",
    rating: 4.7,
    reviews: 142,
    nutritionScore: "A",
    description: "Virgin organic coconut oil for cooking and beauty",
    category: "organic",
  },
  {
    id: 8,
    name: "Multivitamin Complex",
    price: 44.99,
    image: "💊",
    rating: 4.8,
    reviews: 178,
    nutritionScore: "A+",
    description: "Complete daily multivitamin with 25 essential nutrients",
    category: "supplements",
  },
  {
    id: 9,
    name: "Vegan Omega-3 Supplement",
    price: 34.99,
    image: "🐟",
    rating: 4.7,
    reviews: 95,
    nutritionScore: "A+",
    description: "Plant-based omega-3 from algae, 300mg per serving",
    category: "supplements",
  },
  {
    id: 10,
    name: "Chia Seed Pudding Mix",
    price: 16.99,
    image: "🥣",
    rating: 4.6,
    reviews: 72,
    nutritionScore: "A",
    description: "Ready-to-mix chia seed pudding with natural flavors",
    category: "organic",
  },
  {
    id: 11,
    name: "Spirulina Tablets",
    price: 29.99,
    image: "🌱",
    rating: 4.9,
    reviews: 134,
    nutritionScore: "A+",
    description: "Pure spirulina algae tablets, 1000mg per serving",
    category: "superfoods",
  },
  {
    id: 12,
    name: "Almonds - Raw & Organic",
    price: 22.99,
    image: "🥜",
    rating: 4.8,
    reviews: 203,
    nutritionScore: "A",
    description: "Premium raw organic almonds, perfect for snacking",
    category: "organic",
  },
  {
    id: 13,
    name: "Casein Protein Powder",
    price: 54.99,
    image: "🥛",
    rating: 4.7,
    reviews: 118,
    nutritionScore: "A+",
    description: "Slow-release casein protein, 24g per serving",
    category: "proteins",
  },
  {
    id: 14,
    name: "Matcha Green Tea Powder",
    price: 32.99,
    image: "🍵",
    rating: 4.8,
    reviews: 156,
    nutritionScore: "A+",
    description: "Ceremonial grade matcha with powerful antioxidants",
    category: "superfoods",
  },
  {
    id: 15,
    name: "Hemp Protein Powder",
    price: 44.99,
    image: "🌿",
    rating: 4.6,
    reviews: 87,
    nutritionScore: "A+",
    description: "Complete amino acid profile, 15g protein per serving",
    category: "proteins",
  },
  {
    id: 16,
    name: "Ashwagandha Root Powder",
    price: 28.99,
    image: "🪴",
    rating: 4.7,
    reviews: 142,
    nutritionScore: "A",
    description: "Stress-relief adaptogen, 500mg per serving",
    category: "supplements",
  },
  {
    id: 17,
    name: "Flax Seeds - Ground",
    price: 19.99,
    image: "🌾",
    rating: 4.8,
    reviews: 165,
    nutritionScore: "A",
    description: "Fresh ground flax seeds, rich in omega-3 and fiber",
    category: "organic",
  },
  {
    id: 18,
    name: "Collagen Peptides",
    price: 39.99,
    image: "💪",
    rating: 4.9,
    reviews: 211,
    nutritionScore: "A+",
    description: "Grass-fed collagen for skin and joint health",
    category: "proteins",
  },
  {
    id: 19,
    name: "Bee Pollen Granules",
    price: 26.99,
    image: "🐝",
    rating: 4.7,
    reviews: 98,
    nutritionScore: "A+",
    description: "Raw bee pollen, natural energy and nutrient boost",
    category: "superfoods",
  },
  {
    id: 20,
    name: "Vitamin D3 Drops",
    price: 24.99,
    image: "☀️",
    rating: 4.8,
    reviews: 189,
    nutritionScore: "A+",
    description: "High-potency vitamin D3, 2000 IU per drop",
    category: "supplements",
  },
]

export default function RecommendedItems() {
  const { user } = useAuth()
  const { items: cartItems } = useCart()

  const recommendedProducts = useMemo(() => {
    return getPersonalizedRecommendations(user?.healthProfile || null, allProducts, cartItems)
  }, [user?.healthProfile, cartItems])

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recommended For You</CardTitle>
        <CardDescription>
          {user?.healthProfile?.goals?.length
            ? "Personalized based on your health goals and preferences"
            : "Based on popular healthy choices"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recommendedProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recommendations available at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
