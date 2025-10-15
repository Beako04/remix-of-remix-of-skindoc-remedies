"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, Sparkles, Package } from "lucide-react";
import { motion } from "motion/react";

const products = [
  {
    id: 102,
    name: "Vitamin C Brightening Serum",
    link: "https://amzn.to/479xHqy",
    description: "Potent vitamin C formula that brightens and evens skin tone",
    price: 89,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-vita-a9828060-20251014202215.jpg",
    category: "Face Care",
    badge: "Best Seller"
  },
  {
    id: 103,
    name: "Hyaluronic Acid Moisturizer",
    link: "https://amzn.to/476IjGr",
    description: "Deep hydration with hyaluronic acid for plump, dewy skin",
    price: 67,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-hyal-646afdeb-20251014202222.jpg",
    category: "Face Care",
    badge: "Popular"
  },
  {
    id: 401,
    name: "Retinol Night Serum",
    link: "https://amzn.to/3KOtAsq",
    description: "Powerful retinol formula that reduces wrinkles and fine lines",
    price: 115,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-reti-f9ab939f-20251014202518.jpg",
    category: "Anti-Aging",
    badge: "Premium"
  },
  {
    id: 201,
    name: "Nourishing Body Lotion",
    link: "https://amzn.to/4n0F9tT",
    description: "Rich, fast-absorbing body lotion that deeply hydrates and softens skin",
    price: 48,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-nour-28e8b4e4-20251014202312.jpg",
    category: "Body Care",
    badge: "Luxurious"
  },
  {
    id: 501,
    name: "Salicylic Acid Cleanser",
    link: "https://amzn.to/4ofAVzv",
    description: "Deep-cleansing formula that unclogs pores and prevents breakouts",
    price: 38,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-sali-b4b57d13-20251014202626.jpg",
    category: "Acne Solutions",
    badge: "Effective"
  },
  {
    id: 104,
    name: "Night Repair Cream",
    link: "https://amzn.to/3J8VKOd",
    description: "Rich night cream that repairs and regenerates skin while you sleep",
    price: 95,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-nigh-954b6513-20251014202229.jpg",
    category: "Face Care",
    badge: "Top Rated"
  },
  {
    id: 403,
    name: "Peptide Complex Serum",
    link: "https://amzn.to/4q8cypi",
    description: "Advanced peptide serum that targets multiple signs of aging",
    price: 125,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pept-29da4e10-20251014202531.jpg",
    category: "Anti-Aging",
    badge: "Advanced"
  },
  {
    id: 205,
    name: "Luxury Body Oil",
    link: "https://amzn.to/48pcnQ6",
    description: "Luxurious oil blend that nourishes and leaves skin silky smooth",
    price: 65,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-luxu-b309ffbe-20251014202342.jpg",
    category: "Body Care",
    badge: "Luxury"
  },
  {
    id: 504,
    name: "Acne Fighting Serum",
    link: "https://amzn.to/3KULd9T",
    description: "Powerful serum that fights acne and prevents future breakouts",
    price: 65,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-acne-b1c30cc6-20251014202648.jpg",
    category: "Acne Solutions",
    badge: "Clinical"
  }
];

const ThreeColumnImageCards = () => {
  const handleBuyNow = (link: string) => {
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: link } }, "*");
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="m-auto mb-20 max-w-4xl text-center"
        >
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full text-sm font-semibold">
              <Sparkles className="size-4" />
              Premium Skincare Collection
            </span>
          </div>
          <h2 className="mb-8 text-4xl md:text-6xl font-bold lg:text-7xl font-display text-foreground leading-tight">
            Featured 
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"> Products</span>
          </h2>
          <p className="m-auto max-w-3xl text-lg lg:text-xl text-muted-foreground leading-relaxed font-body">
            Discover our most popular products carefully selected for their exceptional quality and proven results. 
            Professional-grade formulations backed by dermatological expertise.
          </p>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 bg-card hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group hover:-translate-y-2 cursor-pointer">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} - ${product.category} skincare product`}
                    width={400}
                    height={400}
                    loading="lazy"
                    quality={85}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Enhanced overlays and badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.badge}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Package className="w-3 h-3 text-accent" />
                      <span className="text-xs font-medium text-foreground">{product.category}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-background/95 backdrop-blur-sm rounded-xl p-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-accent text-accent" />
                          <span className="font-medium text-foreground">{product.rating}</span>
                          <span className="text-muted-foreground">Rating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="mb-4 font-bold text-xl font-display text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-display font-semibold text-foreground">${product.price}</span>
                  </div>

                  <Button 
                    onClick={() => handleBuyNow(product.link)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] shadow-accent/20 group/btn"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                      Buy Now
                    </span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ThreeColumnImageCards };