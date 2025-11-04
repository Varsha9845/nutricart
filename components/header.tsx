"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, Menu, LogOut } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { NutriCartLogo } from "./logo"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <NutriCartLogo className="w-14 h-14" />
            <span className="font-bold text-2xl text-[#00C853] hidden sm:inline -ml-2 drop-shadow-lg">NutriCart</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Button variant="ghost" size="icon" onClick={() => setShowUserMenu(!showUserMenu)}>
                <User className="w-5 h-5" />
              </Button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      {user.isAdmin && (
                        <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-secondary">
                          Admin Dashboard
                        </Link>
                      )}
                      <Link href="/account" className="block px-4 py-2 text-sm hover:bg-secondary">
                        My Account
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setShowUserMenu(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-2 text-sm hover:bg-secondary">
                        Sign In
                      </Link>
                      <Link href="/signup" className="block px-4 py-2 text-sm hover:bg-secondary">
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground"
            />
            <nav className="flex flex-col gap-2">
              <Link href="/products" className="px-4 py-2 hover:bg-secondary rounded-lg">
                Products
              </Link>
              {user ? (
                <>
                  <Link href="/account" className="px-4 py-2 hover:bg-secondary rounded-lg">
                    My Account
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin" className="px-4 py-2 hover:bg-secondary rounded-lg">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="px-4 py-2 hover:bg-secondary rounded-lg text-left text-destructive"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 hover:bg-secondary rounded-lg">
                    Sign In
                  </Link>
                  <Link href="/signup" className="px-4 py-2 hover:bg-secondary rounded-lg">
                    Create Account
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
