"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const antiAgingProducts = [
  {
    id: 401,
    name: "Retinol Night Serum",
    link: "https://amzn.to/3KOtAsq",
    description: "Powerful retinol formula that reduces wrinkles and fine lines",
    price: 115,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-reti-f9ab939f-20251014202518.jpg",
    category: "Serum"
  },
  {
    id: 402,
    name: "Collagen Boost Cream",
    link: "https://amzn.to/4h7qjjW",
    description: "Rich cream that boosts collagen for firmer, younger-looking skin",
    price: 98,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-coll-1df27268-20251014202525.jpg",
    category: "Cream"
  },
  {
    id: 403,
    name: "Peptide Complex Serum",
    link: "https://amzn.to/4q8cypi",
    description: "Advanced peptide serum that targets multiple signs of aging",
    price: 125,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pept-29da4e10-20251014202531.jpg",
    category: "Serum"
  },
  {
    id: 404,
    name: "Anti-Wrinkle Eye Cream",
    link: "https://amzn.to/4q4UQD3",
    description: "Intensive eye cream that smooths wrinkles and crow's feet",
    price: 88,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-anti-a4a9c8a7-20251014202539.jpg",
    category: "Eye Cream"
  },
  {
    id: 405,
    name: "Firming Neck Cream",
    link: "https://amzn.to/47nUsrT",
    description: "Targeted neck cream that lifts and firms delicate neck skin",
    price: 92,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-firm-5028bc35-20251014202546.jpg",
    category: "Neck Cream"
  },
  {
    id: 406,
    name: "Youth Restoring Serum",
    link: "https://amzn.to/43dYeSh",
    description: "Potent serum that restores youthful radiance and vitality",
    price: 135,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-yout-3f6fc383-20251014202556.jpg",
    category: "Serum"
  },
  {
    id: 407,
    name: "Antioxidant Face Oil",
    link: "https://amzn.to/48pehQK",
    description: "Luxurious oil rich in antioxidants for age-defying benefits",
    price: 105,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-anti-c01ddd2b-20251014202603.jpg",
    category: "Oil"
  },
  {
    id: 408,
    name: "Lifting Face Mask",
    link: "https://amzn.to/3KUKVQl",
    description: "Intensive mask that provides instant lifting and tightening",
    price: 68,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-lift-e64cbccc-20251014202610.jpg",
    category: "Mask"
  },
  {
    id: 409,
    name: "Age Defense Day Moisturizer",
    link: "https://amzn.to/4haCLQ1",
    description: "Daily moisturizer with SPF that protects against aging",
    price: 82,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-age--abf78bb6-20251014202619.jpg",
    category: "Moisturizer"
  }
];

export default function AntiAgingPage() {
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
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Anti-Aging Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Turn back time with our powerful anti-aging solutions for youthful, radiant skin
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {antiAgingProducts.map((product) => (
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