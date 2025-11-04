"use client"

import type React from "react"
import type { CartItem } from "@/hooks/use-cart" // Import from use-cart hook

import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  isAdmin?: boolean
  healthProfile?: {
    bmi?: number
    calorieIntake?: number
    goals: string[]
    dietaryRestrictions: string[]
  }
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: "pending" | "shipped" | "delivered"
  shippingAddress: {
    fullName: string
    email: string
    address: string
    city: string
    state: string
    zip: string
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  orders: Order[]
  addOrder: (order: Order) => void
  updateHealthProfile: (profile: User['healthProfile']) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("user")
    const savedOrders = localStorage.getItem("orders")
    if (saved) {
      setUser(JSON.parse(saved))
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call - in production, call your backend
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simple validation - in production, validate against backend
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      // Create user object
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        isAdmin: email === "admin@nutricart.com",
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simple validation
      if (!name || !email || !password) {
        throw new Error("All fields are required")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      // Create user object
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        isAdmin: false,
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const addOrder = (order: Order) => {
    const updatedOrders = [...orders, order]
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  }

  const updateHealthProfile = (profile: User['healthProfile']) => {
    if (user) {
      const updatedUser = { ...user, healthProfile: profile }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, orders, addOrder, updateHealthProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
