"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star, Clock, ArrowLeft, Home, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const products = [
  {
    title: "Intensive Body Moisturizing Lotion",
    description: "Rich, fast-absorbing body lotion with ceramides and shea butter that provides 24-hour hydration for soft, supple skin.",
    ingredients: "Ceramides, Shea Butter, Glycerin, Vitamin E",
    price: "$32",
    originalPrice: "$44",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-body-c8c2d073-20251014193800.jpg",
    rating: 4.8,
    reviews: 3421,
    badge: "Bestseller",
    resultTime: "Immediate",
    concern: "Body Hydration"
  },
  {
    title: "Exfoliating Body Scrub with Sugar",
    description: "Gentle sugar scrub infused with vitamin C and coconut oil to buff away dead skin cells and reveal radiant, smooth skin.",
    ingredients: "Sugar Crystals, Vitamin C, Coconut Oil, Jojoba Oil",
    price: "$28",
    originalPrice: "$38",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-suga-a577e7f3-20251014193808.jpg",
    rating: 4.7,
    reviews: 2156,
    badge: "Editor's Choice",
    resultTime: "Immediate",
    concern: "Exfoliation"
  },
  {
    title: "Firming Body Serum with Caffeine",
    description: "Concentrated serum with caffeine and retinol to improve skin firmness, reduce the appearance of cellulite, and boost elasticity.",
    ingredients: "Caffeine 5%, Retinol, Hyaluronic Acid, Peptides",
    price: "$58",
    originalPrice: "$78",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-firm-4bcccdbf-20251014193817.jpg",
    rating: 4.6,
    reviews: 1834,
    badge: "Advanced Formula",
    resultTime: "4-6 weeks",
    concern: "Firming"
  },
  {
    title: "Soothing Body Oil Blend",
    description: "Luxurious blend of argan, rosehip, and jojoba oils to deeply nourish dry skin and lock in moisture for all-day softness.",
    ingredients: "Argan Oil, Rosehip Oil, Jojoba Oil, Vitamin E",
    price: "$42",
    originalPrice: "$56",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-luxu-02430b23-20251014193824.jpg",
    rating: 4.9,
    reviews: 2847,
    badge: "Luxury",
    resultTime: "Immediate",
    concern: "Deep Nourishment"
  },
  {
    title: "Brightening Body Cream with AHA",
    description: "Alpha hydroxy acid formula to gently exfoliate and fade dark spots, revealing brighter, more even-toned skin.",
    ingredients: "Glycolic Acid 8%, Kojic Acid, Niacinamide, Licorice",
    price: "$38",
    originalPrice: "$52",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-brig-c47dbb77-20251014193831.jpg",
    rating: 4.7,
    reviews: 1623,
    badge: "Dermatologist Pick",
    resultTime: "3-4 weeks",
    concern: "Brightening"
  },
  {
    title: "Fragrance-Free Body Wash",
    description: "Gentle, pH-balanced body wash free from harsh sulfates and fragrances. Perfect for sensitive and reactive skin types.",
    ingredients: "Gentle Surfactants, Ceramides, Oat Extract, Allantoin",
    price: "$24",
    originalPrice: "$32",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-frag-844214c4-20251014193839.jpg",
    rating: 4.8,
    reviews: 2934,
    badge: "Sensitive Skin",
    resultTime: "Immediate",
    concern: "Gentle Cleansing"
  },
  {
    title: "Anti-Aging Hand Cream SPF 15",
    description: "Rich hand cream with retinol and SPF 15 to protect and rejuvenate hands, reducing age spots and improving texture.",
    ingredients: "Retinol, SPF 15, Shea Butter, Vitamin C, Peptides",
    price: "$26",
    originalPrice: "$36",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-anti-b62a1fd6-20251014193847.jpg",
    rating: 4.8,
    reviews: 1745,
    badge: "Age Defense",
    resultTime: "2-3 weeks",
    concern: "Hand Care"
  },
  {
    title: "Intensive Foot Repair Cream",
    description: "Ultra-rich cream with 25% urea and shea butter to soften rough, cracked heels and restore smooth, healthy feet.",
    ingredients: "Urea 25%, Shea Butter, Salicylic Acid, Peppermint Oil",
    price: "$29",
    originalPrice: "$39",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-foot-aaa642d9-20251014193855.jpg",
    rating: 4.9,
    reviews: 3128,
    badge: "Clinical Strength",
    resultTime: "1-2 weeks",
    concern: "Foot Care"
  },
  {
    title: "Refreshing Body Mist with Aloe",
    description: "Lightweight, hydrating body mist with aloe vera and rose water to refresh and soothe skin throughout the day.",
    ingredients: "Aloe Vera, Rose Water, Hyaluronic Acid, Green Tea",
    price: "$22",
    originalPrice: "$30",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-refr-e7ba798e-20251014193903.jpg",
    rating: 4.6,
    reviews: 1456,
    badge: "Daily Essential",
    resultTime: "Immediate",
    concern: "Refreshing"
  }
];

export default function BodyCarePage() {
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
            <span className="text-foreground font-medium">Body Care</span>
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
            Body Care Products
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Nourish and pamper your body with our luxurious body care collection. From intensive moisturizers to 
            targeted treatments, achieve silky-smooth skin from head to toe.
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