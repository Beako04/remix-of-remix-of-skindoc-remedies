"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star, Clock, ArrowLeft, Home, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const products = [
  {
    title: "Complete Acne Treatment System",
    description: "Professional 3-step system with cleanser, treatment serum, and moisturizer. Contains salicylic acid and benzoyl peroxide for clear skin.",
    ingredients: "Salicylic Acid 2%, Benzoyl Peroxide 5%, Niacinamide 4%",
    price: "$65",
    originalPrice: "$89",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-comp-e7708fd9-20251014194114.jpg",
    rating: 4.8,
    reviews: 3847,
    badge: "Bestseller",
    resultTime: "2-4 weeks",
    concern: "Complete Treatment"
  },
  {
    title: "Spot Treatment Max Strength Gel",
    description: "Fast-acting overnight spot treatment with 10% benzoyl peroxide to rapidly reduce blemishes and prevent new breakouts.",
    ingredients: "Benzoyl Peroxide 10%, Sulfur 5%, Tea Tree Oil",
    price: "$32",
    originalPrice: "$44",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-spot-21b18f4d-20251014194123.jpg",
    rating: 4.7,
    reviews: 4238,
    badge: "Fast Acting",
    resultTime: "24-48 hours",
    concern: "Spot Treatment"
  },
  {
    title: "BHA Clarifying Toner",
    description: "Alcohol-free toner with 2% salicylic acid to unclog pores, remove excess oil, and prevent breakouts while balancing skin pH.",
    ingredients: "Salicylic Acid 2%, Witch Hazel, Niacinamide, Green Tea",
    price: "$28",
    originalPrice: "$38",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-bha--2c715941-20251014194129.jpg",
    rating: 4.9,
    reviews: 2934,
    badge: "Daily Essential",
    resultTime: "1-2 weeks",
    concern: "Pore Cleansing"
  },
  {
    title: "Oil-Free Acne Control Moisturizer",
    description: "Lightweight, non-comedogenic moisturizer with niacinamide and hyaluronic acid to hydrate without clogging pores or causing breakouts.",
    ingredients: "Niacinamide 5%, Hyaluronic Acid, Ceramides, Zinc",
    price: "$35",
    originalPrice: "$48",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-oil--12b3cc50-20251014194136.jpg",
    rating: 4.8,
    reviews: 3156,
    badge: "Oil-Free",
    resultTime: "Immediate",
    concern: "Hydration"
  },
  {
    title: "Deep Cleansing Face Wash",
    description: "Gentle foaming cleanser with 2% salicylic acid that deep cleans pores, removes excess oil, and prevents breakouts without over-drying.",
    ingredients: "Salicylic Acid 2%, Glycerin, Aloe Vera, Chamomile",
    price: "$24",
    originalPrice: "$32",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-deep-69b1fd92-20251014194143.jpg",
    rating: 4.7,
    reviews: 5123,
    badge: "Gentle Power",
    resultTime: "Immediate",
    concern: "Deep Cleansing"
  },
  {
    title: "Post-Acne Mark Fading Serum",
    description: "Targeted serum with niacinamide and tranexamic acid to fade dark spots and hyperpigmentation left behind by acne breakouts.",
    ingredients: "Niacinamide 10%, Tranexamic Acid 2%, Alpha Arbutin",
    price: "$48",
    originalPrice: "$64",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-post-f6cec6c8-20251014194149.jpg",
    rating: 4.8,
    reviews: 2471,
    badge: "Mark Fading",
    resultTime: "4-6 weeks",
    concern: "Post-Acne Marks"
  },
  {
    title: "Clay Purifying Face Mask",
    description: "Detoxifying clay mask with sulfur and charcoal to draw out impurities, absorb excess oil, and minimize the appearance of pores.",
    ingredients: "Kaolin Clay, Sulfur 3%, Activated Charcoal, Tea Tree",
    price: "$36",
    originalPrice: "$48",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-clay-0e0e3b97-20251014194156.jpg",
    rating: 4.6,
    reviews: 1892,
    badge: "Deep Clean",
    resultTime: "Immediate",
    concern: "Deep Purifying"
  },
  {
    title: "Retinol Acne Treatment Night Serum",
    description: "Advanced night serum with retinol and niacinamide to prevent breakouts, fade acne scars, and improve overall skin texture.",
    ingredients: "Retinol 0.5%, Niacinamide 5%, Salicylic Acid 1%",
    price: "$52",
    originalPrice: "$68",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-reti-0a2e15fd-20251014194203.jpg",
    rating: 4.7,
    reviews: 2156,
    badge: "Night Treatment",
    resultTime: "4-6 weeks",
    concern: "Prevention & Repair"
  }
];

export default function AcneSolutionsPage() {
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
            <span className="text-foreground font-medium">Acne Solutions</span>
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
            Acne Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Clear, healthy skin is within reach. Our comprehensive acne solutions target breakouts at every stage, 
            from prevention to treatment to post-acne mark fading.
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