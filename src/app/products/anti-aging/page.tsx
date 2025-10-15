"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star, Clock, ArrowLeft, Home, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const products = [
  {
    title: "Advanced Retinol Night Complex",
    description: "High-potency time-released retinol with bakuchiol and squalane for powerful anti-aging benefits without irritation or dryness.",
    ingredients: "Retinol 1%, Bakuchiol, Squalane, Peptides, Vitamin E",
    price: "$78",
    originalPrice: "$98",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-adva-fdd8191b-20251014194012.jpg",
    rating: 4.8,
    reviews: 2934,
    badge: "Clinical Strength",
    resultTime: "6-8 weeks",
    concern: "Fine Lines & Wrinkles"
  },
  {
    title: "Collagen Boost Serum",
    description: "Advanced peptide complex with 5 types of collagen-boosting peptides to plump skin, reduce wrinkles, and improve elasticity.",
    ingredients: "Matrixyl 3000, Argireline, Syn-Coll, Hyaluronic Acid",
    price: "$85",
    originalPrice: "$115",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-coll-aa722462-20251014194018.jpg",
    rating: 4.7,
    reviews: 2156,
    badge: "Bestseller",
    resultTime: "4-6 weeks",
    concern: "Collagen Loss"
  },
  {
    title: "Vitamin C + E Ferulic Acid Serum",
    description: "Triple antioxidant formula with 20% L-ascorbic acid to brighten, protect, and reverse signs of photoaging and sun damage.",
    ingredients: "L-Ascorbic Acid 20%, Vitamin E, Ferulic Acid 0.5%",
    price: "$92",
    originalPrice: "$125",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-vita-53c4350b-20251014194024.jpg",
    rating: 4.9,
    reviews: 3421,
    badge: "Premium",
    resultTime: "4-6 weeks",
    concern: "Photo Damage"
  },
  {
    title: "Eye Renewal Treatment Cream",
    description: "Intensive eye cream with retinol and caffeine to target crow's feet, dark circles, and under-eye bags for youthful-looking eyes.",
    ingredients: "Retinol 0.5%, Caffeine, Peptides, Vitamin K",
    price: "$68",
    originalPrice: "$88",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-eye--5ef75f36-20251014194032.jpg",
    rating: 4.6,
    reviews: 1834,
    badge: "Eye Specialist",
    resultTime: "3-4 weeks",
    concern: "Eye Aging"
  },
  {
    title: "Multi-Peptide Firming Neck Cream",
    description: "Specialized neck and décolleté treatment with peptides and TGF-β to lift, firm, and smooth sagging skin in delicate areas.",
    ingredients: "Peptide Complex, TGF-β, Retinol, Hyaluronic Acid",
    price: "$82",
    originalPrice: "$108",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-mult-ec6d7dc9-20251014194039.jpg",
    rating: 4.7,
    reviews: 1623,
    badge: "Targeted Care",
    resultTime: "6-8 weeks",
    concern: "Neck Sagging"
  },
  {
    title: "Resveratrol + Niacinamide Night Serum",
    description: "Powerful antioxidant serum with resveratrol and niacinamide to repair environmental damage and improve skin resilience overnight.",
    ingredients: "Resveratrol 3%, Niacinamide 10%, Ceramides",
    price: "$72",
    originalPrice: "$95",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-resv-471f6f3e-20251014194048.jpg",
    rating: 4.8,
    reviews: 2471,
    badge: "Night Treatment",
    resultTime: "4-5 weeks",
    concern: "Environmental Damage"
  },
  {
    title: "Growth Factor Recovery Serum",
    description: "Biomimetic growth factors and stem cells to stimulate cellular renewal, improve firmness, and restore youthful radiance.",
    ingredients: "EGF, TGF-β, Stem Cells, Peptides, Hyaluronic Acid",
    price: "$125",
    originalPrice: "$165",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-grow-abbb8cdd-20251014194053.jpg",
    rating: 4.9,
    reviews: 1456,
    badge: "Luxury Formula",
    resultTime: "6-8 weeks",
    concern: "Cellular Aging"
  },
  {
    title: "Intensive Lip Plumping Treatment",
    description: "Advanced lip treatment with peptides and hyaluronic acid to reduce fine lines around lips and restore natural volume and fullness.",
    ingredients: "Peptides, Hyaluronic Acid, Retinol, Vitamin E",
    price: "$48",
    originalPrice: "$64",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-lip--94a18419-20251014194101.jpg",
    rating: 4.7,
    reviews: 1892,
    badge: "Plumping",
    resultTime: "2-3 weeks",
    concern: "Lip Lines"
  },
  {
    title: "Radiance Renewal Overnight Mask",
    description: "Ultra-rich overnight mask with AHA, retinol, and peptides to resurface, renew, and reveal brighter, younger-looking skin by morning.",
    ingredients: "Glycolic Acid 8%, Retinol 0.5%, Peptides, Niacinamide",
    price: "$65",
    originalPrice: "$85",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-radi-7f06c7ed-20251014194107.jpg",
    rating: 4.8,
    reviews: 2156,
    badge: "Overnight Power",
    resultTime: "3-4 weeks",
    concern: "Dull Aged Skin"
  }
];

export default function AntiAgingPage() {
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
            <span className="text-foreground font-medium">Anti-Aging</span>
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
            Anti-Aging Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Turn back time with our advanced anti-aging collection. Clinically-proven ingredients and cutting-edge 
            formulations to reduce wrinkles, boost firmness, and restore youthful radiance.
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