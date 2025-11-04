export interface UserHealthProfile {
  bmi?: number
  calorieIntake?: number
  goals: string[] // e.g., ['weight-loss', 'vegan', 'high-protein', 'muscle-gain']
  dietaryRestrictions: string[] // e.g., ['gluten-free', 'dairy-free', 'nut-free']
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviewCount: number
  nutritionScore: string
  description: string
  category: string
  nutritionalInfo?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
    fiber?: number
    sugar?: number
    vitamins?: string[]
    minerals?: string[]
  }
}

export interface CartItem extends Product {
  quantity: number
}

export interface NutritionAnalysis {
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  totalFiber: number
  deficiencies: string[]
  suggestions: string[]
}

// Mock nutritional data for products (in real app, this would come from database)
const productNutritionData: Record<number, Product['nutritionalInfo']> = {
  1: { calories: 120, protein: 25, carbs: 3, fat: 1, fiber: 0, vitamins: ['B12', 'D'], minerals: ['Calcium'] },
  2: { calories: 80, protein: 2, carbs: 15, fat: 1, fiber: 8, vitamins: ['A', 'C', 'K'], minerals: ['Iron', 'Magnesium'] },
  3: { calories: 180, protein: 6, carbs: 8, fat: 15, fiber: 3, vitamins: ['E'], minerals: ['Magnesium', 'Phosphorus'] },
  4: { calories: 150, protein: 5, carbs: 25, fat: 2, fiber: 6, vitamins: ['B1', 'B6'], minerals: ['Iron', 'Zinc'] },
  5: { calories: 130, protein: 30, carbs: 2, fat: 1, fiber: 0, vitamins: ['B12'], minerals: ['Calcium'] },
  6: { calories: 90, protein: 3, carbs: 18, fat: 1, fiber: 4, vitamins: ['A', 'C'], minerals: ['Iron'] },
  7: { calories: 120, protein: 0, carbs: 0, fat: 14, fiber: 0, vitamins: ['E'], minerals: ['Iron'] },
  8: { calories: 10, protein: 0, carbs: 2, fat: 0, fiber: 0, vitamins: ['A', 'B', 'C', 'D', 'E'], minerals: ['Calcium', 'Iron', 'Zinc'] },
  9: { calories: 15, protein: 0, carbs: 1, fat: 1, fiber: 0, vitamins: ['D'], minerals: ['Calcium'] },
  10: { calories: 60, protein: 2, carbs: 10, fat: 3, fiber: 5, vitamins: ['B6'], minerals: ['Magnesium'] },
  11: { calories: 20, protein: 4, carbs: 2, fat: 0, fiber: 1, vitamins: ['A', 'B12', 'K'], minerals: ['Iron', 'Magnesium'] },
  12: { calories: 160, protein: 6, carbs: 6, fat: 14, fiber: 3, vitamins: ['E'], minerals: ['Magnesium'] },
  13: { calories: 110, protein: 24, carbs: 3, fat: 1, fiber: 0, vitamins: ['B12'], minerals: ['Calcium'] },
  14: { calories: 70, protein: 3, carbs: 12, fat: 1, fiber: 3, vitamins: ['A', 'C'], minerals: ['Iron'] },
  15: { calories: 100, protein: 15, carbs: 8, fat: 1, fiber: 2, vitamins: ['B1', 'B6'], minerals: ['Iron', 'Magnesium'] },
  16: { calories: 15, protein: 0, carbs: 3, fat: 0, fiber: 1, vitamins: ['C'], minerals: ['Iron'] },
  17: { calories: 55, protein: 2, carbs: 3, fat: 4, fiber: 3, vitamins: ['B6'], minerals: ['Magnesium', 'Phosphorus'] },
  18: { calories: 70, protein: 18, carbs: 0, fat: 0, fiber: 0, vitamins: ['C'], minerals: ['Calcium'] },
  19: { calories: 45, protein: 3, carbs: 8, fat: 1, fiber: 2, vitamins: ['B', 'C'], minerals: ['Iron', 'Zinc'] },
  20: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, vitamins: ['D'], minerals: ['Calcium'] },
}

