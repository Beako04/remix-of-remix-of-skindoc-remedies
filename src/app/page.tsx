import { FloatingNavbar } from "@/components/navbars/floating-navbar";
import { CarouselHero } from "@/components/heros/carousel-hero";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const SkinConcernSearch = dynamic(() => import("@/components/search/skin-concern-search"), {
  loading: () => <div className="h-[400px] animate-pulse bg-muted" />,
});

const ThreeColumnImageCards = dynamic(() => import("@/components/feature/three-column-image-cards").then(mod => ({ default: mod.ThreeColumnImageCards })), {
  loading: () => <div className="h-[600px] animate-pulse bg-muted" />,
});

const CardHoverStats = dynamic(() => import("@/components/stats/card-hover-stats").then(mod => ({ default: mod.CardHoverStats })), {
  loading: () => <div className="h-[400px] animate-pulse bg-muted" />,
});

const CenteredTeamCards = dynamic(() => import("@/components/teams/centered-team-cards").then(mod => ({ default: mod.CenteredTeamCards })), {
  loading: () => <div className="h-[800px] animate-pulse bg-muted" />,
});

const MasonryTestimonialGrid = dynamic(() => import("@/components/testimonials/masonry-testimonial-grid").then(mod => ({ default: mod.MasonryTestimonialGrid })), {
  loading: () => <div className="h-[600px] animate-pulse bg-muted" />,
});

const NewsletterFooter = dynamic(() => import("@/components/footers/newsletter-footer").then(mod => ({ default: mod.NewsletterFooter })), {
  loading: () => <div className="h-[400px] animate-pulse bg-muted" />,
});

export default function Page() {
  return (
    <>
      {/* Preload LCP image to avoid chaining critical requests */}
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0"
        imageSrcSet="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=640&auto=format&fit=crop 640w, https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1200&auto=format&fit=crop 1200w, https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1920&auto=format&fit=crop 1920w"
        imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        fetchPriority="high"
      />
      <main className="min-h-screen bg-background">
        <FloatingNavbar />
        <CarouselHero />
        <SkinConcernSearch />
        <ThreeColumnImageCards />
        <CardHoverStats />
        <CenteredTeamCards />
        <MasonryTestimonialGrid />
        <NewsletterFooter />
      </main>
    </>
  );
}