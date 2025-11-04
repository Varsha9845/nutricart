"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import Link from "next/link"

const allProducts = [
  {
    id: 1,
    name: "Organic Protein Powder",
    price: 49.99,
    image: "🥤",
    rating: 4.8,
    reviews: 120,
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
    reviews: 89,
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

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [nutritionScores, setNutritionScores] = useState<string[]>(["A+", "A", "B"])

  const categories = ["all", "proteins", "superfoods", "organic", "supplements"]

  const filteredProducts = useMemo(() => {
    const results = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      const matchesNutrition = nutritionScores.includes(product.nutritionScore)

      return matchesSearch && matchesCategory && matchesPrice && matchesNutrition
    })

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        results.reverse()
        break
      default:
        // featured - keep original order
        break
    }

    return results
  }, [searchQuery, selectedCategory, priceRange, sortBy, nutritionScores])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Our Products</h1>
          <p className="text-muted-foreground">Browse our curated selection of premium nutritious products</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:sticky lg:top-24 h-fit space-y-6`}>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-white"
                          : "bg-secondary text-foreground hover:bg-muted"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Nutrition Score Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Nutrition Score</label>
                <div className="space-y-2">
                  {["A+", "A", "B"].map((score) => (
                    <label key={score} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={nutritionScores.includes(score)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNutritionScores([...nutritionScores, score])
                          } else {
                            setNutritionScores(nutritionScores.filter((s) => s !== score))
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-foreground">{score}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSelectedCategory("all")
                  setPriceRange([0, 100])
                  setSearchQuery("")
                  setNutritionScores(["A+", "A", "B"])
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort and Toggle Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>

                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
