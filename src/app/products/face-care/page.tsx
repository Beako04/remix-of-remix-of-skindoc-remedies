"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star, Clock, ArrowLeft, Home, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const products = [
  {
    title: "Hydrating Hyaluronic Acid Serum",
    description: "Multi-molecular weight hyaluronic acid serum that penetrates deep into skin layers for intense 48-hour hydration and plumping effect.",
    ingredients: "Hyaluronic Acid (Multi-Weight), Vitamin B5, Glycerin",
    price: "$45",
    originalPrice: "$62",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-luxu-5e12500c-20251014193703.jpg",
    rating: 4.9,
    reviews: 2847,
    badge: "Bestseller",
    resultTime: "Immediate",
    concern: "Hydration"
  },
  {
    title: "Gentle Foaming Cleanser",
    description: "pH-balanced foaming cleanser with amino acids that removes impurities without stripping natural oils. Perfect for daily use.",
    ingredients: "Amino Acids, Ceramides, Green Tea Extract",
    price: "$28",
    originalPrice: "$38",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-gent-0b9041f0-20251014193710.jpg",
    rating: 4.8,
    reviews: 1923,
    badge: "Dermatologist Pick",
    resultTime: "Immediate",
    concern: "Cleansing"
  },
  {
    title: "Niacinamide 10% + Zinc Serum",
    description: "High-strength niacinamide formula to minimize pores, regulate sebum production, and improve skin texture for a refined complexion.",
    ingredients: "Niacinamide 10%, Zinc PCA 1%, Tamarind Extract",
    price: "$38",
    originalPrice: "$52",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-niac-10f61d0e-20251014193718.jpg",
    rating: 4.7,
    reviews: 3156,
    badge: "Editor's Choice",
    resultTime: "2-3 weeks",
    concern: "Pore Refinement"
  },
  {
    title: "Vitamin C Brightening Cream",
    description: "Stable vitamin C formula with ferulic acid to brighten skin tone, fade dark spots, and protect against environmental damage.",
    ingredients: "L-Ascorbic Acid 15%, Ferulic Acid, Vitamin E",
    price: "$56",
    originalPrice: "$75",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-vita-1ce2fb51-20251014193724.jpg",
    rating: 4.8,
    reviews: 2471,
    badge: "Most Loved",
    resultTime: "4-6 weeks",
    concern: "Brightening"
  },
  {
    title: "Peptide Firming Eye Cream",
    description: "Advanced peptide complex with caffeine to reduce puffiness, dark circles, and fine lines around the delicate eye area.",
    ingredients: "Matrixyl 3000, Caffeine, Hyaluronic Acid",
    price: "$42",
    originalPrice: "$58",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pept-a3e4070e-20251014193731.jpg",
    rating: 4.6,
    reviews: 1634,
    badge: "Premium",
    resultTime: "3-4 weeks",
    concern: "Eye Care"
  },
  {
    title: "Lightweight Daily Moisturizer SPF 30",
    description: "Oil-free moisturizer with broad-spectrum SPF 30 protection. Lightweight formula absorbs instantly without white cast.",
    ingredients: "Zinc Oxide, Hyaluronic Acid, Vitamin E, Niacinamide",
    price: "$34",
    originalPrice: "$46",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-dail-7e6a1299-20251014193737.jpg",
    rating: 4.9,
    reviews: 4238,
    badge: "Daily Essential",
    resultTime: "Immediate",
    concern: "Sun Protection"
  },
  {
    title: "Resurfacing AHA Night Serum",
    description: "Gentle yet effective glycolic acid serum that exfoliates dead skin cells overnight for smoother, brighter skin by morning.",
    ingredients: "Glycolic Acid 10%, Aloe Vera, Allantoin",
    price: "$48",
    originalPrice: "$64",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-aha--c3366cfd-20251014193743.jpg",
    rating: 4.7,
    reviews: 1892,
    badge: "Night Treatment",
    resultTime: "2-3 weeks",
    concern: "Exfoliation"
  },
  {
    title: "Rich Nourishing Night Cream",
    description: "Luxurious night cream with ceramides and plant oils to deeply nourish and repair skin barrier while you sleep.",
    ingredients: "Ceramides, Squalane, Shea Butter, Peptides",
    price: "$52",
    originalPrice: "$68",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-rich-6856236c-20251014193753.jpg",
    rating: 4.8,
    reviews: 2156,
    badge: "Luxury Formula",
    resultTime: "1-2 weeks",
    concern: "Deep Nourishment"
  }
];

export default function FaceCarePage() {
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
            <span className="text-foreground font-medium">Face Care</span>
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
            Face Care Products
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Transform your complexion with our comprehensive face care collection. From gentle cleansers to powerful serums, 
            each product is formulated to address your unique facial skin needs.
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