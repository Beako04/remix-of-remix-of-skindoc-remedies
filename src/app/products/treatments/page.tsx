"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star, Clock, ArrowLeft, Home, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const products = [
  {
    title: "Professional Chemical Peel Pads",
    description: "Pre-soaked treatment pads with 20% glycolic acid and lactic acid for professional-grade exfoliation and skin renewal at home.",
    ingredients: "Glycolic Acid 20%, Lactic Acid 10%, Salicylic Acid 2%",
    price: "$68",
    originalPrice: "$89",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-chem-4894248e-20251014193910.jpg",
    rating: 4.7,
    reviews: 1923,
    badge: "Professional Grade",
    resultTime: "3-4 weeks",
    concern: "Resurfacing"
  },
  {
    title: "Intensive Spot Treatment Gel",
    description: "Powerful overnight spot treatment with benzoyl peroxide and sulfur to rapidly reduce blemishes and prevent new breakouts.",
    ingredients: "Benzoyl Peroxide 5%, Sulfur 3%, Salicylic Acid",
    price: "$34",
    originalPrice: "$46",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-spot-5fab08f4-20251014193917.jpg",
    rating: 4.8,
    reviews: 3847,
    badge: "Fast Acting",
    resultTime: "24-48 hours",
    concern: "Spot Treatment"
  },
  {
    title: "Dark Spot Correcting Serum",
    description: "Advanced pigment-correcting serum with tranexamic acid and kojic acid to fade stubborn dark spots and hyperpigmentation.",
    ingredients: "Tranexamic Acid 5%, Kojic Acid 2%, Niacinamide",
    price: "$72",
    originalPrice: "$95",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-dark-8c969c90-20251014193925.jpg",
    rating: 4.6,
    reviews: 2156,
    badge: "Clinical Strength",
    resultTime: "6-8 weeks",
    concern: "Hyperpigmentation"
  },
  {
    title: "Rosacea Relief Cream",
    description: "Calming treatment cream with azelaic acid and niacinamide to reduce redness, soothe irritation, and strengthen skin barrier.",
    ingredients: "Azelaic Acid 10%, Niacinamide 5%, Licorice Extract",
    price: "$58",
    originalPrice: "$76",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-rosa-d8950f0e-20251014193935.jpg",
    rating: 4.9,
    reviews: 1634,
    badge: "Dermatologist Pick",
    resultTime: "2-4 weeks",
    concern: "Redness Relief"
  },
  {
    title: "Intensive Wrinkle Filler Serum",
    description: "Concentrated peptide serum with argireline and matrixyl to visibly reduce fine lines and smooth deep wrinkles.",
    ingredients: "Argireline 10%, Matrixyl 3000, Hyaluronic Acid",
    price: "$85",
    originalPrice: "$112",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-wrin-ca7e6b51-20251014193944.jpg",
    rating: 4.7,
    reviews: 2471,
    badge: "Anti-Wrinkle",
    resultTime: "4-6 weeks",
    concern: "Deep Lines"
  },
  {
    title: "Pore Minimizing Treatment Mask",
    description: "Clay-based treatment mask with charcoal and niacinamide to deep clean pores, absorb excess oil, and refine skin texture.",
    ingredients: "Kaolin Clay, Activated Charcoal, Niacinamide 5%",
    price: "$42",
    originalPrice: "$56",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pore-2ef48a37-20251014193951.jpg",
    rating: 4.8,
    reviews: 3128,
    badge: "Deep Clean",
    resultTime: "Immediate",
    concern: "Pore Treatment"
  },
  {
    title: "Neck and Décolleté Firming Treatment",
    description: "Specialized firming treatment with peptides and hyaluronic acid to lift, tighten, and smooth the delicate neck area.",
    ingredients: "Peptide Complex, Hyaluronic Acid, Retinol, Caffeine",
    price: "$76",
    originalPrice: "$98",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-neck-9ff25032-20251014193957.jpg",
    rating: 4.6,
    reviews: 1745,
    badge: "Targeted Care",
    resultTime: "4-6 weeks",
    concern: "Neck Firming"
  },
  {
    title: "Overnight Lip Treatment Mask",
    description: "Ultra-nourishing overnight lip mask with ceramides and vitamin E to repair, hydrate, and plump dry, chapped lips.",
    ingredients: "Ceramides, Vitamin E, Shea Butter, Peptides",
    price: "$28",
    originalPrice: "$38",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-over-b5549bc7-20251014194005.jpg",
    rating: 4.9,
    reviews: 2847,
    badge: "Intensive Care",
    resultTime: "Overnight",
    concern: "Lip Care"
  }
];

export default function TreatmentsPage() {
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
            <span className="text-foreground font-medium">Treatments</span>
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
            Specialized Treatments
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Professional-grade treatments for targeted skin concerns. Our clinically-proven formulas deliver 
            powerful results for specific conditions and skin challenges.
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