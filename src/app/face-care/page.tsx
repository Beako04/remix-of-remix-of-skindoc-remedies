"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const faceProducts = [
  {
    id: 101,
    name: "Gentle Cleansing Foam",
    link: "https://amzn.to/4hbiGJb",
    description: "Gentle yet effective foam cleanser that removes impurities without stripping natural oils",
    price: 42,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-a-lu-3102b027-20251014202207.jpg",
    category: "Cleanser"
  },
  {
    id: 102,
    name: "Vitamin C Brightening Serum",
    link: "https://amzn.to/479xHqy",
    description: "Potent vitamin C formula that brightens and evens skin tone",
    price: 89,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-vita-a9828060-20251014202215.jpg",
    category: "Serum"
  },
  {
    id: 103,
    name: "Hyaluronic Acid Moisturizer",
    link: "https://amzn.to/476IjGr",
    description: "Deep hydration with hyaluronic acid for plump, dewy skin",
    price: 67,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-hyal-646afdeb-20251014202222.jpg",
    category: "Moisturizer"
  },
  {
    id: 104,
    name: "Night Repair Cream",
    link: "https://amzn.to/3J8VKOd",
    description: "Rich night cream that repairs and regenerates skin while you sleep",
    price: 95,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-nigh-954b6513-20251014202229.jpg",
    category: "Night Cream"
  },
  {
    id: 105,
    name: "Exfoliating Toner",
    link: "https://amzn.to/4ojtIhW",
    description: "Gentle exfoliating toner that refines pores and smooths texture",
    price: 38,
    rating: 4.5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-exfo-b5716daa-20251014202236.jpg",
    category: "Toner"
  },
  {
    id: 106,
    name: "Eye Contour Cream",
    link: "https://amzn.to/48psOvL",
    description: "Targeted eye cream that reduces dark circles and fine lines",
    price: 78,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-eye--adc0b4f3-20251014202243.jpg",
    category: "Eye Care"
  },
  {
    id: 107,
    name: "Nourishing Facial Oil",
    link: "https://amzn.to/46TJGcQ",
    description: "Luxurious facial oil blend that nourishes and restores radiance",
    price: 85,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-nour-94cc48e1-20251014202250.jpg",
    category: "Oil"
  },
  {
    id: 108,
    name: "Hydrating Sheet Mask Pack",
    link: "https://amzn.to/3KNKOGo",
    description: "Intensive hydrating sheet masks for instant glow and moisture",
    price: 32,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-hydr-3894cada-20251014202258.jpg",
    category: "Mask"
  },
  {
    id: 109,
    name: "Makeup Remover",
    link: "https://amzn.to/4qauuj9",
    description: "Gentle yet effective makeup remover for all skin types",
    price: 29,
    rating: 4.5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-make-3c5874e7-20251014202305.jpg",
    category: "Cleanser"
  }
];

export default function FaceCarePage() {
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
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Face Care Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium face care products for radiant, healthy skin
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {faceProducts.map((product) => (
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