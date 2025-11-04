"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calculator, Target, AlertTriangle } from "lucide-react"

const healthGoals = [
  { id: "weight-loss", label: "Weight Loss", description: "Calorie-controlled, nutrient-dense foods" },
  { id: "muscle-gain", label: "Muscle Gain", description: "High-protein, calorie surplus foods" },
  { id: "maintenance", label: "Weight Maintenance", description: "Balanced nutrition" },
  { id: "vegan", label: "Vegan Diet", description: "Plant-based nutrition" },
  { id: "high-protein", label: "High Protein", description: "Protein-focused meals" },
  { id: "low-carb", label: "Low Carb", description: "Reduced carbohydrate intake" },
]

const dietaryRestrictions = [
  { id: "gluten-free", label: "Gluten Free" },
  { id: "dairy-free", label: "Dairy Free" },
  { id: "nut-free", label: "Nut Free" },
  { id: "soy-free", label: "Soy Free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
]

export default function HealthProfileForm() {
  const { user, updateHealthProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    calorieIntake: "",
    goals: user?.healthProfile?.goals || [],
    dietaryRestrictions: user?.healthProfile?.dietaryRestrictions || [],
  })

  const calculateBMI = () => {
    const height = parseFloat(formData.height) / 100 // convert cm to m
    const weight = parseFloat(formData.weight)
    if (height && weight) {
      return (weight / (height * height)).toFixed(1)
    }
    return null
  }

  const handleGoalChange = (goalId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      goals: checked
        ? [...prev.goals, goalId]
        : prev.goals.filter(g => g !== goalId)
    }))
  }

  const handleRestrictionChange = (restrictionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: checked
        ? [...prev.dietaryRestrictions, restrictionId]
        : prev.dietaryRestrictions.filter(r => r !== restrictionId)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const bmi = calculateBMI() ? parseFloat(calculateBMI()!) : undefined
    const calorieIntake = formData.calorieIntake ? parseInt(formData.calorieIntake) : undefined

    const profile = {
      bmi,
      calorieIntake,
      goals: formData.goals,
      dietaryRestrictions: formData.dietaryRestrictions,
    }

    updateHealthProfile(profile)
    setIsLoading(false)
  }

  const bmi = calculateBMI()
  const bmiCategory = bmi ? (
    parseFloat(bmi) < 18.5 ? "Underweight" :
    parseFloat(bmi) < 25 ? "Normal" :
    parseFloat(bmi) < 30 ? "Overweight" : "Obese"
  ) : null

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Health Profile Setup
        </CardTitle>
        <CardDescription>
          Help us personalize your nutrition recommendations by sharing your health goals and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BMI Calculator */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              BMI Calculator
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>
            </div>
            {bmi && (
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm">
                  <strong>BMI: {bmi}</strong> - {bmiCategory}
                </p>
              </div>
            )}
          </div>

          {/* Daily Calorie Intake */}
          <div>
            <Label htmlFor="calorieIntake">Daily Calorie Intake (optional)</Label>
            <Input
              id="calorieIntake"
              type="number"
              placeholder="2000"
              value={formData.calorieIntake}
              onChange={(e) => setFormData(prev => ({ ...prev, calorieIntake: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank if you don't track calories
            </p>
          </div>

          {/* Health Goals */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Health Goals</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {healthGoals.map((goal) => (
                <div key={goal.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={goal.id}
                    checked={formData.goals.includes(goal.id)}
                    onCheckedChange={(checked) => handleGoalChange(goal.id, checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor={goal.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {goal.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dietary Restrictions</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {dietaryRestrictions.map((restriction) => (
                <div key={restriction.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={restriction.id}
                    checked={formData.dietaryRestrictions.includes(restriction.id)}
                    onCheckedChange={(checked) => handleRestrictionChange(restriction.id, checked as boolean)}
                  />
                  <Label
                    htmlFor={restriction.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {restriction.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Health Profile"}
          </Button>

          {formData.goals.length === 0 && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              <AlertTriangle className="w-4 h-4" />
              <p className="text-sm">
                Select at least one health goal to get personalized recommendations.
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
