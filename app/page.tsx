import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import BenefitsSection from "@/components/benefits-section"
import Footer from "@/components/footer"
import TopProductsAnalytics from "@/components/top-products-analytics"
import CalorieTrend from "@/components/calorie-trend"
import RecommendedItems from "@/components/recommended-items"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <TopProductsAnalytics />
            <CalorieTrend />
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <RecommendedItems />
        </div>
      </section>
      <BenefitsSection />
      <Footer />
    </main>
  )
}
