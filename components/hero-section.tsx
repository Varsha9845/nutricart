"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-secondary to-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Nutrition Meets Sustainability
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover premium, sustainably-sourced nutritious products curated for your health journey. From organic
              superfoods to premium supplements, we've got everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  Explore Products
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://www.swav-berlin.de/images/Artikel-Bilder/2023/ernaehrung_fuer_sportler/gemuese_und_obst_im_sport.jpg"
              alt="Fresh and healthy nutrition products"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
