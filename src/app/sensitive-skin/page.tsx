"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sensitiveProducts = [
  {
    id: 601,
    name: "Gentle Micellar Water",
    link: "https://amzn.to/4haDctD",
    description: "Ultra-gentle micellar water that removes makeup without irritation",
    price: 32,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-gent-bd6a2210-20251014202722.jpg",
    category: "Cleanser"
  },
  {
    id: 602,
    name: "Calming Relief Cream",
    link: "https://amzn.to/4ha5zrP",
    description: "Soothing cream that calms redness and irritation instantly",
    price: 58,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-calm-1fce5171-20251014202729.jpg",
    category: "Cream"
  },
  {
    id: 603,
    name: "Fragrance-Free Moisturizer",
    link: "https://amzn.to/3J6JQnZ",
    description: "Gentle, fragrance-free moisturizer perfect for reactive skin",
    price: 48,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-frag-fddf4177-20251014202737.jpg",
    category: "Moisturizer"
  },
  {
    id: 604,
    name: "Soothing Repair Serum",
    link: "https://amzn.to/3IO57D4",
    description: "Calming serum that repairs and strengthens sensitive skin",
    price: 72,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-soot-b75c5037-20251014202743.jpg",
    category: "Serum"
  },
  {
    id: 605,
    name: "Barrier Repair Balm",
    link: "https://amzn.to/4ojxLe8",
    description: "Intensive balm that restores damaged skin barrier",
    price: 65,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-barr-83b191d5-20251014202750.jpg",
    category: "Balm"
  },
  {
    id: 606,
    name: "Ultra-Gentle Cleanser",
    link: "https://amzn.to/42Hw2Hk",
    description: "Mild cleanser that purifies without stripping natural oils",
    price: 38,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-ultr-f54b86d7-20251014202756.jpg",
    category: "Cleanser"
  },
  {
    id: 607,
    name: "Mineral Sunscreen SPF 50",
    link: "https://amzn.to/47cyZkE",
    description: "Gentle mineral sunscreen suitable for most sensitive skin",
    price: 42,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-mine-879e1b09-20251014202804.jpg",
    category: "Sunscreen"
  },
  {
    id: 608,
    name: "Redness Relief Cream",
    link: "https://amzn.to/4hbyMT9",
    description: "Targeted cream that reduces persistent redness and inflammation",
    price: 68,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-redn-9a6849bf-20251014202811.jpg",
    category: "Treatment"
  }
];

export default function SensitiveSkinPage() {
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
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Sensitive Skin Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gentle, soothing solutions specially formulated for sensitive and reactive skin
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sensitiveProducts.map((product) => (
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