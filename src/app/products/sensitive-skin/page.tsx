"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star, Clock, ArrowLeft, Home, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const products = [
  {
    title: "Ultra-Gentle Calming Cleanser",
    description: "Fragrance-free, soap-free cleanser with ceramides and glycerin that gently cleanses without stripping natural moisture or causing irritation.",
    ingredients: "Ceramides, Glycerin, Oat Extract, Allantoin",
    price: "$26",
    originalPrice: "$36",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-ultr-db55f251-20251014194210.jpg",
    rating: 4.9,
    reviews: 4123,
    badge: "Dermatologist Pick",
    resultTime: "Immediate",
    concern: "Gentle Cleansing"
  },
  {
    title: "Barrier Repair Moisturizer",
    description: "Rich, soothing moisturizer with 5 types of ceramides and niacinamide to repair and strengthen compromised skin barrier.",
    ingredients: "Ceramide Complex, Niacinamide 4%, Cholesterol, Fatty Acids",
    price: "$38",
    originalPrice: "$52",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-barr-cc274409-20251014194217.jpg",
    rating: 4.8,
    reviews: 3421,
    badge: "Bestseller",
    resultTime: "1-2 weeks",
    concern: "Barrier Repair"
  },
  {
    title: "Centella Calming Recovery Serum",
    description: "Intensive calming serum with 95% centella asiatica extract to soothe redness, reduce inflammation, and heal irritated skin.",
    ingredients: "Centella Asiatica 95%, Madecassoside, Asiaticoside",
    price: "$42",
    originalPrice: "$58",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-cent-a6987100-20251014194224.jpg",
    rating: 4.9,
    reviews: 2847,
    badge: "Most Loved",
    resultTime: "Immediate",
    concern: "Redness Relief"
  },
  {
    title: "Mineral Sunscreen SPF 50",
    description: "100% mineral sunscreen with zinc oxide and titanium dioxide. Fragrance-free, hypoallergenic formula provides broad-spectrum protection.",
    ingredients: "Zinc Oxide 15%, Titanium Dioxide 5%, Aloe Vera",
    price: "$32",
    originalPrice: "$44",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-mine-fc501b08-20251014194231.jpg",
    rating: 4.7,
    reviews: 3156,
    badge: "Sun Protection",
    resultTime: "Immediate",
    concern: "UV Protection"
  },
  {
    title: "Soothing Oat Gel Moisturizer",
    description: "Lightweight, gel-cream formula with colloidal oatmeal and hyaluronic acid to hydrate and calm reactive, sensitive skin types.",
    ingredients: "Colloidal Oatmeal, Hyaluronic Acid, Aloe Vera, Allantoin",
    price: "$34",
    originalPrice: "$46",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-soot-d7f5d03b-20251014194238.jpg",
    rating: 4.8,
    reviews: 2471,
    badge: "Gentle Formula",
    resultTime: "Immediate",
    concern: "Hydration"
  },
  {
    title: "Fragrance-Free Night Recovery Cream",
    description: "Rich overnight cream with ceramides and peptides to deeply nourish and repair sensitive skin while you sleep without fragrance.",
    ingredients: "Ceramides, Peptides, Squalane, Shea Butter",
    price: "$44",
    originalPrice: "$58",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-frag-31baa0c8-20251014194244.jpg",
    rating: 4.8,
    reviews: 1923,
    badge: "Night Treatment",
    resultTime: "Overnight",
    concern: "Deep Repair"
  },
  {
    title: "Calming Micellar Water",
    description: "No-rinse micellar cleansing water that gently removes makeup and impurities without rubbing or irritating delicate sensitive skin.",
    ingredients: "Micelles, Glycerin, Cucumber Extract, Chamomile",
    price: "$22",
    originalPrice: "$30",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-calm-9228a558-20251014194250.jpg",
    rating: 4.7,
    reviews: 2934,
    badge: "Daily Essential",
    resultTime: "Immediate",
    concern: "Makeup Removal"
  },
  {
    title: "Redness Relief Facial Mist",
    description: "Instantly soothing facial mist with thermal water and allantoin to calm flare-ups, reduce redness, and refresh irritated skin.",
    ingredients: "Thermal Spring Water, Allantoin, Aloe Vera, Chamomile",
    price: "$28",
    originalPrice: "$38",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-redn-7b1e3cec-20251014194257.jpg",
    rating: 4.9,
    reviews: 3421,
    badge: "Instant Relief",
    resultTime: "Immediate",
    concern: "Redness & Irritation"
  },
  {
    title: "Hypoallergenic Eye Cream",
    description: "Ultra-gentle eye cream formulated for sensitive skin with caffeine and peptides to reduce puffiness without causing irritation.",
    ingredients: "Caffeine, Peptides, Hyaluronic Acid, Vitamin E",
    price: "$36",
    originalPrice: "$48",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-hypo-6e5a2069-20251014194306.jpg",
    rating: 4.6,
    reviews: 1634,
    badge: "Eye Care",
    resultTime: "2-3 weeks",
    concern: "Eye Area"
  }
];

export default function SensitiveSkinPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center hover:text-foreground transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Sensitive Skin</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-primary/20 to-background">
        <div className="container mx-auto px-4">
          <Link 
            href="/products"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Sensitive Skin Care
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Gentle care for reactive skin. Our hypoallergenic, fragrance-free formulas soothe sensitivity, 
            strengthen your skin barrier, and provide comfort without compromising effectiveness.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 bg-card hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {product.badge}
                      </span>
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-2">
                      <div className="text-right">
                        <div className="text-sm font-bold text-accent">{product.price}</div>
                        <div className="text-xs text-muted-foreground line-through">
                          {product.originalPrice}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-background/95 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="font-medium text-foreground">{product.rating}</span>
                            <span className="text-muted-foreground">({product.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{product.resultTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          {product.concern}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium text-foreground">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="mb-4 font-bold text-xl font-display text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">Key Ingredients:</span> {product.ingredients}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-accent font-display">{product.price}</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">{product.originalPrice}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{product.resultTime}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] shadow-accent/20 group/btn">
                        <span className="flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                          Add to Cart
                        </span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}