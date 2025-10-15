"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const treatmentProducts = [
  {
    id: 301,
    name: "Chemical Peel Treatment",
    link: "https://amzn.to/4hbXFOO",
    description: "Professional-grade peel that reveals brighter, smoother skin",
    price: 125,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-chem-91841d75-20251014202417.jpg",
    category: "Peel"
  },
  {
    id: 302,
    name: "Purifying Clay Mask",
    link: "https://amzn.to/4hgHxf0",
    description: "Deep-cleansing mask that detoxifies and refines pores",
    price: 48,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-puri-796367b3-20251014202424.jpg",
    category: "Mask"
  },
  {
    id: 303,
    name: "Targeted Spot Treatment",
    link: "https://amzn.to/3Lapcnz",
    description: "Fast-acting formula that targets blemishes and breakouts",
    price: 32,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-targ-3c847204-20251014202431.jpg",
    category: "Spot Treatment"
  },
  {
    id: 304,
    name: "Dark Circle Treatment",
    link: "https://amzn.to/4nVt6zm",
    description: "Intensive eye treatment that reduces dark circles and puffiness",
    price: 68,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-dark-00093417-20251014202437.jpg",
    category: "Eye Treatment"
  },
  {
    id: 305,
    name: "Scar Treatment Gel",
    link: "https://amzn.to/46QtwB1",
    description: "Advanced gel that fades scars and improves skin texture",
    price: 85,
    rating: 4.5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-scar-8ff36630-20251014202443.jpg",
    category: "Scar Treatment"
  },
  {
    id: 306,
    name: "Pigmentation Corrector",
    link: "https://amzn.to/4ojvWhi",
    description: "Targeted treatment that fades dark spots and evens skin tone",
    price: 95,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pigm-b29f9bcd-20251014202451.jpg",
    category: "Corrector"
  },
  {
    id: 307,
    name: "Pore Minimizer Serum",
    link: "https://amzn.to/4nfXbbW",
    description: "Concentrated serum that visibly reduces pore size",
    price: 72,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pore-66a5a74a-20251014202457.jpg",
    category: "Serum"
  },
  {
    id: 308,
    name: "Redness Relief Serum",
    link: "https://amzn.to/42Eaf3f",
    description: "Soothing serum that calms irritation and reduces redness",
    price: 78,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-redn-b4f6202a-20251014202504.jpg",
    category: "Serum"
  },
  {
    id: 309,
    name: "Overnight Treatment Mask",
    link: "https://amzn.to/42ECE9m",
    description: "Intensive overnight mask that repairs and rejuvenates skin",
    price: 88,
    rating: 4.9,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-over-2960b1f9-20251014202511.jpg",
    category: "Mask"
  }
];

export default function TreatmentsPage() {
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
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Treatments Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Targeted treatments for specific skin concerns and professional-grade results
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatmentProducts.map((product) => (
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