"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { analyzeCartNutrition, generateNutritionMessage } from "@/lib/ai-recommendations"
import { MessageCircle, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NutritionAssistant() {
  const { user } = useAuth()
  const { items: cartItems } = useCart()

  const analysis = useMemo(() => {
    return analyzeCartNutrition(cartItems)
  }, [cartItems])

  const message = useMemo(() => {
    if (user?.name && cartItems.length > 0) {
      return generateNutritionMessage(user.name, analysis)
    }
    return null
  }, [user?.name, cartItems, analysis])

  if (cartItems.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
            <MessageCircle className="w-5 h-5" />
            Nutrition Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 text-sm">
            Add some products to your cart and I'll help you optimize your nutrition!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-green-900">
          <MessageCircle className="w-5 h-5" />
          Nutrition Assistant
        </CardTitle>
        <CardDescription className="text-green-700">
          AI-powered insights for your cart
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Nutrition Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-2 bg-white/50 rounded-lg">
            <div className="text-xs text-green-700 font-medium">Calories</div>
            <div className="text-lg font-bold text-green-900">{analysis.totalCalories}</div>
          </div>
          <div className="text-center p-2 bg-white/50 rounded-lg">
            <div className="text-xs text-green-700 font-medium">Protein</div>
            <div className="text-lg font-bold text-green-900">{analysis.totalProtein}g</div>
          </div>
          <div className="text-center p-2 bg-white/50 rounded-lg">
            <div className="text-xs text-green-700 font-medium">Carbs</div>
            <div className="text-lg font-bold text-green-900">{analysis.totalCarbs}g</div>
          </div>
          <div className="text-center p-2 bg-white/50 rounded-lg">
            <div className="text-xs text-green-700 font-medium">Fiber</div>
            <div className="text-lg font-bold text-green-900">{analysis.totalFiber}g</div>
          </div>
        </div>

        {/* AI Message */}
        {message && (
          <div className="bg-white/70 rounded-lg p-4 border border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-green-900 text-sm leading-relaxed">{message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Deficiency Alerts */}
        {analysis.deficiencies.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Potential Gaps</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.deficiencies.map((deficiency) => (
                <span
                  key={deficiency}
                  className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                >
                  Low {deficiency}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Balanced Indicator */}
        {analysis.deficiencies.length === 0 && cartItems.length > 0 && (
          <div className="flex items-center gap-2 text-green-800 bg-green-100/50 rounded-lg p-3">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Your cart looks nutritionally balanced!</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Link href="/products">
            <Button size="sm" variant="outline" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Browse More
            </Button>
          </Link>
          {user && !user.healthProfile && (
            <Link href="/dashboard">
              <Button size="sm" variant="outline" className="text-xs">
                Set Goals
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
