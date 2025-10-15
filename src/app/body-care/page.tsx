"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bodyProducts = [
  {
    id: 201,
    name: "Nourishing Body Lotion",
    link: "https://amzn.to/4n0F9tT",
    description: "Rich, fast-absorbing body lotion that deeply hydrates and softens skin",
    price: 48,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-nour-28e8b4e4-20251014202312.jpg",
    category: "Lotion"
  },
  {
    id: 202,
    name: "Exfoliating Body Scrub",
    link: "https://amzn.to/3WETWzC",
    description: "Invigorating scrub that buffs away dead skin for smooth, radiant body",
    price: 42,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-exfo-63034120-20251014202320.jpg",
    category: "Scrub"
  },
  {
    id: 203,
    name: "Intensive Hand Cream",
    link: "https://amzn.to/3J5Ju0U",
    description: "Ultra-nourishing hand cream that repairs and protects dry hands",
    price: 28,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-inte-fa8b81a8-20251014202327.jpg",
    category: "Hand Care"
  },
  {
    id: 204,
    name: "Repairing Foot Cream",
    link: "https://amzn.to/4q8d06S",
    description: "Intensive foot cream that softens rough, cracked heels",
    price: 35,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-repa-cc8c1f71-20251014202334.jpg",
    category: "Foot Care"
  },
  {
    id: 205,
    name: "Luxury Body Oil",
    link: "https://amzn.to/48pcnQ6",
    description: "Luxurious oil blend that nourishes and leaves skin silky smooth",
    price: 65,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-luxu-b309ffbe-20251014202342.jpg",
    category: "Oil"
  },
  {
    id: 206,
    name: "Detox Bath Salts",
    link: "https://amzn.to/3JabjVQ",
    description: "Mineral-rich bath salts that detoxify and relax tired muscles",
    price: 38,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-deto-2556529f-20251014202348.jpg",
    category: "Bath"
  },
  {
    id: 207,
    name: "Natural Deodorant",
    link: "https://amzn.to/4ohQWVA",
    description: "Aluminum-free natural deodorant that keeps you fresh all day",
    price: 22,
    rating: 4.5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-natu-c4dd613c-20251014202355.jpg",
    category: "Deodorant"
  },
  {
    id: 208,
    name: "Sunscreen Body Lotion SPF 50",
    link: "https://amzn.to/4o1MUks",
    description: "Broad-spectrum protection with moisturizing benefits",
    price: 45,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-suns-242c7c00-20251014202403.jpg",
    category: "Sunscreen"
  },
  {
    id: 209,
    name: "Rich Body Butter",
    link: "https://amzn.to/42D48MK",
    description: "Ultra-rich body butter for intense hydration and nourishment",
    price: 52,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-rich-ecda77d0-20251014202410.jpg",
    category: "Butter"
  }
];

export default function BodyCarePage() {
  const handleBuyNow = (link: string) => {
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: link } }, "*");
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link href="/" className="font-display text-xl font-semibold">
              SKIN DOCTOR
            </Link>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-primary/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Body Care Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pamper your body with our luxurious collection of nourishing body care essentials
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bodyProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-square overflow-hidden bg-secondary">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.rating})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-semibold">${product.price}</span>
                  <Button 
                    onClick={() => handleBuyNow(product.link)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}