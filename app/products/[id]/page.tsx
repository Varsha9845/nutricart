"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Truck, RotateCcw, Shield } from "lucide-react"
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
    fullDescription:
      "Our premium plant-based protein powder is made from a blend of pea, hemp, and rice proteins. It provides a complete amino acid profile with 25g of protein per serving, making it ideal for post-workout recovery, muscle building, and maintaining lean muscle mass. No artificial sweeteners, colors, or preservatives.",
    specs: {
      servingSize: "30g",
      proteinPerServing: "25g",
      carbs: "2g",
      fat: "1.5g",
      fiber: "1g",
      ingredients: "Pea Protein, Rice Protein, Hemp Protein, Natural Vanilla Flavor, Stevia",
      allergens: "Tree nuts",
    },
    reviews: [
      {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        text: "Great taste and mixes well. I've been using this for 3 months and love it!",
        date: "2 months ago",
      },
      {
        id: 2,
        author: "John D.",
        rating: 4,
        text: "Good quality protein. A bit pricey but worth it for the organic ingredients.",
        date: "1 month ago",
      },
    ],
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
    fullDescription:
      "Experience the power of nature with our Premium Superfood Blend. This carefully crafted mix combines 15 of the world's most nutrient-dense superfoods including goji berries, spirulina, chlorella, and acai. Perfect for smoothies, bowls, or daily supplementation.",
    specs: {
      servingSize: "15g",
      calories: 60,
      protein: "3g",
      carbs: "10g",
      fiber: "2g",
      ingredients: "Goji Berries, Spirulina, Chlorella, Acai, Maca, Cacao, Hemp Seeds, Chia Seeds, Moringa",
      allergens: "None",
    },
    reviews: [
      {
        id: 1,
        author: "Emma L.",
        rating: 5,
        text: "Tastes amazing in my morning smoothie. Feel more energized throughout the day!",
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: 3,
    name: "Organic Nuts & Seeds Mix",
    price: 29.99,
    image: "🥜",
    rating: 4.7,
    reviewCount: 156,
    nutritionScore: "A",
    description: "Raw, organic selection of premium nuts and seeds",
    category: "organic",
    fullDescription:
      "A delicious mix of raw, organic almonds, walnuts, pumpkin seeds, and sunflower seeds. Perfect for snacking, adding to salads, or making homemade nut butters. Rich in healthy fats, protein, and minerals.",
    specs: {
      servingSize: "28g",
      calories: 160,
      protein: "6g",
      fat: "14g",
      fiber: "2.5g",
      ingredients: "Almonds, Walnuts, Pumpkin Seeds, Sunflower Seeds",
      allergens: "Tree nuts, seeds",
    },
    reviews: [],
  },
  {
    id: 4,
    name: "Whole Grain Cereal",
    price: 19.99,
    image: "🌾",
    rating: 4.6,
    reviewCount: 94,
    nutritionScore: "A",
    description: "High-fiber whole grain cereal with no added sugar",
    category: "organic",
    fullDescription:
      "Start your day right with our delicious whole grain cereal. Packed with fiber, essential vitamins, and minerals. Made from organic oats, barley, and rye without any artificial additives or refined sugars.",
    specs: {
      servingSize: "50g",
      calories: 180,
      protein: "6g",
      carbs: "32g",
      fiber: "5g",
      ingredients: "Organic Oats, Organic Barley, Organic Rye, Natural Honey",
      allergens: "Gluten",
    },
    reviews: [
      {
        id: 1,
        author: "Mike T.",
        rating: 5,
        text: "Perfect breakfast cereal. No sugar crash and keeps me full until lunch!",
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: 5,
    name: "Whey Protein Isolate",
    price: 59.99,
    image: "🥛",
    rating: 4.9,
    reviewCount: 210,
    nutritionScore: "A+",
    description: "Pure whey protein isolate with 30g protein per serving",
    category: "proteins",
    fullDescription:
      "Our premium whey protein isolate is microfiltered to remove lactose and fat, delivering 30g of pure protein per serving. Ideal for post-workout recovery and muscle building with minimal carbs and calories.",
    specs: {
      servingSize: "35g",
      calories: 130,
      protein: "30g",
      carbs: "1g",
      fat: "0.5g",
      ingredients: "Whey Protein Isolate, Natural Vanilla Flavor, Stevia, Lecithin",
      allergens: "Dairy",
    },
    reviews: [
      {
        id: 1,
        author: "Alex K.",
        rating: 5,
        text: "Best whey isolate I've tried. Mixes smoothly and tastes great!",
        date: "1 month ago",
      },
    ],
  },
  {
    id: 6,
    name: "Goji Berry Powder",
    price: 34.99,
    image: "🫐",
    rating: 4.8,
    reviewCount: 67,
    nutritionScore: "A+",
    description: "Freeze-dried goji berries packed with antioxidants",
    category: "superfoods",
    fullDescription:
      "Concentrated goji berry powder made from freeze-dried organic berries. Rich in vitamins, minerals, and powerful antioxidants. Perfect for smoothies, bowls, or as a nutritional supplement.",
    specs: {
      servingSize: "10g",
      calories: 36,
      protein: "1.5g",
      carbs: "7g",
      fiber: "1g",
      ingredients: "100% Organic Freeze-Dried Goji Berries",
      allergens: "None",
    },
    reviews: [],
  },
  {
    id: 7,
    name: "Coconut Oil",
    price: 24.99,
    image: "🥥",
    rating: 4.7,
    reviewCount: 142,
    nutritionScore: "A",
    description: "Virgin organic coconut oil for cooking and beauty",
    category: "organic",
    fullDescription:
      "Cold-pressed virgin coconut oil with a perfect balance of beauty and culinary uses. Unrefined and organic, it maintains all beneficial properties including MCTs for energy support.",
    specs: {
      servingSize: "14g",
      calories: 120,
      fat: "14g",
      saturatedFat: "12g",
      ingredients: "100% Organic Coconut Oil",
      allergens: "Tree nuts",
    },
    reviews: [
      {
        id: 1,
        author: "Rachel P.",
        rating: 5,
        text: "Amazing for both cooking and skincare. Best quality I've found!",
        date: "2 months ago",
      },
    ],
  },
  {
    id: 8,
    name: "Multivitamin Complex",
    price: 44.99,
    image: "💊",
    rating: 4.8,
    reviewCount: 178,
    nutritionScore: "A+",
    description: "Complete daily multivitamin with 25 essential nutrients",
    category: "supplements",
    fullDescription:
      "A comprehensive daily multivitamin with 25 essential vitamins and minerals. Supports overall health, immunity, and energy levels with bioavailable forms for maximum absorption.",
    specs: {
      servingSize: "2 capsules",
      vitaminA: "900mcg",
      vitaminC: "100mg",
      vitaminD3: "25mcg",
      iron: "18mg",
      calcium: "200mg",
      ingredients: "Vitamin A, Vitamin C, Vitamin D3, Vitamin E, B-Complex, Minerals",
      allergens: "None",
    },
    reviews: [],
  },
  {
    id: 9,
    name: "Vegan Omega-3 Supplement",
    price: 34.99,
    image: "🐟",
    rating: 4.7,
    reviewCount: 95,
    nutritionScore: "A+",
    description: "Plant-based omega-3 from algae, 300mg per serving",
    category: "supplements",
    fullDescription:
      "Get your omega-3s from sustainable algae instead of fish. Provides EPA and DHA in a vegan-friendly form. Perfect for vegetarians and vegans seeking cardiovascular and brain health support.",
    specs: {
      servingSize: "1 capsule",
      epa: "150mg",
      dha: "150mg",
      ingredients: "Algae Extract, Vegetable Capsule",
      allergens: "None",
    },
    reviews: [],
  },
  {
    id: 10,
    name: "Chia Seed Pudding Mix",
    price: 16.99,
    image: "🥣",
    rating: 4.6,
    reviewCount: 72,
    nutritionScore: "A",
    description: "Ready-to-mix chia seed pudding with natural flavors",
    category: "organic",
    fullDescription:
      "Convenient chia seed pudding mix that's ready in minutes. Combine with your favorite milk and let it set. High in fiber, protein, and omega-3 fatty acids for sustained energy.",
    specs: {
      servingSize: "2 tablespoons",
      calories: 80,
      protein: "3g",
      fiber: "4g",
      omega3: "1500mg",
      ingredients: "Organic Chia Seeds, Natural Vanilla Flavor, Sweetener",
      allergens: "None",
    },
    reviews: [],
  },
  {
    id: 11,
    name: "Spirulina Tablets",
    price: 29.99,
    image: "🌱",
    rating: 4.9,
    reviewCount: 134,
    nutritionScore: "A+",
    description: "Pure spirulina algae tablets, 1000mg per serving",
    category: "superfoods",
    fullDescription:
      "Pure spirulina packed with protein, B12, and iron. Each tablet contains 1000mg of premium spirulina. Supports energy, immunity, and muscle growth naturally.",
    specs: {
      servingSize: "1 tablet",
      calories: 3,
      protein: "0.7g",
      vitaminB12: "80mcg",
      iron: "2mg",
      ingredients: "100% Pure Spirulina",
      allergens: "None",
    },
    reviews: [
      {
        id: 1,
        author: "David H.",
        rating: 5,
        text: "Energy boost is real. Great quality spirulina!",
        date: "2 weeks ago",
      },
    ],
  },
  {
    id: 12,
    name: "Almonds - Raw & Organic",
    price: 22.99,
    image: "🥜",
    rating: 4.8,
    reviewCount: 203,
    nutritionScore: "A",
    description: "Premium raw organic almonds, perfect for snacking",
    category: "organic",
    fullDescription:
      "Delicious and nutritious raw organic almonds. Packed with vitamin E, magnesium, and healthy monounsaturated fats. Perfect for snacking, salads, or homemade almond butter.",
    specs: {
      servingSize: "28g (23 almonds)",
      calories: 160,
      protein: "6g",
      fat: "14g",
      fiber: "3.5g",
      ingredients: "100% Raw Organic Almonds",
      allergens: "Tree nuts",
    },
    reviews: [],
  },
  {
    id: 13,
    name: "Casein Protein Powder",
    price: 54.99,
    image: "🥛",
    rating: 4.7,
    reviewCount: 118,
    nutritionScore: "A+",
    description: "Slow-release casein protein, 24g per serving",
    category: "proteins",
    fullDescription:
      "Premium casein protein powder designed for sustained amino acid release. Ideal for before bed to support muscle recovery overnight. 24g protein per serving with minimal carbs.",
    specs: {
      servingSize: "35g",
      calories: 140,
      protein: "24g",
      carbs: "2g",
      fat: "1g",
      ingredients: "Milk Protein Concentrate, Natural Flavor, Stevia",
      allergens: "Dairy",
    },
    reviews: [],
  },
  {
    id: 14,
    name: "Matcha Green Tea Powder",
    price: 32.99,
    image: "🍵",
    rating: 4.8,
    reviewCount: 156,
    nutritionScore: "A+",
    description: "Ceremonial grade matcha with powerful antioxidants",
    category: "superfoods",
    fullDescription:
      "Premium ceremonial-grade matcha from Japan. Rich in L-theanine and EGCG antioxidants. Perfect for traditional matcha tea, lattes, or blended into smoothies for sustained energy.",
    specs: {
      servingSize: "1 teaspoon",
      calories: 5,
      caffeine: "25mg",
      antioxidants: "High",
      ingredients: "100% Organic Matcha Green Tea Powder",
      allergens: "None",
    },
    reviews: [
      {
        id: 1,
        author: "Lisa M.",
        rating: 5,
        text: "Authentic matcha taste. Great for daily energy!",
        date: "1 month ago",
      },
    ],
  },
  {
    id: 15,
    name: "Hemp Protein Powder",
    price: 44.99,
    image: "🌿",
    rating: 4.6,
    reviewCount: 87,
    nutritionScore: "A+",
    description: "Complete amino acid profile, 15g protein per serving",
    category: "proteins",
    fullDescription:
      "Plant-based hemp protein with all 9 essential amino acids. Lower protein content but higher in fiber and minerals. Great for vegans and those seeking plant-based options.",
    specs: {
      servingSize: "30g",
      calories: 120,
      protein: "15g",
      fiber: "3g",
      fat: "2.5g",
      ingredients: "100% Organic Hemp Seeds",
      allergens: "None",
    },
    reviews: [],
  },
  {
    id: 16,
    name: "Ashwagandha Root Powder",
    price: 28.99,
    image: "🪴",
    rating: 4.7,
    reviewCount: 142,
    nutritionScore: "A",
    description: "Stress-relief adaptogen, 500mg per serving",
    category: "supplements",
    fullDescription:
      "Pure ashwagandha root powder to support stress relief and relaxation. This adaptogenic herb helps maintain cortisol levels and promotes restful sleep naturally.",
    specs: {
      servingSize: "500mg",
      calories: 2,
      ingredients: "100% Organic Ashwagandha Root Powder",
      allergens: "None",
    },
    reviews: [
      {
        id: 1,
        author: "Tom R.",
        rating: 5,
        text: "Noticed less anxiety and better sleep. Highly recommend!",
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: 17,
    name: "Flax Seeds - Ground",
    price: 19.99,
    image: "🌾",
    rating: 4.8,
    reviewCount: 165,
    nutritionScore: "A",
    description: "Fresh ground flax seeds, rich in omega-3 and fiber",
    category: "organic",
    fullDescription:
      "Fresh ground flax seeds providing plant-based omega-3s, lignans, and soluble fiber. Perfect for baking, smoothies, or added to cereal for digestive and heart health.",
    specs: {
      servingSize: "15g",
      calories: 60,
      protein: "2g",
      fiber: "3g",
      omega3: "2300mg",
      ingredients: "100% Organic Ground Flax Seeds",
      allergens: "None",
    },
    reviews: [],
  },
  {
    id: 18,
    name: "Collagen Peptides",
    price: 39.99,
    image: "💪",
    rating: 4.9,
    reviewCount: 211,
    nutritionScore: "A+",
    description: "Grass-fed collagen for skin and joint health",
    category: "proteins",
    fullDescription:
      "Bioavailable grass-fed collagen peptides supporting skin elasticity, joint health, and gut integrity. Flavorless and mixes easily into any beverage. Hydrolyzed for maximum absorption.",
    specs: {
      servingSize: "10g",
      calories: 35,
      protein: "9g",
      aminoAcids: "Essential",
      ingredients: "Grass-Fed Bovine Collagen",
      allergens: "Dairy",
    },
    reviews: [],
  },
  {
    id: 19,
    name: "Bee Pollen Granules",
    price: 26.99,
    image: "🐝",
    rating: 4.7,
    reviewCount: 98,
    nutritionScore: "A+",
    description: "Raw bee pollen, natural energy and nutrient boost",
    category: "superfoods",
    fullDescription:
      "Raw bee pollen packed with 250+ nutrients including amino acids, vitamins, and minerals. A natural energy booster that supports immunity and overall wellness.",
    specs: {
      servingSize: "15g",
      calories: 50,
      protein: "3g",
      carbs: "8g",
      ingredients: "100% Raw Bee Pollen",
      allergens: "Bee products",
    },
    reviews: [],
  },
  {
    id: 20,
    name: "Vitamin D3 Drops",
    price: 24.99,
    image: "☀️",
    rating: 4.8,
    reviewCount: 189,
    nutritionScore: "A+",
    description: "High-potency vitamin D3, 2000 IU per drop",
    category: "supplements",
    fullDescription:
      "Convenient liquid vitamin D3 drops for optimal sun vitamin supplementation. Perfect for those with limited sun exposure or during winter months. Supports bone health and immunity.",
    specs: {
      servingSize: "1 drop",
      vitaminD3: "2000IU",
      ingredients: "Vitamin D3, MCT Oil, Vitamin E",
      allergens: "None",
    },
    reviews: [
      {
        id: 1,
        author: "Jennifer L.",
        rating: 5,
        text: "Easy to use and effective. My vitamin D levels improved!",
        date: "2 weeks ago",
      },
    ],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)

  const product = allProducts.find((p) => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Product not found</h1>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-gradient-to-br from-secondary to-background rounded-2xl flex items-center justify-center">
              <div className="text-8xl">{product.image}</div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {product.nutritionScore}
                </div>
                <span className="text-sm text-muted-foreground">{product.category}</span>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="border-t border-border pt-6">
              <p className="text-5xl font-bold text-primary mb-4">${product.price}</p>
              <p className="text-muted-foreground mb-6">{product.fullDescription}</p>
            </div>

            {/* Quantity and Buttons */}
            <div className="flex items-center gap-3 border-b border-t border-border py-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-muted rounded"
                >
                  −
                </button>
                <span className="px-3 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-muted rounded">
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`${isFavorite ? "bg-primary/10" : ""}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground">30-Day Returns</p>
                  <p className="text-xs text-muted-foreground">Full refund if not satisfied</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground">Quality Guaranteed</p>
                  <p className="text-xs text-muted-foreground">Organic certified products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications and Reviews Tabs */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Specifications */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Specifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm font-semibold text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-foreground mt-1">{typeof value === "string" ? value : JSON.stringify(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Summary */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review: any) => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-foreground">{review.author}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{review.date}</p>
                    <p className="text-sm text-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <ProductCard product={relatedProduct} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
