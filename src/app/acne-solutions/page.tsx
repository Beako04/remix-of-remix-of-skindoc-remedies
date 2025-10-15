"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const acneProducts = [
  {
    id: 501,
    name: "Salicylic Acid Cleanser",
    link: "https://amzn.to/4ofAVzv",
    description: "Deep-cleansing formula that unclogs pores and prevents breakouts",
    price: 38,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-sali-b4b57d13-20251014202626.jpg",
    category: "Cleanser"
  },
  {
    id: 502,
    name: "Benzoyl Peroxide Spot Treatment",
    link: "https://amzn.to/46PpU2e",
    description: "Fast-acting spot treatment that targets stubborn acne",
    price: 28,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-benz-7c886f45-20251014202634.jpg",
    category: "Spot Treatment"
  },
  {
    id: 503,
    name: "Oil-Free Moisturizer",
    link: "https://amzn.to/4ofXwMn",
    description: "Lightweight moisturizer that hydrates without clogging pores",
    price: 42,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-oil--a691a47e-20251014202641.jpg",
    category: "Moisturizer"
  },
  {
    id: 504,
    name: "Acne Fighting Serum",
    link: "https://amzn.to/3KULd9T",
    description: "Powerful serum that fights acne and prevents future breakouts",
    price: 65,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-acne-b1c30cc6-20251014202648.jpg",
    category: "Serum"
  },
  {
    id: 505,
    name: "Purifying Clay Mask",
    link: "https://amzn.to/3Wq2Lxr",
    description: "Deep-cleansing mask that draws out impurities and excess oil",
    price: 35,
    rating: 4.6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-puri-84d911c3-20251014202655.jpg",
    category: "Mask"
  },
  {
    id: 506,
    name: "Blemish Control Toner",
    link: "https://amzn.to/4nQjOoj",
    description: "Clarifying toner that balances oil and refines pores",
    price: 32,
    rating: 4.5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-blem-e674bd18-20251014202702.jpg",
    category: "Toner"
  },
  {
    id: 507,
    name: "Pore Clearing Scrub",
    link: "https://amzn.to/3J4ls6D",
    description: "Gentle scrub that exfoliates and prevents pore congestion",
    price: 28,
    rating: 4.7,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-pore-4d14ecf8-20251014202710.jpg",
    category: "Scrub"
  },
  {
    id: 508,
    name: "Acne Scar Fading Treatment",
    link: "https://amzn.to/4n0WMtL",
    description: "Targeted treatment that fades acne scars and dark marks",
    price: 55,
    rating: 4.8,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4768582-7876-4bc8-8ca9-7e69d535477e/generated_images/professional-product-photography-of-acne-7db22128-20251014202716.jpg",
    category: "Treatment"
  }
];

export default function AcneSolutionsPage() {
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
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Acne Solutions Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Effective solutions for clear, blemish-free skin and acne prevention
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {acneProducts.map((product) => (
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