export function analyzeCartNutrition(cartItems: CartItem[]): NutritionAnalysis {
  let totalCalories = 0
  let totalProtein = 0
  let totalCarbs = 0
  let totalFat = 0
  let totalFiber = 0

  cartItems.forEach(item => {
    const nutrition = productNutritionData[item.id]
    if (nutrition) {
      totalCalories += (nutrition.calories || 0) * item.quantity
      totalProtein += (nutrition.protein || 0) * item.quantity
      totalCarbs += (nutrition.carbs || 0) * item.quantity
      totalFat += (nutrition.fat || 0) * item.quantity
      totalFiber += (nutrition.fiber || 0) * item.quantity
    }
  })

  // Calculate deficiencies based on general daily recommendations
  const deficiencies: string[] = []
  const suggestions: string[] = []

  if (totalProtein < 50) {
    deficiencies.push("protein")
    suggestions.push("Add protein-rich foods like whey protein or nuts")
  }
  if (totalFiber < 25) {
    deficiencies.push("fiber")
    suggestions.push("Try adding oats, chia seeds, or whole grains")
  }
  if (totalFat < 50) {
    deficiencies.push("healthy fats")
    suggestions.push("Include avocados, nuts, or olive oil")
  }
  if (totalCarbs < 100) {
    deficiencies.push("complex carbs")
    suggestions.push("Add whole grains or sweet potatoes")
  }

  return {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalFiber,
    deficiencies,
    suggestions
  }
}

export function getPersonalizedRecommendations(
  userProfile: UserHealthProfile | null,
  allProducts: Product[],
  cartItems: CartItem[] = []
): Product[] {
  if (!userProfile) {
    // Return general healthy recommendations
    return allProducts
      .filter(product => product.nutritionScore === 'A+' || product.nutritionScore === 'A')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
  }

  let filteredProducts = [...allProducts]

  // Filter by health goals
  if (userProfile.goals.includes('weight-loss')) {
    filteredProducts = filteredProducts.filter(product => {
      const nutrition = productNutritionData[product.id]
      return nutrition && nutrition.calories && nutrition.calories < 150
    })
  }

  if (userProfile.goals.includes('high-protein')) {
    filteredProducts = filteredProducts.filter(product => {
      const nutrition = productNutritionData[product.id]
      return nutrition && nutrition.protein && nutrition.protein > 15
    })
  }

  if (userProfile.goals.includes('vegan')) {
    filteredProducts = filteredProducts.filter(product =>
      !product.name.toLowerCase().includes('whey') &&
      !product.name.toLowerCase().includes('casein') &&
      !product.name.toLowerCase().includes('collagen') &&
      !product.category.includes('dairy')
    )
  }

  // Filter by dietary restrictions
  if (userProfile.dietaryRestrictions.includes('gluten-free')) {
    filteredProducts = filteredProducts.filter(product =>
      !product.name.toLowerCase().includes('wheat') &&
      !product.name.toLowerCase().includes('grain')
    )
  }

  // Remove items already in cart
  const cartIds = cartItems.map(item => item.id)
  filteredProducts = filteredProducts.filter(product => !cartIds.includes(product.id))

  // Sort by nutrition score and rating
  filteredProducts.sort((a, b) => {
    const scoreA = a.nutritionScore === 'A+' ? 3 : a.nutritionScore === 'A' ? 2 : 1
    const scoreB = b.nutritionScore === 'A+' ? 3 : b.nutritionScore === 'A' ? 2 : 1
    if (scoreA !== scoreB) return scoreB - scoreA
    return b.rating - a.rating
  })

  return filteredProducts.slice(0, 4)
}

export function generateNutritionMessage(
  userName: string,
  analysis: NutritionAnalysis
): string {
  const { deficiencies, suggestions } = analysis

  if (deficiencies.length === 0) {
    return `Hey ${userName}, your cart looks nutritionally balanced! Great job maintaining a healthy diet.`
  }

  const deficiencyText = deficiencies.join(' and ')
  const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

  return `Hey ${userName}, based on your cart, you're missing enough ${deficiencyText} this week. ${suggestion}.`
}
