"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/hooks/use-cart"
import NutritionAssistant from "@/components/nutrition-assistant"
import { Button } from "@/components/ui/button"
import { Check, Lock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth" // import useAuth

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { addOrder } = useAuth() // destructure addOrder from useAuth
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
  })

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "shipping") {
      setStep("payment")
    } else if (step === "payment") {
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        items: items,
        total: finalTotal,
        status: "pending" as const,
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
      }
      addOrder(order)
      setStep("confirmation")
      clearCart()
    }
  }

  const shippingCost = total >= 50 ? 0 : 9.99
  const tax = total * 0.08
  const finalTotal = total + shippingCost + tax

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Nutrition Assistant */}
        <div className="mb-8">
          <NutritionAssistant />
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          {["shipping", "payment", "confirmation"].map((s, idx) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step === s
                    ? "bg-primary text-white"
                    : ["shipping", "payment"].includes(s) && ["payment", "confirmation"].includes(step)
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {["shipping", "payment"].includes(s) && ["payment", "confirmation"].includes(step) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  idx + 1
                )}
              </div>
              <div className="flex-1 h-1 bg-border mx-4">
                {idx < 2 && (
                  <div
                    className={`h-full ${
                      ["payment", "confirmation"].includes(step) && idx < (step === "confirmation" ? 2 : 1)
                        ? "bg-primary"
                        : ""
                    }`}
                  />
                )}
              </div>
              {idx < 2 && <div />}
            </div>
          ))}
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-secondary text-muted-foreground">
            3
          </div>
        </div>

        {step === "confirmation" ? (
          <div className="text-center space-y-6 py-12">
            <div className="text-6xl">✓</div>
            <h1 className="text-4xl font-bold text-foreground">Order Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for your purchase. Your order has been placed successfully and will be delivered within 3-5
              business days.
            </p>
            <div className="bg-card rounded-lg border border-border p-6 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">Order Total</p>
              <p className="text-3xl font-bold text-primary mb-4">${finalTotal.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mb-6">
                A confirmation email has been sent to {formData.email}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="outline">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Back Home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === "shipping" && (
                  <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Shipping Address</h2>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">ZIP Code</label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === "payment" && (
                  <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Payment Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={19}
                        className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">CVC</label>
                        <input
                          type="text"
                          name="cardCVC"
                          placeholder="123"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {step === "payment" && (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setStep("shipping")}
                    >
                      Back
                    </Button>
                  )}
                  <Button type="submit" size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                    {step === "shipping" ? "Continue to Payment" : "Complete Order"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
